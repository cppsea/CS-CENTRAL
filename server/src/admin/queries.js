const getUserByUsername = "SELECT * FROM users WHERE username = $1";
const getAvatarURLByAvatarId = "SELECT * FROM images WHERE images.id = $1";
const getUsersById = "SELECT * FROM users WHERE id = $1";
const deleteUserById = "DELETE FROM users WHERE id = $1";
const getUserByAuthorID = "SELECT * FROM users WHERE users.id = $1";

const searchUsers = `
  SELECT * FROM users
  WHERE
    ($1 IS NULL OR username ILIKE '%' || $1 || '%')
    AND ($2 IS NULL OR first_name ILIKE '%' || $2 || '%')
    AND ($3 IS NULL OR last_name ILIKE '%' || $3 || '%')
    AND ($4 IS NULL OR id = $4)
    AND ($5 IS NULL OR email ILIKE '%' || $5 || '%')
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
const deleteArticleByID = "DELETE * FROM articles WHERE id = $1 RETURNING *";

const searchArticles = `
  SELECT * FROM articles
  WHERE
    ($1 IS NULL OR id = $1)
    AND ($2 IS NULL OR author_id = $2)
    AND ($3 IS NULL OR title ILIKE '%' || $3 || '%')
    AND ($4 IS NULL OR is_published = $4);
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
};
