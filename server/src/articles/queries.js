const getArticles = "SELECT * FROM articles";
const getArticlesById = "SELECT * FROM articles WHERE id = $1";
const getRecommendedArticles = "SELECT * FROM articles ORDER BY num_views DESC LIMIT $1";
const addArticles = "INSERT INTO articles (title) VALUES ($1)";
const getArticlesByTitle = "SELECT * FROM articles WHERE title = $1";
const deleteArticle = "DELETE FROM articles WHERE id = $1";
const replaceArticle = "";


module.exports = {
  getArticles,
  getArticlesById,
  getRecommendedArticles,
  addArticles,
  getArticlesByTitle,
  deleteArticle,
  replaceArticle,
};
