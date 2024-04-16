const getArticles = "SELECT * FROM articles";
const getArticlesById = "SELECT * FROM articles WHERE id = $1";
const getRecommendedArticles = "SELECT * FROM articles WHERE topic IN (SELECT topic FROM user_preferences WHERE user_id = $2) ORDER BY num_views DESC LIMIT $1";
const addArticles = "INSERT INTO articles (title) VALUES ($1)";
const getArticlesByTitle = "SELECT * FROM articles WHERE title = $1";
const trackUserInteraction = "INSERT INTO user_interactions (user_id, article_id, action_type) VALUES ($1, $2, $3)";
const deleteArticle = "DELETE FROM articles WHERE id = $1";
const replaceArticle = "";


module.exports = {
  getArticles,
  getArticlesById,
  getRecommendedArticles,
  addArticles,
  getArticlesByTitle,
  trackUserInteraction,
  deleteArticle,
  replaceArticle,
};
