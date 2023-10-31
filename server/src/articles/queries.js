const getArticles = "SELECT * FROM articles";
const getArticlesById = "SELECT * FROM articles WHERE id = $1";
const addArticles = "INSERT INTO articles (title) VALUES ($1)";
const getArticlesByTitle = "SELECT * FROM articles WHERE title = $1";

module.exports = 
{
    getArticles,
    getArticlesById,
    addArticles,
    getArticlesByTitle
}