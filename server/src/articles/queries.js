const getArticles = "SELECT * FROM articles";
const getArticlesById = "SELECT * FROM articles WHERE id = $1";
const addArticles = "INSERT INTO articles (title,author_id,headers) VALUES ($1,$2,$3)";
const getArticlesByTitle = "SELECT * FROM articles WHERE LOWER(title) LIKE '%$1%'";//https://www.w3schools.com/sql/sql_like.asp
const deleteArticle = "DELETE FROM articles WHERE id = $1";
const replaceArticle = "";

module.exports = {
  getArticles,
  getArticlesById,
  addArticles,
  getArticlesByTitle,
  deleteArticle,
  replaceArticle,
};
