import { Stack } from "react-bootstrap";

import { Bookmark, BookmarkFill } from "react-bootstrap-icons";
import BlocksParser from "../../BlocksParser/BlocksParser";

//component for article title
export default function ArticleHeaderTitle({
  titleBlocks,
  isBookmarked,
  bookmarkToggler,
  disableBookmark,
}) {
  return (
    <Stack direction="horizontal" gap={2}>
      {!disableBookmark &&
        (isBookmarked ? (
          <BookmarkFill
            className="article-bookmark"
            onClick={bookmarkToggler}
          />
        ) : (
          <Bookmark className="article-bookmark" onClick={bookmarkToggler} />
        ))}

      <h1 className="text-uppercase fw-bold article-title">
        <BlocksParser blocks={titleBlocks} />
      </h1>
    </Stack>
  );
}
