import { Image } from "react-bootstrap";
import "./ArticleResult.scss";
import { Bookmark, BookmarkFill } from "react-bootstrap-icons";
export default function ArticleResult({ article }) {
  return (
    <div className="article-result">
        <div className="article-result-image-container">
          <Image src={article.image} className="article-result-image" />
          {article.isBookmarked ? (
            <Bookmark className="article-result-bookmark" />
          ) : (
            <BookmarkFill className="article-result-bookmark" />
          )}
      </div>

      <div className="article-result-text">
        <h3 className="article-result-title">{article.title}</h3>
        <span className="article-result-author">By {article.author}</span>
        <span className="article-result-date">Published {article.date}</span>
      </div>
    </div>
  );
}
