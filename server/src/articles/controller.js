const pool = require('../../db.js');
const queries = require('./queries');

const getArticles = async (req,res) =>
{

    if (req.query.title)
    {
        const articles = await pool.query(queries.getArticlesByTitle, [req.query.title]);
        res.status(200).json(articles.rows);
        console.log('GET ARTIICLES');
        return;
    }
    const articles = await pool.query(queries.getArticles);
    res.status(200).json(articles.rows);
    console.log('GET ARTIICLES')
}

const getArticlesById = (req,res) =>
{
    const id = parseInt(req.params.id);
    pool.query(queries.getArticlesById, [id], (error,results) =>
    {
        res.status(200).json(results.rows)
    })
}
const addArticles = (req,res) =>
{
    const { title } = req.body;
    pool.query(queries.addArticles, [title], (error,results) =>
    {
        res.status(200).send("Article added");
    })
}

module.exports = {
    getArticles,
    getArticlesById,
    addArticles
}