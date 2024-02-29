import { Image } from "react-bootstrap";
import { Bookmark, BookmarkFill } from "react-bootstrap-icons";
import "./SavedArticleItem.scss";
export default function SavedArticleItem({
  articleImg,
  articleTitle,
  toBeDeleted,
  deleteToggler,
}) {
  return (
    <div className="saved-article">
      <div className="saved-article-top">
        <div className="saved-article-image-container">
          <Image src={articleImg} className="saved-article-image" />
          {toBeDeleted ? (
            <Bookmark
              className="saved-article-bookmark"
              onClick={deleteToggler}
            />
          ) : (
            <BookmarkFill
              className="saved-article-bookmark"
              onClick={deleteToggler}
            />
          )}
        </div>
      </div>
      <div className="saved-article-bottom">
        <span className="saved-article-title">{articleTitle}</span>
      </div>
    </div>
  );
}
