import { Stack } from "react-bootstrap";
import ArticleHeaderDesc from "./ArticleHeaderDesc";
import ArticleHeaderTitle from "./ArticleHeaderTitle";
import ArticleHeaderAuthorDate from "./ArticleHeaderAuthorDate";
import { Bookmark, BookmarkFill } from "react-bootstrap-icons";

//Component for the article header
/*
takes in:


json block containing article title,
json block containing article description,
string of author's name,
string containing date of creation 
(for now this is simply normal data like "Oct 9, 2023",
 but if we use a postgres time date it will need to be converted)

 //and state for whether article is bookmarked and toggler for that bookmark
*/

export default function ArticleHeader({
  titleBlocks,
  descriptionBlocks,
  author,
  date,
  isBookmarked,
  bookmarkToggler,
  disableBookmark,
}) {
  return (
    <Stack gap={2}>
      <ArticleHeaderTitle
        titleBlocks={titleBlocks}
        isBookmarked={isBookmarked}
        disableBookmark
      />
      <ArticleHeaderDesc descriptionBlocks={descriptionBlocks} />
      <div className="d-inline-flex align-items-center">
        <ArticleHeaderAuthorDate author={author} date={date} />

        <div className="mx-3">
          {!disableBookmark &&
            (isBookmarked ? (
              <BookmarkFill
                className="article-bookmark"
                onClick={bookmarkToggler}
              />
            ) : (
              <Bookmark
                className="article-bookmark"
                onClick={bookmarkToggler}
              />
            ))}
        </div>
      </div>
    </Stack>
  );
}
