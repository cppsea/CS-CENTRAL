import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import ArticleResult from "../../Components/ArticleResults/ArticleResult/ArticleResult.jsx";
import RelatedTags from "../../Components/ArticleResults/SideSections/RelatedTopicTags/RelatedTopicTags.jsx";
import useBookmark from "../../hooks/useBookmark.jsx";
import "./ArticleResultsPage.scss";

const dummy_topic_tags = [
  { label: "Deep Learning" },
  { label: "Artifical Intelligence" },
  { label: "Computer Vision" },
  { label: "Data Science" },
];
const dummmy_articles = [
  {
    id: 1,
    image:
      "https://emeritus.org/in/wp-content/uploads/sites/3/2023/03/types-of-machine-learning.jpg.optimal.jpg",
    title: "Machine Learning in Business and Marketing",
    author: "Jeff",
    date: "October 24, 2023",
    isBookmarked: true,
  },
];

export default function ArticleResultsPage({}) {
  const { error, updateBookmark } = useBookmark();

  // keep track of a specific article's bookmark toggling process
  const [pendingArticles, setPendingArticles] = useState({});

  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  // const [specificArticle, setSpecificArticle] = useState();
  const titleQuery = searchParams.get("title");

  //bookmark toggler creator function, returns function that toggles bookmark for certain id
  const bookmarkTogglerCreator = (id) => () => {
    let articleIndex = articles.findIndex((article) => article.id === id);
    if (articleIndex !== -1) {
      const newArticles = [...articles];
      newArticles[articleIndex].isBookmarked =
        !newArticles[articleIndex].isBookmarked;
      setArticles(newArticles);
    }

    // set pending state of an article being bookmarked to true
    setPendingArticles((prev) => ({ ...prev, [id]: true }));

    // reset pending state to false
    setTimeout(() => {
      setPendingArticles((prev) => ({ ...prev, [id]: false }));
    }, 500);
  };

  useEffect(() => {
    const authUser = localStorage.getItem("user");
    const user = authUser ? JSON.parse(authUser) : undefined;
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/api/articles/?title=${titleQuery}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: user ? `Bearer ${user.token}` : undefined,
            },
          }
        );
        const data = await response.json();

        const enrichedData = data.map((articleObject) => ({
          ...articleObject,
          image:
            "https://emeritus.org/in/wp-content/uploads/sites/3/2023/03/types-of-machine-learning.jpg.optimal.jpg",
          author: "jeff",
          date: "October 24, 2023",
          isBookmarked: articleObject.isBookmarked
            ? articleObject.isBookmarked
            : false,
        }));
        setArticles(enrichedData);

        // initialize pending state of all article results to false
        let initPendingArticles = {};
        enrichedData.forEach(({ id }) => {
          initPendingArticles[id] = false;
        });
        setPendingArticles(initPendingArticles);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchArticles();
  }, [titleQuery, setSearchParams]);

  // handle bookmark toggling with an article with its specified ID
  const handleToggleBookmark = async (article_id) => {
    const article = articles.find((a) => a.id === article_id);
    if (!article) return;

    const toggleBookmark = bookmarkTogglerCreator(article_id);
    await updateBookmark(article_id, article.isBookmarked, toggleBookmark);
  };

  // Handle errors from the bookmark hook
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <Container
        className="flex-grow-1 mt-5"
        fluid
        style={{
          maxWidth: "1600px",
        }}
      >
        <Row>
          <Col xs={{ order: 1 }} md={{ order: 0, span: 9 }}>
            <h2 className="article-results-title mb-5">
              Displaying results for{" "}
              <span className="article-results-title-query">
                "{titleQuery}"
              </span>
            </h2>
            <div className="d-flex flex-column gap-3">
              {articles && articles.length > 0 ? (
                articles.map((article) => (
                  <ArticleResult
                    key={article.id}
                    article={article}
                    isPending={!!pendingArticles[article.id]}
                    bookmarkToggler={() => handleToggleBookmark(article.id)}
                  />
                ))
              ) : (
                <h2>Your query did not match any results</h2>
              )}
            </div>
          </Col>
          <Col md={3} className="side-sections-container">
            <RelatedTags tags={dummy_topic_tags} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
