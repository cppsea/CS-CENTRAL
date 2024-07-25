const pool = require("../../db.js");
const queries = require("./queries");
const { validate, validateParams } = require("../middleware/validate");
const { addBookmarkSchema, deleteBookmarkSchema } = require("./validation");

const getBookmarks = async (req, res) => {
  try {
    console.log("GET bookmarked articles");
    pool.query(queries.getBookmarks, [req.user.id], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(results.rows);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addBookmarks = async (req, res) => {
  try {
    // Check if the article_id exists in the database
    const { article_id } = req.body;
    const articleResult = await pool.query("SELECT id FROM articles WHERE id = $1", [article_id]);
    if (articleResult.rows.length === 0) {
      return res.status(400).json({ error: 'The article ID does not exist in the database' });
    }

    pool.query(queries.addBookmark, [article_id, req.user.id], (error, results) => {
      if (error) {
        console.error(error);
        // Check if bookmark already exists
        if (error.code == 23505) {
          return res.status(400).json({ error: 'Bookmark already exists, non-unique combination of user_id and article_id' });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(201).json({ message: 'Bookmark added successfully' });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteBookmarks = async (req, res) => {
  const ids = req.params.id.split(',').map(Number);
  const userId = req.user.id;

  try {
    if (ids.length > 1) {
      // Delete multiple bookmarks
      const query = queries.deleteMultipleBookmarks.replace('$1', ids.join(',')).replace('$2', userId);
      pool.query(query, (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.rowCount === 0) {
          return res.status(400).json({ error: 'No bookmarks found to delete' });
        }
        res.status(201).json({ message: 'Bookmarks deleted successfully' });
      });
    } else {
      const result = await pool.query(queries.deleteBookmark, [ids[0], userId]);
      if (result.rowCount === 0) {
        return res.status(400).json({ error: 'Bookmark not found' });
      }
      res.status(201).json({ message: 'Bookmark deleted successfully' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getBookmarks,
  addBookmarks,
  deleteBookmarks,
};
