const { json } = require("body-parser");
const pool = require("../../db.js");
const queries = require("./queries");
const articlequeries = require("../articles/queries.js");
const jwt = require('jsonwebtoken');

const getBookmarks = async(req,res) => {
    try {
        console.log("GET bookmarked articles")
        pool.query(queries.getBookmarks,[req.user.id],(err,results) => {
            res.json(results.rows);
        })
        
    } catch (err) {
        console.error(err.message)
    }
}

const addBookmarks = async(req,res) => {
    try{ 
        pool.query(queries.addBookmark,[req.body.article_id,req.user.id],(error,results)=>{
            if (error) {
                console.error(error);
                if (error.code == 23505) return res.status(500).json({ error: 'Bookmark already exists, non unique combination of user_id and article_id' });
                
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'Bookmark added successfully' });
        })
    } catch(err) {
        console.error(err.message)
    }
}

const deleteBookmarks = async(req,res) => {
    console.log(req.params.id.split(','));
    const ids = req.params.id.split(',').map(Number);
    const id = parseInt(req.params.id);
    console.log(ids);

    try {
        if (ids.length > 1) {
            pool.query(queries.deleteMultipleBookmarks.replace('$1',ids.join(',')).replace('$2',req.user.id),(error,results)=>{
                if (error) {
                    console.error(error);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                res.status(201).json({ message: 'Bookmark deleted successfully' });
            })
        } else if (ids.length == 1) {
            pool.query(queries.deleteBookmark,[id,req.user.id],(error,results)=>{
                if (error) {
                    console.error(error);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                res.status(201).json({ message: 'Bookmark deleted successfully' });
            })
        }

    } catch(err) {
        console.error(err.message)
    }
}

module.exports = {
    getBookmarks,
    addBookmarks,
    deleteBookmarks,

}