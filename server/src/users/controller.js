const { json } = require("body-parser");
const pool = require("../../db.js");
const queries = require("./queries");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (id) =>
{
    return jwt.sign({id: id}, "secret string", { expiresIn : '3d'})
}

const getUsers = async (req, res) => {
    try {
        console.log("GET user");
        /*
        const allUsers = await pool.query(queries.getUsers);
        res.status(200).json(allUsers.rows);
        */
       res.json(req.user);
    } catch (err) {
        console.error(err.message);
    }
};

const getUsersById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await pool.query(queries.getUsersById, [id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
}

const createUser = async (req, res) => {
    try {


        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.user_password, salt)
        const { username } = req.body;
        pool.query(queries.createUser, [username, hashedPassword])

        const token = createToken(username);

        

        res.status(200).json({username,token});

    } catch (err) {
        console.error(err.message);
    }

};

const loginUser = async (req, res) => {
    const { username, user_password } = req.body;
    console.log("req body", req.body);
    console.log("received login request for username:", username);
    try {
        const result = await pool.query(queries.getUserByUsername, [username]);
        if(result.rows.length === 0){
            return res.status(400).send("Error finding username")
        }
        const user = result.rows[0];
        console.log("password:", user_password);
        console.log("password hased:", user.password);
        if(await bcrypt.compare(user_password, user.password)){
            //res.send("Success");
            const token = createToken(username);
            res.json({username,token})
        }
        else{
            res.send("Not allowed");
        }
    } catch (error) {
        res.status(500).send();
    }
}

const changeUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, user_password } = req.body;
        await pool.query(queries.changeUser, [username, user_password, id]);
        res.status(200).send("Username and password changed");
    } catch (err) {
        console.error(err.message);
    }
};

const deleteAccount = async (req, res) => {
    try {
        const id = req.params.id;
        await pool.query(queries.deleteAccount, [id]);
        console.log(`Deleted article with ID ${id}`);
        res.status(200).send("User deleted");
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    getUsers,
    getUsersById,
    createUser,
    changeUser,
    deleteAccount,
    loginUser,
}