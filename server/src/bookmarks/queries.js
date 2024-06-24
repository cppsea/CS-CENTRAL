const addBookmark = "INSERT INTO bookmarks (article_id, user_id) VALUES ($1, $2)";
const getBookmarks = "SELECT articles.*, CASE WHEN bookmarks.article_id IS NOT NULL THEN TRUE ELSE FALSE END AS \"isBookmarked\" FROM articles INNER JOIN bookmarks ON articles.id  = bookmarks.article_id AND bookmarks.user_id = ($1)";
const deleteBookmark = "DELETE FROM bookmarks WHERE article_id = $1 AND user_id = $2"
const deleteMultipleBookmarks = `DELETE FROM bookmarks WHERE user_id = $2 AND article_id = ANY( ARRAY[$1] )`

module.exports = {
    addBookmark,
    getBookmarks,
    deleteBookmark,
    deleteMultipleBookmarks,
}