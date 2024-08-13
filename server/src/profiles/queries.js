const createProfile = "INSERT INTO profiles (user_id, first_name, last_name, email, profile_pic) VALUES ($1, $2, $3, $4, $5)";
const getProfileByUserId = "SELECT * FROM profiles WHERE user_id = $1";
const updateProfile = "UPDATE profiles SET first_name = $1, last_name = $2, email = $3, profile_pic = $4 WHERE user_id = $5";

module.exports = {
  createProfile,
  getProfileByUserId,
  updateProfile
};
