import { Stack } from "react-bootstrap";

//component for article author and date
export default function ArticleHeaderAuthorDate({ author, date }) {
  return (
    <Stack className="fst-italic article-header-author-date">
      <span>By {author}</span>
      <span>Published {date}</span>
    </Stack>
  );
}
