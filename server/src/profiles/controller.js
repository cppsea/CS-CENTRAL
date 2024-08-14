const pool = require("../../db.js");
const queries = require("./queries");
const { validate, validateParams } = require("../middleware/validate");
const { profileSchema, profileIdSchema } = require("./validation");

const createProfile = async (req, res) => {
  try {
    const { first_name, last_name, email, profile_pic } = req.body;
    const user_id = req.user.id;

    // Check if email already exists
    if (email) {
      const emailExists = await pool.query("SELECT * FROM profiles WHERE email = $1", [email]);
      if (emailExists.rows.length > 0) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    await pool.query(queries.createProfile, [user_id, first_name, last_name, email, profile_pic]);
    res.status(201).json({ message: 'Profile created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProfile = async (req, res) => {
  try {
    const user_id = req.user.id;
    const profile = await pool.query(queries.getProfileByUserId, [user_id]);

    if (profile.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(profile.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { first_name, last_name, email, profile_pic } = req.body;
    const user_id = req.user.id;

    // Check if email already exists
    if (email) {
      const emailExists = await pool.query("SELECT * FROM profiles WHERE email = $1 AND user_id != $2", [email, user_id]);
      if (emailExists.rows.length > 0) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    await pool.query(queries.updateProfile, [first_name, last_name, email, profile_pic, user_id]);
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
};