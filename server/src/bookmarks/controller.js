const { json } = require("body-parser");
const pool = require("../../db.js");
const queries = require("./queries");
const articleQueries = require("../articles/queries.js");
const jwt = require("jsonwebtoken");

const processArticle = async (article) => {
  //go through all image blocks, grab corresponding image urls, replace in data and return

  //currently we're storing the entire article data inside article body
  let newArticle = {
    ...article.article_body,
    isBookmarked: article.isBookmarked,
  };
  newArticle.articleBody.forEach(async (section, sectionIndex) => {
    await section.blocks.forEach(async (block, blockIndex) => {
      if (block.type === "image") {
        //id stored in the url field
        const imageId = block.data.url;
        let imageResult = await pool.query(articleQueries.getImageByImageId, [
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
  let imageResult = await pool.query(articleQueries.getImageByImageId, [
    imageId,
  ]);
  imageResult = imageResult.rows[0];
  newArticle.image = imageResult.url;

  //add in id
  newArticle.id = article.id;

  //add in author name
  let author = await pool.query(articleQueries.getUserByAuthorID, [
    article.author_id,
  ]);
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

const getBookmarks = async (req, res) => {
  try {
    console.log("GET bookmarked articles");
    pool.query(queries.getBookmarks, [req.user.id], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      let articles = [];

      for (const article of results.rows) {
        let currProcessedArticle = await processArticle(article);
        articles.push(currProcessedArticle);
      }

      return res.status(200).json({ articles: articles });
    });
  } catch (err) {
    console.error(err.message);
  }
};

const addBookmark = async (req, res) => {
  if (!req.body.article_id || isNaN(parseInt(req.body.article_id))) {
    return res
      .json(400)
      .json({ error: "Article ID must be provided as number." });
  }

  try {
    pool.query(
      queries.addBookmark,
      [req.body.article_id, req.user.id],
      (error, results) => {
        if (error) {
          console.error(error);
          if (error.code == 23505)
            return res.status(500).json({
              error: "Bookmark already exists.",
            });

          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(201).json({ message: "Bookmark added successfully" });
      }
    );
  } catch (err) {
    console.error(err.message);
  }
};

const deleteBookmark = async (req, res) => {
  if (!req.params.id || isNaN(parseInt(req.params.id))) {
    return res
      .json(400)
      .json({ error: "Article ID must be provided as number." });
  }

  try {
    pool.query(
      queries.deleteBookmark,
      [req.params.id, req.user.id],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        return res
          .status(201)
          .json({ message: "Bookmark deleted successfully" });
      }
    );
  } catch (err) {
    console.error(err.message);
  }
};

const deleteMultipleBookmarks = async (req, res) => {
  let article_ids = req.body.article_ids;

  if (!Array.isArray(article_ids)) {
    console.error("Article IDs is not array.");
    return res
      .status(400)
      .json({ error: "Article IDs must be provided in array." });
  }

  article_ids = article_ids.map((article_id) => Number(article_id));
  if (article_ids.some((ele) => isNaN(ele))) {
    return res.json(400).json({ error: "Article IDS must be numbers." });
  }

  try {
    pool.query(
      queries.deleteMultipleBookmarks,
      [article_ids, req.user.id],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(201).json({ message: "Bookmarks deleted successfully" });
      }
    );
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  getBookmarks,
  addBookmark,
  deleteBookmark,
  deleteMultipleBookmarks,
};
