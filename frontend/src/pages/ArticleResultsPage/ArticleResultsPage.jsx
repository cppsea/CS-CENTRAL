import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import RelatedTags from "../../Components/ArticleResults/SideSections/RelatedTopicTags/RelatedTopicTags.jsx";
import ArticleResultsList from "../../Components/ArticleResults/ArticleResultsList.jsx";
import { Col, Container, Row } from "react-bootstrap";
import "./ArticleResultsPage.scss";
import { useLoadingSpinner } from "../../context/SpinnerContext.jsx";
import { useToggleBookmark } from "../../hooks/useToggleBookmark.jsx";
import { useAuthContext } from "../../hooks/useAuthContext.jsx";
import toast from "react-hot-toast";
const dummy_topic_tags = [
  { label: "Deep Learning" },
  { label: "Artifical Intelligence" },
  { label: "Computer Vision" },
  { label: "Data Science" },
];

export default function ArticleResultsPage({}) {
  const { showSpinner, hideSpinner } = useLoadingSpinner();

  const [articles, setArticles] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [specificArticle, setSpecificArticle] = useState();
  const titleQuery = searchParams.get("title");

  const  user  = JSON.parse(localStorage.getItem("user"));

  const { toggleBookmark } = useToggleBookmark();
  //bookmark toggler creator function, returns function that toggles bookmark for certain id depending on server response
  const bookmarkTogglerCreator = (id) => async () => {
    if (!user) {
      toast.error("You must be logged in to bookmark articles.");
      return;
    }
    let articleIndex = articles.findIndex((article) => article.id === id);
    if (articleIndex == -1) return;

    let bookmarkArticle = articles[articleIndex];

    showSpinner();
    let result = await toggleBookmark(
      bookmarkArticle.id,
      bookmarkArticle.isBookmarked
    );
    await ((ms) => new Promise((resolve) => setTimeout(resolve, ms)))(250);
    if (!result.error) {
      setArticles((prev) =>
        prev.map((currArticle) =>
          currArticle.id === id
            ? { ...currArticle, isBookmarked: !currArticle.isBookmarked }
            : currArticle
        )
      );
    }
    hideSpinner();
  };

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchArticles = async () => {
      try {
        showSpinner();
        let res = await fetch(`${apiUrl}/api/articles/?title=${titleQuery}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: user ? `Bearer ${user?.token}` : "",
          },
        });
        res = await res.json();
        let dataCopy = [...res];
        setArticles(dataCopy);
      } catch (err) {
        console.log(err);
      } finally {
        hideSpinner();
      }
    };
    fetchArticles();
  }, [titleQuery, setSearchParams]);

  return (
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
            <span className="article-results-title-query">"{titleQuery}"</span>
          </h2>
          <ArticleResultsList
            articles={articles}
            bookmarkTogglerCreator={bookmarkTogglerCreator}
          />
        </Col>
        <Col md={3} className="side-sections-container">
          <RelatedTags tags={dummy_topic_tags} />
        </Col>
      </Row>
    </Container>
  );
}
