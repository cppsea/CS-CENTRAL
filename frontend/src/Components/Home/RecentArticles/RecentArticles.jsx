import SavedArticleItem from "../../Settings/SavedArticles/SaveArticleItem/SavedArticleItem";
import "./RecentArticles.scss";

import { useEffect, useState } from "react";
import RecentArticleItem from "./RecentArticleItem/RecentArticleItem";
import useBookmark from "../../../hooks/useBookmark";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function RecentArticles({ recent_articles }) {
  const { isLoading, error, updateBookmark } = useBookmark();

  //array all the articles currently not deleted
  const [articles, setArticles] = useState([]);

  //the state of the articles of whether they are being bookmarked or not, is object, key = article id, value = whether it is selected or not
  const [isBookmarkedArticles, setIsBookmarkedArticles] = useState({});

  //toggler of selected state for a specific article
  //this returns a FUNCTION that toggles an article's state with the provided id
  const articleToggleHandler = (id) => () =>
    setIsBookmarkedArticles((prevArticles) => {
      return { ...prevArticles, [id]: !prevArticles[id] };
    });

  const handleToggleBookmark = async (article_id) => {
    const toggleBookmark = () => articleToggleHandler(article_id);
    await updateBookmark(
      article_id,
      isBookmarkedArticles[article_id],
      toggleBookmark
    );
  };

  //use effect to get articles upon page load once, also init selected state of every article as false
  //just simulating retrieving articles
  useEffect(() => {
    const initArticles = async () => {
      try {
        const retrieved_articles = await recent_articles;
        setArticles(retrieved_articles);

        const initIsBookmarkedArticles = {};
        retrieved_articles.forEach(({ id }) => {
          initIsBookmarkedArticles[id] = false;
        });
        setIsBookmarkedArticles(initIsBookmarkedArticles);
      } catch (error) {
        toast.error(error.message);
      }
    };

    initArticles();
  }, [recent_articles]);

  // Handle errors from the bookmark hook
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <div className="my-3">
        <div className="articles-divider mt-4 mb-3"></div>
        <h3 className="fw-medium">Recent Articles</h3>
        <div className="d-flex flex-column gap-5 my-3">
          {isLoading ? (
            <div className="flex flex-grow-1 text-center align-content-center">
              <AiOutlineLoading3Quarters className="loading" />
            </div>
          ) : (
            articles.map((article) => (
              <RecentArticleItem
                key={article.id}
                articleTitle={article.title}
                articleAuthor={article.author}
                articleImg={article.article_img}
                articleDesc={article.article_desc}
                articleDatePublished={article.article_date}
                // articleReadTime={article.article_read_time}
                toBeBookmarked={isBookmarkedArticles[article.id]}
                bookmarkToggler={() => handleToggleBookmark(article.id)}
              />
            ))
          )}
          {/** May add onClick function to fetch more articles */}
        </div>
        <a className="see-more-link" href="/">
          Older posts
        </a>
      </div>
    </>
  );
}
