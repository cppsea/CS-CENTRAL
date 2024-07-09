import { Image } from "react-bootstrap";
import "./ArticleResult.scss";
import { Bookmark, BookmarkFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
export default function ArticleResult({ article, isPending, bookmarkToggler }) {
  const navigate = useNavigate();

  const articleNavigate = () => {
    navigate(`/article_view/${article.id}`);
  };
  return (
    <div className="article-result">
      <div className="article-result-image-container" onClick={articleNavigate}>
        <Image src={article.image} className="article-result-image" />
      </div>
      <div>
        {isPending ? (
          <AiOutlineLoading3Quarters className="loading" />
        ) : article.isBookmarked ? (
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
          {article.title}
        </h3>
        <div className="article-result-info">
          <span className="article-result-author">By {article.author}</span>
          <span className="article-result-date">Published {article.date}</span>
        </div>
      </div>
    </div>
  );
}
