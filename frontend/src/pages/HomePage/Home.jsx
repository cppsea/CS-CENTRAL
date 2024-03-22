import { Container, Row, Col, Stack } from "react-bootstrap";
import AppTitle from "../../Components/Home/AppTitle/AppTitle";
import MainArticle from "../../Components/Home/MainArticle/MainArticle";

import main_article_img from "../../assets/Article_Images/main_article.png";
import { useEffect } from "react";
import PopularArticles from "../../Components/Home/PopularArticles/PopularArticles";

import "./Home.scss";
import RecentArticles from "../../Components/Home/RecentArticles/RecentArticles";

export default function Home() {
  // demo feature article
  const feature_article_example = {
    article_img: main_article_img,
    title: "Intro to Machine Learning",
    description:
      "Embark on a journey through the basics; explore what machine learning entails and how one can apply it in the real world.",
  };

  // useEffect to fetch the main feature article from the database (added later)
  useEffect(() => {}, []);

  return (
    <>
      <Container fluid className="home-page flex-grow-1 mx-0 py-3">
        {/* Left section - Articles Display */}
        <Row>
          <Col>
            <AppTitle />
          </Col>
        </Row>
        {/* Right section - Popular Articles */}
        <Row className="justify-content-center">
          <Col lg={8} xxl={8} className="home-main-article-container">
            <MainArticle
              title={feature_article_example.title}
              description={feature_article_example.description}
              article_img={feature_article_example.article_img}
            />
            <RecentArticles />
          </Col>
          <Col lg={4} xxl={4}>
            <PopularArticles />
          </Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}
