//file used to ensure that only authenticated users can access any route protected by this middleware
const jwt = require('jsonwebtoken')
const pool = require("../../db.js");

const { getUserByUsername } = require('../users/queries')

//checking to see if user is authenticated, for editing, creating, deleting articles
const requireAuth = async (req, res, next) => {

    //verify that user is authenticated
    const { authorization } = req.headers
    console.log(authorization);
    if (!authorization){
        return next()
    }

    const token = authorization.split(' ')[1]


    try {

        //decodes jwt token and extracts id from token
        const {id} = jwt.verify(token, "secret string")
        console.log("decoded token payload: ", id);
        //uses id to find in database
        const userResult = await pool.query(getUserByUsername, [id]);

        if(!userResult || !userResult.rows || userResult.rows.length === 0){
            return next();
        }
        req.user = userResult.rows[0];
    } catch (error) {
        console.log(error)
    }
    next();
}


module.exports = requireAuth