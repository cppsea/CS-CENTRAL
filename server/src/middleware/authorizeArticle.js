//checks if the authenticated user has necessary permissions to perform
// certain actions on articles

//deals with specific routes that deal with article-related actions to check
//the authenticated user has necessary permissions for those actions


/* 
plans for testing
1. make column in article database called author_id
2. login as user x and create a article in database
3. logout as user x and sign in as user y
4. try and delete article in database that user x created as user y
*/


/** 2/13
 * 1. now able to create articles etc using middleware but having
 * trouble linking author_id data in article database
 *
 * ex: login as user test5 has id 10, 
 * create article called "testing authorization"
 * suppose to also add author_id which should be 10
 * however in database it shows as null
 */
const pool = require("../../db.js");

const authorizeArticle = async (req, res, next) => {
    const articleId = req.params.id;

    try {
        const result = await pool.query('SELECT author_id FROM articles WHERE id = $1', [articleId]);

        if (!result.rows || result.rows.length === 0) {
            return res.status(404).json({ error: 'Article not found' });
        }

        const authorId = result.rows[0].author_id;

        if (req.user.id !== authorId) {
            return res.status(403).json({ error: 'Unauthorized. You do not have permission to perform this action.' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = authorizeArticle;
