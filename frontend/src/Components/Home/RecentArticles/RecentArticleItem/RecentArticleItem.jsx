import { useEffect, useState } from "react";

import { Image } from "react-bootstrap";
import { Bookmark, BookmarkFill } from "react-bootstrap-icons";

import "./RecentArticleItem.scss";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <>
      <div className="recent-article-container">
        <div
          className="recent-article-image-container"
          onClick={() => navigate("/")}
        >
          <Image src={articleImg} className="recent-article-img" />
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
            <Link to="/" className="recent-article-title">
              {articleTitle.toUpperCase()}
            </Link>
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
