const { json } = require("body-parser");
const pool = require("../../db.js");
const queries = require("./queries");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validate, validateParams } = require("../middleware/validate");
const { userSchema, userIdSchema, changeUserSchema } = require("./validation");

const createToken = (id) => {
    return jwt.sign({ id: id }, "secret string", { expiresIn: '3d' });
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
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUsersById = async (req, res) => {
    try {
        const id = parseInt(req.params.id); // Assumes this has been validated by middleware
        const user = await pool.query(queries.getUsersById, [id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createUser = async (req, res) => {
    try {
        const { username, user_password } = req.body; 

        // Check if username already exists
        const userExists = await pool.query(queries.getUserByUsername, [username]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user_password, salt);

        await pool.query(queries.createUser, [username, hashedPassword]);
        const token = createToken(username);

        res.status(200).json({ username, token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const loginUser = async (req, res) => {
    const { username, user_password } = req.body;
    //console.log("req body", req.body);
    //console.log("received login request for username:", username);
    try {
        const result = await pool.query(queries.getUserByUsername, [username]);
        if (result.rows.length === 0) {
            return res.status(400).send("Error finding username");
        }
        const user = result.rows[0];
        //console.log("password:", user_password);
        //console.log("password hased:", user.password);
        if (await bcrypt.compare(user_password, user.password)) {
            //res.send("Success");
            const token = createToken(username);
            res.json({ username, token });
        } else {
            res.status(401).send("Invalid credentials");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

const changeUser = async (req, res) => {
    try {
        const { id } = req.params; 
        const { username, user_password } = req.body;

        // Ensure the authenticated user is the same as the user ID being updated
        if (req.user.id !== parseInt(id)) {
            return res.status(403).json({ error: 'Access forbidden: You can only change your own data' });
        }

        // Check if the new username already exists for another user
        const userExists = await pool.query(queries.getUserByUsername, [username]);
        if (userExists.rows.length > 0 && userExists.rows[0].id !== parseInt(id)) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user_password, salt);

        // Update the user's username and password in the database
        await pool.query(queries.changeUser, [username, hashedPassword, id]);
        res.status(200).json({ message: "Username and password changed" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteAccount = async (req, res) => {
    try {
      const { id } = req.params; // Assumes this has been validated by middleware
  
      // Ensure the authenticated user is the same as the user ID being deleted
      if (req.user.id !== parseInt(id)) {
        return res.status(403).json({ error: 'Access forbidden: You can only delete your own account' });
      }
  
      // First, delete all bookmarks associated with this user
      await pool.query("DELETE FROM bookmarks WHERE user_id = $1", [id]);
  
      // Delete the profile associated with this user
      await pool.query("DELETE FROM profiles WHERE user_id = $1", [id]);
  
      // Then, delete the user
      await pool.query(queries.deleteAccount, [id]);
  
      res.status(200).send("User and related data deleted");
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
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
