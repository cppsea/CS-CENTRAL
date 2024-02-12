//checks if the authenticated user has necessary permissions to perform
// certain actions on articles

//deals with specific routes that deal with article-related actions to check
//the authenticated user has necessary permissions for those actions


/* 
plans for testing
1. make column in article database called author_ud
2. login as user x and create a article in database
3. logout as user x and sign in as user y
4. try and delete article in database that user x created as user y
*/

const pool = require("../../db.js");

const authorizeArticle = async (req, res, next) => {
    
    const articleId = req.params.id;

    //have to add new column to database
    //const authorId = req.params.authorId;
    
    if(!authorId) {
        return res.status(404).json({error: 'Article not found'});
    }

    if(req.user.id !== authorId) {
        return res.status(403).json({error: 'Unauthorized. You do not have permission to perform this action.'});
    }
    next();
};

module.exports = authorize.Article;

