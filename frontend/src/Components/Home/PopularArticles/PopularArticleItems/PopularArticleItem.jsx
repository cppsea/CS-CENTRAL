import { Container, Stack, Row, Col } from "react-bootstrap";
import "./PopularArticleItem.scss";
import ArticleImage from "../ArticleImage/ArticleImage";

export default function PopularArticleItem({ title, article_img, number }) {
  return (
    <>
      <Stack className="d-flex gap-3 p-3 popular-article-item-container">
        <div>
          <ArticleImage article_img={article_img} number={number} />
        </div>
        <div>
          <a className="fw-medium popular-article-title">{title}</a>
        </div>
      </Stack>
    </>
  );
}
