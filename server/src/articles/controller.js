const { query } = require("express");
const pool = require("../../db.js");
const queries = require("./queries");
const userQueries = require("../users/queries.js");
const { cloudinary1 } = require("../images/config");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const { error } = require("console");

//helper functions

const parallelUploadImages = async (images, concurrency = 5) => {
  const pLimit = (await import("p-limit")).default;
  const limit = pLimit(concurrency);
  const successes = []; // keep successful uploads
  try {
    await Promise.all(
      images.map((file) =>
        limit(async () => {
          //upload image
          try {
            const { secure_url, public_id } = await cloudinary1.uploader.upload(
              file.path
            );
            successes.push({
              url: secure_url,
              public_id,
            });

            return {
              url: secure_url,
              public_id,
            };
          } finally {
            //remove file from disk
            await fs.unlink(file.path).catch(() => {});
          }
        })
      )
    );

    return successes; // every upload succeeded
  } catch (err) {
    // if any uploads fail, we need to delete the ones that succeeded
    await Promise.all(
      successes.map((s) => cloudinary1.uploader.destroy(s.public_id))
    );
    throw err;
  }
};

const parallelDeleteImages = async (images, concurrency = 5) => {
  const pLimit = (await import("p-limit")).default;

  const limit = pLimit(concurrency);
  const successes = []; // keep successful deletes
  try {
    await Promise.all(
      images.map((image) =>
        limit(async () => {
          //delete image
          let result = await cloudinary1.uploader.destroy(image.public_id);
          successes.push(image.public_id);
        })
      )
    );
    return successes;
  } catch (err) {
    console.log(err);
  }
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
  const date = new Date(article.published_at);
  const publishDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

  newArticle.published_at = publishDate;

  return newArticle;
};
//route middle ware

const getMyArticles = async (req, res) => {
  const authorId = req.user.id;
  if (authorId) {
    pool.query(queries.getMyArticles, [authorId], async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const articles = [];

      for (const articleObject of results.rows) {
        let processedArticle = await processArticle(articleObject);
        articles.push(processedArticle);
      }

      res.status(200).json(articles);
    });
  } else {
    return res.status(404).json({ error: "Not authorized to access" });
  }
};

const getArticles = async (req, res) => {
  if (req.user) {
    if (req.query.title) {
      await pool.query(
        queries.auth_getArticlesByTitle
          .replace("$1", req.query.title)
          .replace("$2", req.user.id),
        async (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          const articles = [];

          for (const articleObject of results.rows) {
            let processedArticle = await processArticle(articleObject);
            articles.push(processedArticle);
          }
          res.status(200).json(articles);
        }
      );
    } else {
      pool.query(
        queries.auth_getArticles,
        [req.user.id],
        async (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          const articles = [];

          for (const articleObject of results.rows) {
            let processedArticle = await processArticle(articleObject);
            articles.push(processedArticle);
          }

          res.status(200).json(articles);
        }
      );
    }
  } else {
    if (req.query.title) {
      pool.query(
        queries.getArticlesByTitle.replace("$1", req.query.title),
        async (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          const articles = [];

          for (const articleObject of results.rows) {
            let processedArticle = await processArticle(articleObject);
            articles.push(processedArticle);
          }

          res.status(200).json(articles);
        }
      );
      return;
    } else {
      pool.query(queries.getArticles, async (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        const articles = [];

        for (const articleObject of results.rows) {
          let processedArticle = await processArticle(articleObject);
          articles.push(processedArticle);
        }

        res.status(200).json(articles);
      });
    }
  }
};

const getArticlesById = async (req, res) => {
  const id = parseInt(req.params.id);
  if (req.user) {
    pool.query(
      queries.auth_getArticlesById,
      [req.user.id, id],
      async (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        const articles = [];

        for (const articleObject of results.rows) {
          let processedArticle = await processArticle(articleObject);
          articles.push(processedArticle);
        }
        res.status(200).json(articles);
      }
    );
  } else {
    pool.query(queries.getArticlesById, [id], async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const articles = [];

      for (const articleObject of results.rows) {
        let processedArticle = await processArticle(articleObject);
        articles.push(processedArticle);
      }
      res.status(200).json(articles);
    });
  }
};

// const addArticles = (req, res) => {
//   try {
//     const { title, author_id, article_body } = req.body;
//     pool.query(
//       queries.addArticles,
//       [title, author_id, article_body],
//       (error, results) => {
//         if (error) {
//           console.error(error);
//           return res.status(500).json({ error: "Internal Server Error" });
//         }
//         res.status(201).json({ message: "Article added successfully" });
//       }
//     );
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const addArticle = async (req, res) => {
  //validate articleEditorData
  try {
    if (!req.body.articleEditorData) {
      return res
        .status(400)
        .json({ error: "You must include proper article editor data" });
    }

    try {
      JSON.parse(req.body.articleEditorData);
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Article editor data must be json" });
    }

    try {
      let article = JSON.parse(req.body.articleEditorData);

      if (
        !article.header?.blocks ||
        article.header.blocks.length === 0 ||
        !article.header.blocks[0].data?.text ||
        typeof article.header.blocks[0].data?.text !== "string"
      ) {
        throw Error("The header cannot be empty and must have text provided.");
      }
      if (
        !article.description?.blocks ||
        article.description.blocks.length === 0 ||
        !article.description.blocks[0].data?.text ||
        typeof article.description.blocks[0].data?.text !== "string"
      ) {
        throw Error(
          "The description cannot be empty and must have text provided."
        );
      }

      if (
        !article.articleBody ||
        article.articleBody.length === 0 ||
        !article.articleBody[0].blocks ||
        article.articleBody[0].blocks.length === 0
      ) {
        throw Error("The article body cannot be empty.");
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: err.message });
    }

    //get user id
    const token = req.headers.authorization.split(" ")[1];
    const jwtUsername = jwt.verify(token, process.env.SECRET).id;
    let user = null;
    try {
      user = await pool.query(userQueries.getUserByUsername, [jwtUsername]);
      user = user.rows[0];
    } catch (err) {
      return res.status(401).json({ error: "User not found" });
    }
    //upload images to cloudinary and image database

    //create 1 to many relationship table between article and images called Article_Images
    //    - will not be used in article data, but will be used to maintain link between images and article for updates or deletion

    //after upload create corresponding entries in image table and Article_Images

    //store image id reference in json object image
    //since foreign key references in json objects not natively supported,
    // must perform application level validation as to whether an image exists when referencing id in json

    //if validation fails insert a default image instead (probably just use defined cloudinary url for default), up to user to reupload image

    //create two copies of the article data, one for database storage, one for return to user with updates

    //check if article main image exists, if it does
    //store image ID in database copy, cloudinary url for user copy

    //repeat process for the rest of images in article body except with the images array in req.files, keep track with image index

    //return new article

    //if there's an error, need to delete all images from cloudinary, any created entries from Image, article_image, and article tables

    //this is to store new images for when if there is an error and we need to delete all the uploaded images from cloudinary
    const uploadedImagesCopy = [];
    try {
      const newArticleData = JSON.parse(req.body.articleEditorData);
      const newArticleDataUserCopy = JSON.parse(req.body.articleEditorData);
      let imageIndex = 0;

      //upload images to cloudinary
      const mainImageExists =
        req.files["main_image"] && req.files["main_image"][0];
      const imagesExist = req.files["images"] && req.files["images"].length > 0;
      const mainImage = mainImageExists ? [req.files["main_image"][0]] : [];
      const images = imagesExist ? [...req.files["images"]] : [];
      const imagesToUpload = [...mainImage, ...images];
      const uploads = await parallelUploadImages(imagesToUpload, 5);
      uploads.forEach((upload) => uploadedImagesCopy.push(upload));

      //upload images to images table and create references in article_images
      await pool.query("BEGIN");

      //we need to create an empty article in database to get article id
      let dummyArticle = await pool.query(queries.addArticles, [
        "",
        user.id,
        {},
      ]);
      dummyArticle = dummyArticle.rows[0];

      const articleID = dummyArticle.id;
      const imageEntities = [];
      if (uploads.length > 0) {
        for (const upload of uploads) {
          let result = await pool.query(queries.insertImage, [
            upload.public_id,
            upload.url,
          ]);

          result = result.rows[0];
          imageEntities.push(result);
          await pool.query(queries.insertArticleImage, [result.id, articleID]);
        }
      }

      //process main article image
      if (mainImageExists) {
        newArticleData.image = imageEntities[imageIndex].id;
        newArticleDataUserCopy.image = imageEntities[imageIndex].url;
        imageIndex++;
      }

      //go through new data, when we encounter image block replace database copy with image id and user copy with url

      newArticleData.articleBody.map((section, sectionIndex) => {
        section.blocks.map((block, blockIndex) => {
          if (block.type === "image") {
            newArticleData.articleBody[sectionIndex].blocks[
              blockIndex
            ].data.url = imageEntities[imageIndex].id;
            newArticleDataUserCopy.articleBody[sectionIndex].blocks[
              blockIndex
            ].data.url = imageEntities[imageIndex].url;

            imageIndex++;
          }
        });
      });

      //need to edit prior empty article with real data
      let newArticleResult = await pool.query(queries.editArticle, [
        newArticleData.header.blocks[0].data.text,
        newArticleData,
        articleID,
        user.id,
      ]);
      newArticleResult = newArticleResult.rows[0];
      newArticleDataUserCopy.id = newArticleResult.id;
      await pool.query("COMMIT");

      //return new article
      return res.status(200).json({ article: newArticleDataUserCopy });
    } catch (error) {
      //rollback changes to database and delete the new images from cloudinary
      //if errors occured during uploading new images then nothing major should happen
      console.error(error);
      try {
        await pool.query("ROLLBACK");
        await parallelDeleteImages(uploadedImagesCopy);
      } catch (error) {
        console.log(error);
      } finally {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const editArticle = async (req, res) => {
  //validate articleEditorData
  try {
    if (!req.body.articleEditorData) {
      return res
        .status(400)
        .json({ error: "You must include proper article editor data" });
    }

    try {
      JSON.parse(req.body.articleEditorData);
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Article editor data must be json" });
    }

    try {
      let article = JSON.parse(req.body.articleEditorData);

      if (
        !article.header?.blocks ||
        article.header.blocks.length === 0 ||
        !article.header.blocks[0].data?.text ||
        typeof article.header.blocks[0].data?.text !== "string"
      ) {
        throw Error("The header cannot be empty and must have text provided.");
      }
      if (
        !article.description?.blocks ||
        article.description.blocks.length === 0 ||
        !article.description.blocks[0].data?.text ||
        typeof article.description.blocks[0].data?.text !== "string"
      ) {
        throw Error(
          "The description cannot be empty and must have text provided."
        );
      }

      if (
        !article.articleBody ||
        article.articleBody.length === 0 ||
        !article.articleBody[0].blocks ||
        article.articleBody[0].blocks.length === 0
      ) {
        throw Error("The article body cannot be empty.");
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: err.message });
    }

    //check to see if article exists
    const articleID = req.params.id;
    let articleResult = await pool.query(queries.getArticlesById, [articleID]);
    if (articleResult.rowCount == 0) {
      return res
        .status(400)
        .json({ error: "Article not found or Not authorized to edit" });
    }
    articleResult = articleResult.rows[0];

    //ensure that id matches the article's id
    //extract unique username from jwt to make sure we are changing the user that the jwt is associated with
    const token = req.headers.authorization.split(" ")[1];
    const jwtUsername = jwt.verify(token, process.env.SECRET).id;
    let user = null;
    try {
      user = await pool.query(userQueries.getUserByUsername, [jwtUsername]);
      user = user.rows[0];
    } catch (err) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!user || user.id !== articleResult.author_id) {
      return res
        .status(403)
        .json({ error: "Not authorized to edit this user's articles" });
    }

    //upload images to cloudinary and image database

    //create 1 to many relationship table between article and images called Article_Images
    //    - will not be used in article data, but will be used to maintain link between images and article for updates or deletion

    //after upload create corresponding entries in image table and Article_Images

    //store image id reference in json object image
    //since foreign key references in json objects not natively supported,
    // must perform application level validation as to whether an image exists when referencing id in json

    //if validation fails insert a default image instead (probably just use defined cloudinary url for default), up to user to reupload image

    //keep track of current index of image, only increment when not a url

    //create two copies of the article data, one for database storage, one for return to user with updates

    //grab old copy from database if it exists

    //check if article main image exists, if it does
    //store image ID in database copy, cloudinary url for user copy
    //record old image if it is getting replaced for deletion

    //repeat process for the rest of images in article body except with the images array in req.files, increment image index to keep track
    //if we encounter old image, record url to keep track of what not to delete

    //go through old article data, record all images
    //grab all images associated with old article, delete all that wasn't marked to be kept from database and cloudinary (include main article image as well)

    //return new article

    //if there's an error, need to delete all images from cloudinary, any created entries from Image and ArticleImage tables, bring back old images

    //this is to store new images for when if there is an error and we need to delete all the uploaded images from cloudinary
    const uploadedImagesCopy = [];
    try {
      const isOldImage = (input) => input.includes("cloudinary");

      const newArticleData = JSON.parse(req.body.articleEditorData);
      const oldArticleData = articleResult.article_body;
      const newArticleDataUserCopy = JSON.parse(req.body.articleEditorData);

      //upload images to cloudinary
      const mainImageExists =
        req.files["main_image"] && req.files["main_image"][0];
      const imagesExist = req.files["images"] && req.files["images"].length > 0;
      const mainImage = mainImageExists ? [req.files["main_image"][0]] : [];
      const images = imagesExist ? [...req.files["images"]] : [];
      const imagesToUpload = [...mainImage, ...images];
      const uploads = await parallelUploadImages(imagesToUpload, 5);
      uploads.forEach((upload) => uploadedImagesCopy.push(upload));

      //upload images to images table and create references in article_images
      await pool.query("BEGIN");

      //need to record all old images so need to grab them here before we add new ones
      //get all images associated with old article
      let oldImages = await pool.query(queries.getAllImagesByArticleID, [
        articleID,
      ]);
      oldImages = oldImages.rows;

      const imageEntities = [];
      if (uploads.length > 0) {
        for (const upload of uploads) {
          let result = await pool.query(queries.insertImage, [
            upload.public_id,
            upload.url,
          ]);

          result = result.rows[0];

          imageEntities.push(result);
          await pool.query(queries.insertArticleImage, [result.id, articleID]);
        }
      }

      let imageIndex = 0;
      let oldMainImage = null;
      const oldImagesToKeepUrls = new Set();

      //process main article image
      if (mainImageExists) {
        const mainImageID = oldArticleData.image;
        //try to delete, if it fails just replace
        try {
          const result = await pool.query(queries.deleteImageByID, [
            mainImageID,
          ]);
          oldMainImage = result.rows[0];
        } catch (err) {
          console.log(err);
        }

        newArticleData.image = imageEntities[imageIndex].id;
        newArticleDataUserCopy.image = imageEntities[imageIndex].url;
        imageIndex++;
      }

      //go through new data, when we encounter image block if it is a new image replace database copy with image id and user copy with url
      //if we encounter old image, record it as an image to keep instead of deleting/replacing

      for (const [
        sectionIndex,
        section,
      ] of newArticleData.articleBody.entries()) {
        for (const [blockIndex, block] of section.blocks.entries()) {
          if (block.type === "image") {
            if (
              typeof block.data.url === "string" &&
              isOldImage(block.data.url)
            ) {
              oldImagesToKeepUrls.add(block.data.url);
            } else {
              newArticleData.articleBody[sectionIndex].blocks[
                blockIndex
              ].data.url = imageEntities[imageIndex].id;
              newArticleDataUserCopy.articleBody[sectionIndex].blocks[
                blockIndex
              ].data.url = imageEntities[imageIndex].url;
              imageIndex++;
            }
          }
        }
      }

      //go through old data, record all old image ids
      const oldImageIdsinBody = new Set();
      oldArticleData.articleBody.map((section) => {
        section.blocks.map((block) => {
          if (block.type === "image") {
            oldImageIdsinBody.add(block.data.url);
          }
        });
      });

      //filter out the ones that are in OldImageIds and arent one of the ones to keep
      oldImages = oldImages.filter(
        (image) =>
          oldImageIdsinBody.has(image.id) && !oldImagesToKeepUrls.has(image.url)
      );
      //add in the old main image if needed
      if (oldMainImage) {
        oldImages.push(oldMainImage);
      }

      //delete them from cloudinary and database
      try {
        await parallelDeleteImages(oldImages, 5);

        await pool.query(queries.deleteImages, [
          oldImages.map((image) => image.id),
        ]);
      } catch (error) {
        console.log(error);
      }

      for (const [
        sectionIndex,
        section,
      ] of newArticleData.articleBody.entries()) {
        for (const [blockIndex, block] of section.blocks.entries()) {
          if (
            block.type === "image" &&
            typeof block.data.url === "string" &&
            isOldImage(block.data.url)
          ) {
            // Find image based off URL
            const result = await pool.query(queries.getImageByUrl, [
              block.data.url,
            ]);

            const image = result.rows[0];
            if (image) {
              newArticleData.articleBody[sectionIndex].blocks[
                blockIndex
              ].data.url = image.id;
            } else {
              console.warn("Image not found for URL:", block.data.url);
            }
          }
        }
      }

      //if there was no new main image provided, do the same
      if (!mainImageExists && isOldImage(newArticleData.image)) {
        let result = await pool.query(queries.getImageByUrl, [
          newArticleData.image,
        ]);
        result = result.rows[0];
        //replace with id
        newArticleData.image = result.id;
      }

      //update article in database

      let newArticleResult = await pool.query(queries.editArticle, [
        newArticleData.header.blocks[0].data.text,
        newArticleData,
        articleID,
        user.id,
      ]);
      newArticleResult = newArticleResult.rows[0];
      newArticleDataUserCopy.id = newArticleResult.id;

      await pool.query("COMMIT");

      //return new article
      return res.status(200).json({ article: newArticleDataUserCopy });
      W;
    } catch (error) {
      //rollback changes to database and delete the new images from cloudinary
      //if errors occured during uploading new images then nothing major should happen

      //if errors happen during image deletion then we cannot really bring the old images back, references in database will still stay the same but the urls may be invalid
      //users will have to reupload images
      console.error(error);
      try {
        await pool.query("ROLLBACK");
        await parallelDeleteImages(uploadedImagesCopy);
      } catch (error) {
        console.log(error);
      } finally {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const publishArticle = (req, res) => {
  try {
    const { id } = req.body;
    const author_id = req.user.id;

    pool.query(queries.publishArticle, [id, author_id], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.rowCount == 0) {
        return res
          .status(404)
          .json({ error: "Article does not exist or Not authorized to edit" });
      }

      res.status(200).json({ message: "Article published successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const unpublishArticle = (req, res) => {
  try {
    const { id } = req.body;
    const author_id = req.user.id;

    pool.query(queries.unpublishArticle, [id, author_id], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.rowCount == 0) {
        return res
          .status(404)
          .json({ error: "Article does not exist or Not authorized to edit" });
      }

      res.status(200).json({ message: "Article unpublished successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteArticle = async (req, res) => {
  const articleId = parseInt(req.params.id);

  //verify that the user owns this article
  const token = req.headers.authorization.split(" ")[1];
  const jwtUsername = jwt.verify(token, process.env.SECRET).id;
  let user = null;
  try {
    user = await pool.query(userQueries.getUserByUsername, [jwtUsername]);
    user = user.rows[0];
  } catch (err) {
    return res.status(401).json({ error: "User not found" });
  }
  //check to see if article exists
  let articleResult = await pool.query(queries.getArticlesById, [articleId]);
  if (articleResult.rowCount == 0) {
    return res
      .status(400)
      .json({ error: "Article not found or Not authorized to delete" });
  }

  articleResult = articleResult.rows[0];
  if (!user || user.id !== articleResult.author_id) {
    return res
      .status(403)
      .json({ error: "Not authorized to edit this user's articles" });
  }

  try {
    //get all images relating to the article, delete them from database and cloudinary
    let images = await pool.query(queries.getAllImagesByArticleID, [articleId]);
    images = images.rows;

    const imageIds = images.map((image) => image.id);

    await pool.query(queries.deleteImages, [imageIds]);
    await parallelDeleteImages(images, 5);
  } catch (err) {
    console.log(err);
  }

  //delete article
  try {
    await pool.query(queries.deleteArticle, [articleId]);
    return res.status(200).send({ message: "Article successfully deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Could not delete article." });
  }
};

module.exports = {
  getMyArticles,
  getArticles,
  getArticlesById,
  addArticle,
  deleteArticle,
  editArticle,
  publishArticle,
  unpublishArticle,
};
