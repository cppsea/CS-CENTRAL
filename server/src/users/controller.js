require("dotenv").config();
const { json } = require("body-parser");
const pool = require("../../db.js");
const queries = require("./queries");
const bcrypt = require("bcrypt");
const { cloudinary1 } = require("../images/config");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");

const createToken = (id) => {
  return jwt.sign({ id: id }, process.env.SECRET, { expiresIn: "3d" });
};

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
};

const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, username, password } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    pool.query(
      queries.createUser,
      [first_name, last_name, email, username, hashedPassword],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            error: err,
          });
        }
      }
    );
    const token = createToken(username);

    res.status(200).json({ first_name, last_name, email, username, token });
  } catch (err) {
    console.error(err.message);
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("received login request for username:", username);
  try {
    const result = await pool.query(queries.getUserByUsername, [username]);
    if (result.rows.length === 0) {
      return res.status(400).send("Error finding username");
    }
    const user = result.rows[0];

    //get avatar url
    let avatarUrlResult = null;
    if (user.avatar_id != null) {
      try {
        avatarUrlResult = await pool.query(queries.getAvatarURLByAvatarId, [
          user.avatar_id,
        ]);
        avatarUrlResult = avatarUrlResult.rows[0].url;
      } catch (error) {
        console.log(error);
        res.status(500).send();
      }
    }

    console.log("password:", password);
    console.log("password hashed:", user.password);
    if (await bcrypt.compare(password, user.password)) {
      const token = createToken(username);
      res.json({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        avatar: avatarUrlResult,
        token,
      });
    } else {
      res.send("Not allowed");
    }
  } catch (error) {
    res.status(500).send();
  }
};

//uses formdata object instead of json since we need to support image files being sent
//assumes file is being sent under the field "avatar"
const editUser = async (req, res) => {
  //extract unique username from jwt to make sure we are changing the user that the jwt is associated with
  const token = req.headers.authorization.split(" ")[1];
  const jwtUsername = jwt.verify(token, process.env.SECRET).id;
  let user = null;
  try {
    user = await pool.query(queries.getUserByUsername, [jwtUsername]);
    user = user.rows[0];
  } catch (err) {
    return res.status(401).json({ error: "User not found" });
  }

  const { username, first_name, last_name, email } = req.body;

  //handle image first separately, since formdata is being used it is stored in req.file
  //check if it exists
  //if it does, we delete the previous avatar, and then move on to upload

  try {
    if (req.file) {
      if (user.avatar_id !== null) {
        let pastAvatar = await pool.query(queries.getUserAvatarByUsername, [
          jwtUsername,
        ]);
        pastAvatar = pastAvatar.rows[0];

        await cloudinary1.uploader.destroy(pastAvatar.public_id);
        await pool.query(queries.deleteUserAvatarByAvatarId, [user.avatar_id]);
      }
      let uploadResult = null;

      try {
        uploadResult = await cloudinary1.uploader.upload(req.file.path);
      } catch (uploadError) {
        console.error(uploadError);
        return res.status(500).json({
          error: "Error uploading image to Cloudinary",
        });
      } finally {
        fs.unlink(req.file.path);
      }

      //add references in database
      try {
        let newImageRef = await pool.query(queries.createUserAvatar, [
          uploadResult.public_id,
          uploadResult.secure_url,
        ]);
        newImageRef = newImageRef.rows[0];
        await pool.query(queries.updateUserAvatarId, [user.id, newImageRef.id]);
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          error: "Error updating images",
        });
      }
    }

    //otherwise update the rest of profile information (passwords should be handled separately)
    try {
      let result = await pool.query(queries.updateUserProfile, [
        first_name,
        last_name,
        email,
        username,
        user.id,
      ]);

      //get avatar url
      let avatarUrlResult = null;

      try {
        avatarUrlResult = await pool.query(queries.getAvatarURLByUserId, [
          user.id,
        ]);
        avatarUrlResult = avatarUrlResult.rows[0].url;
      } catch (error) {
        console.log(error);
        return res.status(500).send();
      }

      if (result.rowCount > 0) {
        return res.status(200).json({
          message: "Profile update successful",
          user: {
            first_name,
            last_name,
            email,
            username,
            avatar: avatarUrlResult,
          },
        });
      } else {
        return res.status(500).json({ error: "Profile update failed" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Profile update failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
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
  deleteAccount,
  loginUser,
  editUser,
};
