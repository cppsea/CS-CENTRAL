import { Container, Stack, Image } from "react-bootstrap";

import "./MainArticle.scss";
import ArrowMarker from "../../ArrowMarker/ArrowMarker";

export default function MainArticle({ title, description, article_img }) {
  return (
    <>
      <Stack gap={3} className="main-article-container">
        <Image src={article_img} className="main-image" />
        <div className="d-flex">
          <div className="main-article-arrow-marker-container">
            <ArrowMarker />
          </div>
          <h1 id="main-title" className="ms-4">
            {title}
          </h1>
        </div>
        <p className="fw-medium article-description">{description}</p>
      </Stack>
    </>
  );
}
