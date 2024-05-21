import { Stack } from "react-bootstrap";

import { Bookmark, BookmarkFill } from "react-bootstrap-icons";

//component for article title
export default function ArticleHeaderTitle({
  title,
  isBookmarked,
  bookmarkToggler,
}) {
  return (
    <Stack direction="horizontal" gap={2}>
      {isBookmarked ? (
        <BookmarkFill className="article-bookmark" onClick={bookmarkToggler} />
      ) : (
        <Bookmark className="article-bookmark" onClick={bookmarkToggler} />
      )}
      <h1 className="text-uppercase fw-bold article-title">{title}</h1>
    </Stack>
  );
}
