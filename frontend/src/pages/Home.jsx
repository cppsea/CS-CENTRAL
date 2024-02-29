import { Container, Stack } from "react-bootstrap";
import AppTitle from "../Components/Home/AppTitle/AppTitle";
import MainArticle from "../Components/Home/MainArticle/MainArticle";

import main_article_img from "../assets/Article_Images/main_article.png";
import { useEffect } from "react";

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
      <Container fluid className="flex-grow-1 mx-0">
        <Stack className="my-2" gap={3}>
          <AppTitle />
          <MainArticle
            title={feature_article_example.title}
            description={feature_article_example.description}
            article_img={feature_article_example.article_img}
          />
        </Stack>
      </Container>
    </>
  );
}
