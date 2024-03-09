import { Stack } from "react-bootstrap";
import PopularArticleItem from "./PopularArticleItems/PopularArticleItem";

import ai_image from "../../../assets/Article_Images/ai_image.png";
import quantum from "../../../assets/Article_Images/quantum.png";
import ai_brain from "../../../assets/ml_brain.jpg";

import "./PopularArticles.scss";

export default function PopularArticles() {
  const popular_article_sample = [
    {
      title: "The Future of Artificial Intelligence: Trends and Challenges",
      article_img: ai_image,
    },
    {
      title: "Advancements in Quantum Computing: A Comprehensive Overview",
      article_img: quantum,
    },
    {
      title: "Deep Learning and Neural Networks",
      article_img: ai_brain,
    },
  ];

  return (
    <>
      <Stack className="h-100">
        <h1 className="popular-article-heading">Popular Articles</h1>
        <div className="d-flex">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="popular-article-container">
            {popular_article_sample.map((article, id) => (
              <PopularArticleItem
                key={article.id}
                number={id + 1}
                title={article.title}
                article_img={article.article_img}
              />
            ))}
            <a
              href="/"
              className="ms-2 mb-2 fw-light text-center see-more-link"
            >
              Interested? See more
            </a>
          </div>
        </div>
      </Stack>
    </>
  );
}
