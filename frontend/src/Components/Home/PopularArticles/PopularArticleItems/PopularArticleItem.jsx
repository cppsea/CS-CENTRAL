import { Stack, Image } from "react-bootstrap";
import "./PopularArticleItem.scss";
import ArticleImage from "../ArticleImage/ArticleImage";

export default function PopularArticleItem({ title, article_img, number }) {
  return (
    <>
      <Stack gap={3} className="d-flex align-items-center p-3">
        <ArticleImage article_img={article_img} number={number} />
        <a className="text-center fw-medium popular-article-title">{title}</a>
      </Stack>
    </>
  );
}
