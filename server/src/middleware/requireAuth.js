const jwt = require('jsonwebtoken')
const { getUsersById } = require('../users/queries')

const requireAuth = async (req, res, next) => {

    //verify that user is authenticated
    const { authorization } = req.headers

    if (!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]


    try {

        //decodes jwt token and extracts id from token
        const {id} = jwt.verify(token, "secret string")
        
        //uses id to find in database
        const userResult = await pool.query(getUsersById, [id], (error, results) => {
            res.status(200).json(results.rows)
        })
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}


module.exports = requireAuth