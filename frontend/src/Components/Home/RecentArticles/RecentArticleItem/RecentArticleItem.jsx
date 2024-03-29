import { useEffect, useState } from "react";

import { Image } from "react-bootstrap";
import { Bookmark, BookmarkFill } from "react-bootstrap-icons";

import "./RecentArticleItem.scss";

export default function RecentArticleItem({
  articleTitle,
  articleAuthor,
  articleImg,
  articleDesc,
  articleDatePublished,
  articleReadTime,
  toBeBookmarked,
  bookmarkToggler,
}) {
  return (
    <>
      <div className="recent-article-container">
        <div className="d-flex w-100">
          <div className="recent-article-image-container">
            <Image src={articleImg} className="recent-article-img" />
            {toBeBookmarked ? (
              <Bookmark
                className="recent-article-bookmark"
                onClick={bookmarkToggler}
              />
            ) : (
              <BookmarkFill
                className="recent-article-bookmark"
                onClick={bookmarkToggler}
              />
            )}
          </div>
        </div>
        <div className="d-flex flex-column gap-2 w-100">
          <a href="/" className="recent-article-title">
            {articleTitle.toUpperCase()}
          </a>
          <p className="recent-article-desc my-2 fst-italic">{articleDesc}</p>
          <p className="recent-article-date-time">
            by {articleAuthor} | {articleDatePublished} | {articleReadTime}
          </p>
          {/* Related tags component here */}
        </div>
      </div>
    </>
  );
}
