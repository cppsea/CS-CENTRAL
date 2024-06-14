const getArticles = "SELECT * FROM articles";
const getArticlesById = "SELECT * FROM articles WHERE id = $1";
const addArticles = "INSERT INTO articles (title,author_id,headers) VALUES ($1,$2,$3)";
const getArticlesByTitle = "SELECT * FROM articles WHERE LOWER(title) LIKE '%$1%'";//https://www.w3schools.com/sql/sql_like.asp
const deleteArticle = "DELETE FROM articles WHERE id = $1";
const replaceArticle = "";

const auth_getArticlesById = "SELECT articles.*, CASE WHEN bookmarks.article_id IS NOT NULL THEN TRUE ELSE FALSE END AS \"isBookmarked\" FROM articles LEFT JOIN bookmarks ON bookmarks.article_id  = articles.id AND bookmarks.user_id = ($1) WHERE id = ($2)";
const auth_getArticles = "SELECT articles.*, CASE WHEN bookmarks.article_id IS NOT NULL THEN TRUE ELSE FALSE END AS \"isBookmarked\" FROM articles LEFT JOIN bookmarks ON bookmarks.article_id  = articles.id AND bookmarks.user_id = ($1)";
const auth_getArticlesByTitle = "SELECT articles.*, CASE WHEN bookmarks.article_id IS NOT NULL THEN TRUE ELSE FALSE END AS \"isBookmarked\" FROM articles LEFT JOIN bookmarks ON bookmarks.article_id  = articles.id AND bookmarks.user_id = ($2) WHERE title LIKE '%$1%'";

module.exports = {
  getArticles,
  getArticlesById,
  addArticles,
  getArticlesByTitle,
  deleteArticle,
  replaceArticle,
  auth_getArticles,
  auth_getArticlesById,
  auth_getArticlesByTitle,
};
