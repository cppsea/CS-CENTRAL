import { Container, Stack, Row, Col } from "react-bootstrap";
import "./PopularArticleItem.scss";
import ArticleImage from "../ArticleImage/ArticleImage";

export default function PopularArticleItem({ title, article_img, number }) {
  return (
    <>
      <Container className="d-flex flex-column gap-3 p-3 popular-article-item-container">
        <ArticleImage article_img={article_img} number={number} />
        <a className="fw-medium popular-article-title">{title}</a>
      </Container>
    </>
  );
}
