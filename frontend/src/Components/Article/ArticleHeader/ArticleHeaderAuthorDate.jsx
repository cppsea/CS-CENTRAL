import { Bookmark, BookmarkFill } from "react-bootstrap-icons";

//component for article author and date, also contains bookmark
export default function ArticleHeaderAuthorDate({
  author,
  date,
  isBookmarked,
  bookmarkToggler,
}) {
  return (
    <div className="d-flex flex-column fst-italic article-header-author-date">
      <span>By {author}</span>
      <div className="d-flex">
        <span>Published {date}</span>
        {isBookmarked ? (
          <Bookmark className="article-bookmark" onClick={bookmarkToggler} />
        ) : (
          <BookmarkFill
            className="article-bookmark"
            onClick={bookmarkToggler}
          />
        )}
      </div>
    </div>
  );
}
