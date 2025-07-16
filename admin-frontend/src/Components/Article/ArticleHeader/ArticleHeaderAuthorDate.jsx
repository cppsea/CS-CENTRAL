//component for article author and date
export default function ArticleHeaderAuthorDate({ author, date }) {
  return (
    <div className="d-inline-flex flex-column fst-italic article-header-author-date">
      <span>By {author}</span>
      <div className="d-flex">
        <span>{date ? `Published ${date}` : `Unpublished`}</span>
      </div>{" "}
    </div>
  );
}
