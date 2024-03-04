const pool = require("../../db.js");
const queries = require("./queries");

const getArticles = async (req, res) => {
  if (req.query.title) {
    const articles = await pool.query(queries.getArticlesByTitle, [
      req.query.title,
    ]);
    res.status(200).json(articles.rows);
    console.log("GET ARTICLES");
    return;
  }
  const articles = await pool.query(queries.getArticles);
  res.status(200).json(articles.rows);
  console.log("GET ARTICLES");
};

const getArticlesById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getArticlesById, [id], (error, results) => {
    res.status(200).json(results.rows);
  });
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
