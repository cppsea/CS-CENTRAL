import main_article_img from "../../../assets/Article_Images/main_article.png";
import { Container, Stack, Image } from "react-bootstrap";

import "./MainArticle.scss";
import ArrowMaker from "./ArrowMarker/ArrowMarker";

export default function MainArticle() {
  return (
    <>
      <Container>
        <Stack gap={3} className="main-article-container">
          <Image src={main_article_img} className="main-image" />
          <div className="d-flex">
            <ArrowMaker />
            <h1 id="main-title" className="ms-3">
              Intro to Machine Learning
            </h1>
          </div>
          <p className="fw-medium article-description">
            Embark on a journey through the basics; explore what machine
            learning entails and how one can apply it in the real world.
          </p>
        </Stack>
      </Container>
    </>
  );
}
