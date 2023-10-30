const pool = require('../../db.js');
const queries = require('./queries');

const getArticles = (req,res) =>
{
    pool.query(queries.getArticles , (error, results) =>
    {
        if (error) throw error;

        res.status(200).json(results.rows);

    })
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