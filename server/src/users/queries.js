const createUser =
  "INSERT INTO users (first_name, last_name, email, username, password) VALUES ($1, $2, $3, $4, $5)";
const changeUser =
  "UPDATE users SET username = $1, password = $2 WHERE id = $3";
const changeUserPassword =
  "UPDATE users SET password = $1 WHERE id = $2 RETURNING *;";
const changeBookmarks = "UPDATE users SET bookmarks = $1 WHERE username = $2";
const deleteAccount = "DELETE FROM users WHERE id = $1";
const getUsers = "SELECT * FROM users";
const getUsersById = "SELECT * FROM users WHERE id = $1";
const getUserByUsername = "SELECT * FROM users WHERE username = $1";
const getUserAvatarByUsername =
  "SELECT * FROM images INNER JOIN users ON images.id = users.avatar_id WHERE users.username = $1";
const deleteUserAvatarByAvatarId = "DELETE FROM images WHERE images.id = $1";
const createUserAvatar =
  "INSERT INTO images (public_id, url) VALUES ($1, $2) RETURNING *";
const updateUserAvatarId = "UPDATE users SET avatar_id = $2 WHERE id = $1";
const updateUserProfile =
  "UPDATE users SET first_name= $1, last_name = $2, email = $3, username = $4 WHERE id =$5 RETURNING *";
const getAvatarURLByAvatarId = "SELECT * FROM images WHERE images.id = $1";
const getAvatarURLByUserId =
  "SELECT * FROM images JOIN users ON images.id = users.avatar_id WHERE users.id = $1 ";
module.exports = {
  createUser,
  changeUser,
  deleteAccount,
  getUsers,
  getUsersById,
  getUserByUsername,
  changeBookmarks,
  getUserAvatarByUsername,
  deleteUserAvatarByAvatarId,
  createUserAvatar,
  updateUserAvatarId,
  updateUserProfile,
  getAvatarURLByAvatarId,
  getAvatarURLByUserId,
  changeUserPassword,
};
