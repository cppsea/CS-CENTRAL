const createUser = "INSERT INTO users (username, password) VALUES ($1, $2)";
const changeUser = "UPDATE users SET username = $1, password = $2 WHERE id = $3";
const changeBookmarks = "UPDATE users SET bookmarks = $1 WHERE username = $2"
const deleteAccount = "DELETE FROM users WHERE id = $1";
const getUsers = "SELECT * FROM users";
const getUsersById = "SELECT * FROM users WHERE id = $1";
const getUserByUsername = "SELECT * FROM users WHERE username = $1";


module.exports = {
    createUser,
    changeUser,
    deleteAccount,
    getUsers,
    getUsersById,
    getUserByUsername,
    changeBookmarks,
}