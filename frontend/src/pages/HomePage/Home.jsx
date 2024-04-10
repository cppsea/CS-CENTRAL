import { Container, Row, Col, Stack } from "react-bootstrap";
import AppTitle from "../../Components/Home/AppTitle/AppTitle";
import MainArticle from "../../Components/Home/MainArticle/MainArticle";

import main_article_img from "../../assets/Article_Images/main_article.png";
import { useEffect } from "react";
import PopularArticles from "../../Components/Home/PopularArticles/PopularArticles";

import "./Home.scss";
import RecentArticles from "../../Components/Home/RecentArticles/RecentArticles";

import ai_computing from "../../assets/Article_Images/ai_computing.png";
import devin_ai from "../../assets/Article_Images/devin_ai.png";
import ai_in_business from "../../assets/Article_Images/ai_in_business.png";
import quantum from "../../assets/Article_Images/quantum.png";
import ai_brain from "../../assets/ml_brain.jpg";

export default function Home() {
  // demo feature article
  const feature_article_example = {
    article_img: main_article_img,
    title: "Intro to Machine Learning",
    description:
      "Embark on a journey through the basics; explore what machine learning entails and how one can apply it in the real world.",
  };

  const recent_articles = [
    {
      id: 0,
      title: "Devin AI",
      author: "Scott Wu",
      article_img: devin_ai,
      article_desc: "The world's first AI Software Engineer",
      article_date: "March 20, 2024",
      article_read_time: "10 min read",
    },
    {
      id: 1,
      title: "Deep Learning and Neural Networks",
      author: "Jeff",
      article_img: ai_brain,
      article_desc: "Learn more about deep learning and its applications",
      article_date: "March 21, 2024",
      article_read_time: "15 min read",
    },
    {
      id: 2,
      title: "Supervised, Unsupervised, and Reinforcement Learning Techniques",
      author: "Darren",
      article_img: ai_computing,
      article_desc: "Explore some methods used in Machine Learning and AI",
      article_date: "March 22, 2024",
      article_read_time: "20 min read",
    },
    {
      id: 3,
      title: "Machine Learning in Business and Marketing",
      author: "Jeff",
      article_img: ai_in_business,
      article_desc:
        "Deep dive into the application of Machine Learning in Business and Marketing",
      article_date: "March 18, 2024",
      article_read_time: "15 min read",
    },
    {
      id: 4,
      title: "Quantum Computing",
      author: "Darren",
      article_img: quantum,
      article_desc:
        "Curious about what quantum computing is about. Here is an article for you!",
      article_date: "March 20, 2024",
      article_read_time: "12 min read",
    },
  ];

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
            <RecentArticles recent_articles={recent_articles} />
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
