const pool = require("../../db.js");
const queries = require("./queries");

const getUsers = async (req, res) => {
    try {
        const allUsers = await pool.query(queries.getUsers);
        res.status(200).json(allUsers.rows);
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
        const { username, user_password } = req.body;
        pool.query(queries.createUser, [username, user_password]);
        res.status(200).send("User added");
    } catch (err) {
        console.error(err.message);
    }

};

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
    deleteAccount
}