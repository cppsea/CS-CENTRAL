const pool = require("../../db.js");
const queries = require("./queries");

const getArticles = async (req, res) => {
  console.log("GET ARTICLES");
  if (req.user) {
    if (req.query.title) {
      pool.query(queries.auth_getArticlesByTitle.replace('$1', req.query.title).replace('$2', req.user.id), (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results.rows);
      });
    } else {
      pool.query(queries.auth_getArticles, [req.user.id], (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results.rows);
      });
    }
  } else {
    if (req.query.title) {
      pool.query(queries.getArticlesByTitle.replace('$1', req.query.title), (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results.rows);
      });
      return;
    } else {
      pool.query(queries.getArticles, (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results.rows);
      });
    }
  }
};

const getArticlesById = async (req, res) => {
  const id = parseInt(req.params.id);
  if (req.user) {
    pool.query(queries.auth_getArticlesById, [req.user.id, id], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json(results.rows);
    });
  } else {
    pool.query(queries.getArticlesById, [id], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json(results.rows);
    });
  }
};

const addArticles = async (req, res) => {
  try {
    // Check if user is logged in
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized to post an article." });
    }

    const { title, headers } = req.body;
    const author_id = req.user.id;

    let headers_json = JSON.stringify(headers);
    pool.query(queries.addArticles, [title, author_id, headers_json], (error, results) => {
      if (error) {
        if (error.constraint === 'fk_author') {
          return res.status(400).json({ error: 'Author does not exist' });
        }
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(201).json({ message: 'Article added successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const articleId = parseInt(req.params.id);

    // Fetch the article to check the author_id
    const articleResult = await pool.query("SELECT author_id FROM articles WHERE id = $1", [articleId]);

    if (articleResult.rows.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const article = articleResult.rows[0];

    // Check if the authenticated user is the author of the article
    if (article.author_id !== req.user.id) {
      return res.status(403).json({ error: 'Access forbidden: You can only delete your own articles' });
    }

    // Proceed to delete the article
    await pool.query(queries.deleteArticle, [articleId]);
    res.status(200).send("Article deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getArticles,
  getArticlesById,
  addArticles,
  deleteArticle,
};
