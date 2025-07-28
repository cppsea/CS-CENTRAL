import { Stack } from "react-bootstrap";
import ArticleHeaderDesc from "./ArticleHeaderDesc";
import ArticleHeaderTitle from "./ArticleHeaderTitle";
import ArticleHeaderAuthorDate from "./ArticleHeaderAuthorDate";
import {
  Bookmark,
  BookmarkFill,
  Heart,
  HeartFill,
  ChatSquareText,
} from "react-bootstrap-icons";

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
  disableBookmark: disableArticleActions,
  isLiked,
  likeToggler,
  likeCount,
  onCommentIconClick,
  commentCount,
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

        {!disableArticleActions && (
          <div className="mx-3 d-flex gap-2">
            {isBookmarked ? (
              <BookmarkFill
                className="article-bookmark"
                onClick={bookmarkToggler}
              />
            ) : (
              <Bookmark
                className="article-bookmark"
                onClick={bookmarkToggler}
              />
            )}
            {isLiked ? (
              <HeartFill className="article-likes-icon" onClick={likeToggler} />
            ) : (
              <Heart className="article-likes-icon" onClick={likeToggler} />
            )}
            <span className="text-muted">{likeCount}</span>
            <ChatSquareText
              onClick={onCommentIconClick}
              className="article-comment-icon"
            />
            <span className="text-muted">{commentCount}</span>
          </div>
        )}
      </div>
    </Stack>
  );
}
