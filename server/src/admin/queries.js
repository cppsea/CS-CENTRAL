const getUserByUsername = `
SELECT 
    users.*, 
    roles.name AS role
  FROM users
  LEFT JOIN user_roles ON users.id = user_roles.user_id
  LEFT JOIN roles ON user_roles.role_id = roles.id WHERE username = $1`;

const getAvatarURLByAvatarId = "SELECT * FROM images WHERE images.id = $1";
const getUsersById = "SELECT * FROM users WHERE id = $1";
const deleteUserById = "DELETE FROM users WHERE id = $1";
const getUserByAuthorID = `
SELECT 
    users.*, 
    roles.name AS role
  FROM users
  LEFT JOIN user_roles ON users.id = user_roles.user_id
  LEFT JOIN roles ON user_roles.role_id = roles.id WHERE users.id = $1`;


const getAllAdmins = `
SELECT
    users.*,
    roles.name AS role
  FROM users
  INNER JOIN user_roles ON users.id = user_roles.user_id
  INNER JOIN roles ON user_roles.role_id = roles.id WHERE roles.name = 'admin';`
const searchUsers = `
  SELECT 
    users.*, 
    roles.name AS role
  FROM users
  LEFT JOIN user_roles ON users.id = user_roles.user_id
  LEFT JOIN roles ON user_roles.role_id = roles.id
  WHERE
    ($1::text IS NULL OR users.username ILIKE '%' || $1::text || '%')
    AND ($2::text IS NULL OR users.first_name ILIKE '%' || $2::text || '%')
    AND ($3::text IS NULL OR users.last_name ILIKE '%' || $3::text || '%')
    AND ($4::int IS NULL OR users.id = $4::int)
    AND ($5::text IS NULL OR users.email ILIKE '%' || $5::text || '%')
`;

const giveAdminByUserID =
  "INSERT INTO user_roles (user_id, role_id) VALUES ($1, (SELECT id FROM roles WHERE name = 'admin')) ON CONFLICT DO NOTHING RETURNING *;";
const removeAdminByUserID =
  "DELETE FROM user_roles WHERE user_id = $1 AND role_id IN (SELECT id FROM roles WHERE name = 'admin') RETURNING *;";
const getAdminByUserID = `SELECT * FROM user_roles WHERE user_id = $1 AND role_id IN (SELECT id FROM roles WHERE name = 'admin');`;

const publishArticle =
  "UPDATE articles set is_published = TRUE, published_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *";
const unpublishArticle =
  "UPDATE articles set is_published = FALSE, published_at = NULL WHERE id = $1 RETURNING *";
const getArticleByID = "SELECT * FROM articles WHERE id = $1";
const deleteArticleByID = "DELETE FROM articles WHERE id = $1 RETURNING *";

const searchArticles = `
  SELECT * FROM articles
  WHERE
    ($1::int IS NULL OR id = $1::int)
    AND ($2::int IS NULL OR author_id = $2::int)
    AND ($3::text IS NULL OR title ILIKE '%' || $3::text || '%')
    AND ($4::boolean IS NULL OR is_published = $4::boolean);
`;
const getImageByImageId = "SELECT * FROM images WHERE images.id = $1";



module.exports = {
  getUserByUsername,
  getAvatarURLByAvatarId,
  getUsersById,
  deleteUserById,
  giveAdminByUserID,
  removeAdminByUserID,
  searchUsers,
  getArticleByID,
  publishArticle,
  unpublishArticle,
  deleteArticleByID,
  getAdminByUserID,
  getImageByImageId,
  getUserByAuthorID,
  searchArticles,
  getAllAdmins
};
