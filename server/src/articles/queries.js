const getMyArticles = "SELECT * FROM articles WHERE author_id = $1";

const getArticles = "SELECT * FROM articles";
const getArticlesById = "SELECT * FROM articles WHERE id = $1";
const addArticles =
  "INSERT INTO articles (title, author_id, article_body, is_published) VALUES ($1, $2, $3, FALSE)";
const editArticle =
  "UPDATE articles SET title = $1, article_body = $2 WHERE id = $3 AND author_id = $4 RETURNING *;";
const getArticlesByTitle =
  "SELECT * FROM articles WHERE LOWER(title) LIKE '%$1%'"; //https://www.w3schools.com/sql/sql_like.asp
const deleteArticle = "DELETE FROM articles WHERE id = $1";
const publishArticle =
  "UPDATE articles set is_published = TRUE WHERE id = $1 AND author_id = $2 RETURNING *";
const unpublishArticle =
  "UPDATE articles set is_published = FALSE WHERE id = $1 AND author_id = $2 RETURNING *";

const auth_getArticlesById =
  'SELECT articles.*, CASE WHEN bookmarks.article_id IS NOT NULL THEN TRUE ELSE FALSE END AS "isBookmarked" FROM articles LEFT JOIN bookmarks ON bookmarks.article_id  = articles.id AND bookmarks.user_id = ($1) WHERE id = ($2)';
const auth_getArticles =
  'SELECT articles.*, CASE WHEN bookmarks.article_id IS NOT NULL THEN TRUE ELSE FALSE END AS "isBookmarked" FROM articles LEFT JOIN bookmarks ON bookmarks.article_id  = articles.id AND bookmarks.user_id = ($1)';
const auth_getArticlesByTitle =
  "SELECT articles.*, CASE WHEN bookmarks.article_id IS NOT NULL THEN TRUE ELSE FALSE END AS \"isBookmarked\" FROM articles LEFT JOIN bookmarks ON bookmarks.article_id  = articles.id AND bookmarks.user_id = ($2) WHERE title LIKE '%$1%'";

module.exports = {
  getMyArticles,
  getArticles,
  getArticlesById,
  addArticles,
  getArticlesByTitle,
  deleteArticle,
  editArticle,
  publishArticle,
  unpublishArticle,
  auth_getArticles,
  auth_getArticlesById,
  auth_getArticlesByTitle,
};
