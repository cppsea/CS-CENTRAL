const pool = require("../../db.js");
const queries = require("./queries");

const getArticles = async (req, res) => {
  console.log("GET ARTICLES");
  if (req.user) {
    console.log("WITH USER")
    if (req.query.title) {
      const articles = await pool.query(queries.auth_getArticlesByTitle.replace('$1',req.query.title).replace('$2',req.user.id),(error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results.rows);
      });
    } else {
      pool.query(queries.auth_getArticles,[req.user.id],(error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results.rows);
      });
    }
  } else {
    console.log("WITHOUT USER")
    if (req.query.title) {
      pool.query(queries.getArticlesByTitle.replace('$1',req.query.title),(error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results.rows);
      });
      return;
    } else {
      pool.query(queries.getArticles,(error, results) => {
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
  if (req.user){
    pool.query(queries.auth_getArticlesById, [req.user.id,id], (error, results) => {
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
    })
  }
};

const addArticles = (req, res) => {

  try {
    const { title,headers,author_id } = req.body;
    let headers_json = JSON.stringify(headers);

    pool.query(queries.addArticles, [title, author_id,headers_json], (error, results) => {
      if (error) {
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
  

const deleteArticle = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.deleteArticle, [id], (error, results) => {
    res.status(200).send("Article deleted");
  });
};

module.exports = {
  getArticles,
  getArticlesById,
  addArticles,
  deleteArticle,
};
