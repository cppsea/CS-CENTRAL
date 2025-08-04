const getMyArticles = "SELECT * FROM articles WHERE author_id = $1";

const getArticles = "SELECT * FROM articles";
const getArticlesById = "SELECT * FROM articles WHERE id = $1";
const addArticles =
  "INSERT INTO articles (title, author_id, article_body, is_published) VALUES ($1, $2, $3, FALSE) RETURNING *";
const editArticle =
  "UPDATE articles SET title = $1, article_body = $2 WHERE id = $3 AND author_id = $4 RETURNING *";
const getArticlesByTitle =
  "SELECT * FROM articles WHERE LOWER(title) LIKE '%$1%'"; //https://www.w3schools.com/sql/sql_like.asp
const deleteArticle = "DELETE FROM articles WHERE id = $1";
const publishArticle =
  "UPDATE articles set is_published = TRUE, published_at = CURRENT_TIMESTAMP WHERE id = $1 AND author_id = $2 RETURNING *";
const unpublishArticle =
  "UPDATE articles set is_published = FALSE, published_at = NULL WHERE id = $1 AND author_id = $2 RETURNING *";

const insertImage =
  "INSERT INTO images (public_id, url) VALUES ($1, $2) RETURNING *";
const getImageByImageId = "SELECT * FROM images WHERE images.id = $1";
const getImageByUrl = "SELECT * FROM images WHERE images.url = $1";
const insertArticleImage =
  "INSERT INTO article_images (image_id, article_id) VALUES ($1, $2) RETURNING *";
const deleteImageByID = "DELETE FROM images WHERE id = $1 RETURNING *";
const getAllImagesByArticleID =
  "SELECT i.* FROM article_images ai JOIN images i ON i.id = ai.image_id WHERE ai.article_id = $1";
const deleteImages = "DELETE FROM images WHERE id = ANY ($1::int[])";

const likeArticle =
  "INSERT INTO article_likes (user_id, article_id) VALUES ($1, $2) RETURNING *;";
const unlikeArticle =
  "DELETE FROM article_likes WHERE user_id = $1 and article_id = $2 RETURNING *;";

const getUpdatedLikeCount = `
  SELECT articles.id, articles.like_count
  FROM articles
  WHERE articles.id = $1;`;

const createComment = `INSERT INTO article_comments (article_id, user_id, content) VALUES ($1, $2, $3) RETURNING *;`;
const deleteComment = `DELETE FROM article_comments WHERE id = $1 RETURNING *;`;
const getCommentsByArticleID = `
SELECT 
    article_comments.id,
    article_comments.content, 
    article_comments.created_at, 
    article_comments.updated_at,
    users.username,
    users.first_name || ' ' || users.last_name AS name,
    images.url AS avatar
FROM article_comments 
LEFT JOIN users ON article_comments.user_id = users.id 
LEFT JOIN images ON users.avatar_id = images.id
WHERE article_comments.article_id = $1;
`;
const getCommentByCommentID = `SELECT * FROM article_comments WHERE id = $1`;

const auth_getArticlesById = `
      SELECT articles.*, 
        CASE WHEN bookmarks.article_id IS NOT NULL THEN TRUE ELSE FALSE END AS "isBookmarked", 
        CASE WHEN article_likes.article_id IS NOT NULL THEN TRUE ELSE FALSE END AS "isLiked" 
        FROM articles 
        LEFT JOIN bookmarks ON bookmarks.article_id  = articles.id AND bookmarks.user_id = ($1) 
        LEFT JOIN article_likes ON article_likes.article_id = articles.id AND article_likes.user_id = ($1)
          WHERE articles.id = ($2)`;
const auth_getArticles = `
      SELECT articles.*, 
        CASE WHEN bookmarks.article_id IS NOT NULL THEN TRUE ELSE FALSE END AS "isBookmarked",
        CASE WHEN article_likes.article_id IS NOT NULL THEN TRUE ELSE FALSE END AS "isLiked" 
        FROM articles 
          LEFT JOIN bookmarks ON bookmarks.article_id  = articles.id AND bookmarks.user_id = ($1)
          LEFT JOIN article_likes ON article_likes.article_id = articles.id AND article_likes.user_id = ($1)`;
const auth_getArticlesByTitle = `
      SELECT articles.*, 
          CASE WHEN bookmarks.article_id IS NOT NULL THEN TRUE ELSE FALSE END AS "isBookmarked",
          CASE WHEN article_likes.article_id IS NOT NULL THEN TRUE ELSE FALSE END AS "isLiked" 
          FROM articles 
          LEFT JOIN bookmarks ON bookmarks.article_id  = articles.id AND bookmarks.user_id = ($2) 
          LEFT JOIN article_likes ON article_likes.article_id = articles.id AND article_likes.user_id = $2
          WHERE LOWER(title) LIKE '%' || $1 || '%'`;

const getUserByAuthorID = "SELECT * FROM users WHERE users.id = $1";
module.exports = {
  getMyArticles,
  getArticles,
  getArticlesById,
  addArticles,
  getArticlesByTitle,
  deleteArticle,
  editArticle,
  publishArticle,
  unpublishArticle,
  auth_getArticles,
  auth_getArticlesById,
  auth_getArticlesByTitle,
  insertImage,
  getImageByImageId,
  insertArticleImage,
  deleteImageByID,
  deleteImages,
  getAllImagesByArticleID,
  getImageByUrl,
  getUserByAuthorID,
  likeArticle,
  unlikeArticle,
  createComment,
  deleteComment,
  getCommentsByArticleID,
  getCommentByCommentID,
  getUpdatedLikeCount,
};
