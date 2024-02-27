import { Container, Stack, Image } from "react-bootstrap";

import "./MainArticle.scss";
import ArrowMaker from "./ArrowMarker/ArrowMarker";

export default function MainArticle({ title, description, article_img }) {
  return (
    <>
      <Container>
        <Stack gap={3} className="main-article-container">
          <Image src={article_img} className="main-image" />
          <div className="d-flex">
            <ArrowMaker />
            <h1 id="main-title" className="ms-3">
              {title}
            </h1>
          </div>
          <p className="fw-medium article-description">{description}</p>
        </Stack>
      </Container>
    </>
  );
}
