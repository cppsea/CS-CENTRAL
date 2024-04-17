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

const trackUserInteraction = async (userId, articleId, actionType) => {
    await pool.query(queries.trackUserInteraction, [userId, articleId, actionType]);
};

const getRecommendedArticles = async (req, res) => {
  const numRecommended = parseInt(req.query.num);
  const userId = req.cookies.userId; 

  const recommendedArticles = await pool.query(queries.getRecommendedArticles, [numRecommended, userId]);
  res.status(200).json(recommendedArticles.rows);
  console.log("GET RECOMMENDED ARTICLES");
};


const addArticles = async (req, res) => {
  const { title } = req.body;
  const userId = req.cookies.userId; 

  await pool.query(queries.addArticles, [title]);
  const newArticleId = await pool.query(queries.getArticleIdByTitle, [title]);
    
  await trackUserInteraction(userId, newArticleId.rows[0].id, 'view');
    
  res.status(200).send("Article added");
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
  getRecommendedArticles,
  addArticles,
  deleteArticle,
};
