import { useEffect, useState } from "react";

import { Image } from "react-bootstrap";
import { Bookmark, BookmarkFill } from "react-bootstrap-icons";

import "./RecentArticleItem.scss";
import { useTheme } from "../../../../hooks/useTheme";
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
  const { isDarkMode } = useTheme();

  return (
    <>
      <div className="recent-article-container">
        <div className="d-flex w-100">
          <div className="recent-article-image-container">
            <Image src={articleImg} className="recent-article-img" />
          </div>
        </div>
        <div className="d-flex gap-3 justify-content-between w-100">
          <div>
            {toBeBookmarked ? (
              <BookmarkFill
                className="recent-article-bookmark"
                onClick={bookmarkToggler}
              />
            ) : (
              <Bookmark
                className="recent-article-bookmark"
                onClick={bookmarkToggler}
              />
            )}
          </div>
          <div className="article-data-container">
            <a
              href="/"
              className={`recent-article-title ${
                isDarkMode ? "text-white" : ""
              }`}
            >
              {articleTitle.toUpperCase()}
            </a>
            {/* <p className="recent-article-desc my-2 fst-italic">{articleDesc}</p> */}
            <div className="recent-article-date-time-author-container">
              <p className="recent-article-author">By {articleAuthor}</p>
              <p className="recent-article-date-time">
                Published {articleDatePublished}
              </p>
            </div>
          </div>

          {/* Related tags component here */}
        </div>
      </div>
    </>
  );
}
