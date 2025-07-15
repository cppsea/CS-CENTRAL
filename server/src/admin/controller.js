require("dotenv").config();
const { json } = require("body-parser");
const pool = require("../../db.js");
const queries = require("./queries");
const bcrypt = require("bcrypt");
const { cloudinary1 } = require("../images/config");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");

//helper functions
const createAdminToken = (id) => {
  return jwt.sign({ id: id }, process.env.ADMIN_SECRET, { expiresIn: "15m" });
};

const processArticle = async (article) => {
  //go through all image blocks, grab corresponding image urls, replace in data and return

  //currently we're storing the entire article data inside article body
  let newArticle = { ...article.article_body };
  newArticle.articleBody.forEach(async (section, sectionIndex) => {
    await section.blocks.forEach(async (block, blockIndex) => {
      if (block.type === "image") {
        //id stored in the url field
        const imageId = block.data.url;
        let imageResult = await pool.query(queries.getImageByImageId, [
          imageId,
        ]);

        imageResult = imageResult.rows[0];

        newArticle.articleBody[sectionIndex].blocks[blockIndex].data.url =
          imageResult.url;
      }
    });
  });

  //process main article image
  const imageId = newArticle.image;
  let imageResult = await pool.query(queries.getImageByImageId, [imageId]);
  imageResult = imageResult.rows[0];
  newArticle.image = imageResult.url;

  //add in id
  newArticle.id = article.id;

  //add in author name
  let author = await pool.query(queries.getUserByAuthorID, [article.author_id]);
  author = author.rows[0];

  newArticle.author = `${author.first_name} ${author.last_name}`;

  //process publish date into Month Day, Year format
  let publishDate = null;

  if (article.published_at) {
    const date = new Date(article.published_at);
    publishDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

  newArticle.published_at = publishDate;

  return newArticle;
};

//route functionsw
const loginAdminUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("received admin login request for username:", username);
  try {
    const result = await pool.query(queries.getUserByUsername, [username]);
    if (result.rows.length === 0) {
      return res.status(400).send("Error finding username");
    }
    const user = result.rows[0];

    //check if user is admin
    const checkAdminResult = await pool.query(queries.getAdminByUserID, [
      user.id,
    ]);
    if (checkAdminResult.rowCount === 0) {
      throw Error("Admin role association not found with user.");
    }

    //get avatar url
    let avatarUrlResult = null;
    if (user.avatar_id != null) {
      try {
        avatarUrlResult = await pool.query(queries.getAvatarURLByAvatarId, [
          user.avatar_id,
        ]);
        avatarUrlResult = avatarUrlResult.rows[0].url;
      } catch (error) {
        console.log(error);
        return res.status(500).send();
      }
    }

    console.log("admin password:", password);
    console.log("admin password hashed:", user.password);
    if (await bcrypt.compare(password, user.password)) {
      const token = createAdminToken(username);
      res.json({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        avatar: avatarUrlResult,
        token,
      });
    } else {
      return res.send("Not allowed");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Wrong credentials" });
  }
};

const giveAdminToUser = async (req, res) => {
  //receive user id from request

  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "User ID not provided." });
  }

  //check if user exists
  try {
    let result = await pool.query(queries.getUsersById, [user_id]);
    if (result.rowCount == 0) {
      return res
        .status(400)
        .json({ error: "User with provided ID not found." });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "User with provided ID not found." });
  }

  //update user roles
  try {
    let result = await pool.query(queries.giveAdminByUserID, [user_id]);
    if (result.rowCount === 0) {
      throw Error("No new admin users returned.");
    }

    return res
      .status(201)
      .json({ message: "User successfully given admin privileges." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Failed to give user admin privileges." });
  }
};

const removeAdminFromUser = async (req, res) => {
  //receive user id from request

  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "User ID not provided." });
  }

  //check if user exists
  try {
    let result = await pool.query(queries.getUsersById, [user_id]);
    if (result.rowCount == 0) {
      return res
        .status(400)
        .json({ error: "User with provided ID not found." });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "User with provided ID not found." });
  }

  //update user roles
  try {
    let result = await pool.query(queries.removeAdminByUserID, [user_id]);
    if (result.rowCount === 0) {
      throw Error("No new admin users returned.");
    }

    return res
      .status(201)
      .json({ message: "Admin privileges succesfully removed from user." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Failed to remove user admin privileges." });
  }
};

const getUserData = async (req, res) => {
  //receive user id from request

  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "User ID not provided." });
  }

  //retrieve user
  try {
    let result = await pool.query(queries.getUsersById, [id]);
    if (result.rowCount == 0) {
      throw Error("No users found.");
    }

    return res.status(200).json({ user: result.rows[0] });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "User with provided ID not found." });
  }
};

const deleteUser = async (req, res) => {
  //receive user id from request

  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "User ID not provided." });
  }

  //check if user exists
  try {
    let result = await pool.query(queries.getUsersById, [id]);
    if (result.rowCount == 0) {
      throw Error("No users found.");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "User with provided ID not found." });
  }

  //delete user
  try {
    await pool.query(queries.deleteUserById, [id]);
    return res.status(200).json({ message: "Successfully deleted user" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error deleting user" });
  }
};

const searchUsers = async (req, res) => {
  const { id, first_name, last_name, email, username } = req.body;

  try {
    let results = await pool.query(queries.searchUsers, [
      username,
      first_name,
      last_name,
      id,
      email,
    ]);
    results = results.rows;
    return res.status(200).json({ users: results });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not search for users" });
  }
};

const searchArticles = async (req, res) => {
  const { id, author_id, title, is_published } = req.body;

  try {
    let results = await pool.query(queries.searchArticles, [
      id,
      author_id,
      title,
      is_published,
    ]);

    let processedArticles = [];
    for (const article of results.rows) {
      let currArticle = await processArticle(article);
      processedArticles.push(currArticle);
    }

    return res.status(200).json({ articles: processedArticles });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not search for articles" });
  }
};

const getArticle = async (req, res) => {
  //get article id
  const { id } = req.params;

  //retrieve article
  try {
    let result = await pool.query(queries.getArticleByID, [id]);
    if (result.rowCount == 0) {
      throw Error("Article not found.");
    }

    const processedArticle = await processArticle(result.rows[0]);

    return res.status(200).json({ article: processedArticle });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Article not found." });
  }
};

const deleteArticle = async (req, res) => {
  //get article id
  const { id } = req.params;

  //get article, check if exists
  try {
    let result = await pool.query(queries.getArticleByID, [id]);
    if (result.rowCount == 0) {
      throw Error("Article not found.");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Article not found." });
  }

  //delete article
  try {
    let result = await pool.query(queries.deleteArticleByID, [id]);
    if (result.rowCount == 0) {
      throw Error("Failed to delete article.");
    }
    return res.status(201).json({ message: "Successfully deleted article." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete article." });
  }
};

const unpublishArticle = async (req, res) => {
  //get article id
  const { id } = req.params;

  //get article, check if exists
  try {
    let result = await pool.query(queries.getArticleByID, [id]);
    if (result.rowCount == 0) {
      throw Error("Article not found.");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Article not found." });
  }

  //unpublish article
  try {
    let result = await pool.query(queries.unpublishArticle, [id]);
    if (result.rowCount == 0) {
      throw Error("No articles updated");
    }
    return res
      .status(200)
      .json({ message: "Successfully unpublished article." });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Article unable to be unpublished." });
  }
};

const publishArticle = async (req, res) => {
  //get article id
  const { id } = req.params;

  //get article, check if exists
  try {
    let result = await pool.query(queries.getArticleByID, [id]);
    if (result.rowCount == 0) {
      throw Error("Article not found.");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Article not found." });
  }

  //publish article
  try {
    let result = await pool.query(queries.publishArticle, [id]);
    if (result.rowCount == 0) {
      throw Error("No articles updated");
    }
    return res.status(200).json({ message: "Successfully published article." });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Article unable to be published." });
  }
};

module.exports = {
  loginAdminUser,
  giveAdminToUser,
  removeAdminFromUser,
  searchUsers,
  getUserData,
  deleteUser,
  publishArticle,
  unpublishArticle,
  getArticle,
  deleteArticle,
  searchArticles,
};
