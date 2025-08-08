import { Image } from "react-bootstrap";
import "./ArticleResult.scss";
import {
  Bookmark,
  BookmarkFill,
  HeartFill,
  ChatSquareTextFill,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import BlocksParser from "../../BlocksParser/BlocksParser";
export default function ArticleResult({ article, bookmarkToggler }) {
  const navigate = useNavigate();

  const articleNavigate = () => {
    navigate(`/article_view/${article.id}`);
  };
  return (
    <div className="article-result">
      <div className="article-result-image-container">
        <Image src={article.image} className="article-result-image" />
      </div>
      <div>
        {article.isBookmarked ? (
          <BookmarkFill
            className="article-result-bookmark"
            onClick={bookmarkToggler}
          />
        ) : (
          <Bookmark
            className="article-result-bookmark"
            onClick={bookmarkToggler}
          />
        )}
      </div>
      <div className="article-result-text">
        <h3 className="article-result-title" onClick={articleNavigate}>
          <BlocksParser blocks={article.header.blocks} />
        </h3>
        <div className="article-result-info">
          <span className="article-result-author">By {article.author}</span>
          <span className="article-result-date">
            Published {article.published_at}
          </span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-1">
            <HeartFill className="article-result-likes" />
            <span className="text-muted">{article.like_count}</span>
          </div>
          <div className="d-flex align-items-center gap-1">
            <ChatSquareTextFill className="article-result-comment" />
            <span className="text-muted">{article.comment_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
