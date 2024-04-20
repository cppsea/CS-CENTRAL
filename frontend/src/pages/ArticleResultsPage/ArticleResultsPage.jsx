import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import RelatedTags from "../../Components/ArticleResults/SideSections/RelatedTopicTags/RelatedTopicTags.jsx";
import ArticleResultsList from "../../Components/ArticleResults/ArticleResultsList.jsx";
import { Col, Container, Row } from "react-bootstrap";
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
  const [articles, setArticles] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [specificArticle, setSpecificArticle] = useState();
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
  };

  useEffect(() => {
    fetch(`http://localhost:3002/api/articles/?title=${titleQuery}`)
      .then((res) =>
        res.json().then((data) => {
          let dataCopy = [...data];

          //we dont have author names, date, bookmarked, or image, so just inserting default in for now
          dataCopy.forEach((articleObject) => {
            articleObject.image =
              "https://emeritus.org/in/wp-content/uploads/sites/3/2023/03/types-of-machine-learning.jpg.optimal.jpg";
            articleObject.author = "jeff";
            articleObject.date = "October 24, 2023";
            articleObject.isBookmarked = true;
          });
          setArticles(dataCopy);
        })
      )
      .catch((error) => {
        console.error("error fetching data");
      });
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
            Results for{" "}
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
