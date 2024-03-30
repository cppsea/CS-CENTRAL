import ArticleImage from "./ArticleImage.jsx";
import ArticleHeader from "./ArticleHeader/ArticleHeader.jsx";
import TableOfContents from "./Section/TableOfContents.jsx";
import RelatedTopicsList from "./Topics/RelatedTopicsList.jsx";
import BodySection from "./Section/BodySection.jsx";
import { Container, Row, Col, Stack } from "react-bootstrap";
import "./ArticleComponents.scss";
import "./Article.scss";
import { useEffect, useState } from "react";
//dummy data for table of contents
const tableOfContents = [
  "Introduction to Machine Learning",
  "The Fundamentals of Machine Learning",
  "Types of Machine Learning Algorithms",
  "Real-World Applications of Machine Learning",
  "Challenges and Limitations in Machine Learning",
  "Ethical Considerations in Machine Learning",
  "Future Prospects and Developments in Machine Learning",
  "Conclusion and Key Takeaways",
];

//dummy data for related topics list
const relatedTopicsList = [
  {
    topicCategory: "FOUNDATIONAL CONCEPTS",
    topicList: [
      {
        topic:
          "Artificial Intelligence (AI) and its Intersection with Machine Learning",
        link: "/",
      },
      {
        topic: "Data Preprocessing and Feature Engineering in Machine Learning",
        link: "/",
      },
    ],
  },
  {
    topicCategory: "TYPES OF MACHINE LEARNING",
    topicList: [
      {
        topic:
          "Supervised, Unsupervised, and Reinforcement Learning Techniques",
        link: "/",
      },
      {
        topic: "Deep Learning and Neural Networks",
        link: "/",
      },
      {
        topic: "Natural Language Processing (NLP) and Machine Learning",
        link: "/",
      },
    ],
  },
  {
    topicCategory: "APPLICATIONS",
    topicList: [
      {
        topic: "Machine Learning in Business and Marketing",
        link: "/",
      },
      {
        topic: "Machine Learning in Healthcare and Biotechnology",
        link: "/",
      },
      {
        topic: "The Role of Machine Learning in Automation and Robotics",
        link: "/",
      },
    ],
  },
];

//this component accepts an article object and displays the corresponding article
export default function Article({ article }) {
  //extracts article data pieces from provided article

  //these properties that i'm defining aside from title don't exist in the database yet,
  //mostly made up so feel free to change later on

  //will display default data from figma for now

  const [articleData, setArticleData] = useState({
    //header data
    id: article.id ? article.id : 0,
    title: article.title ? article.title : "Intro to Machine Learning",
    desc: article.desc
      ? article.desc
      : "Embark on a journey through the basics; explore what machine learning entails and how one can apply it in the real world.",
    author: article.author ? article.author : "David Lam",
    date: article.date ? article.date : "October 29, 2023",
    isBookmarked: false,
    headers:
      article.headers && Array.isArray(article.headers)
        ? article.headers
        : [
            {
              title: "Introduction",
              body: "Machine Learning has rapidly become a cornerstone of modern technological advancement, permeating various sectors and reshaping the way we perceive and interact with data. In this era of big data, understanding the basics of Machine Learning has become imperative for professionals across diverse fields, from business to healthcare and beyond. By harnessing the power of algorithms and data, Machine Learning enables systems to learn from experience and improve their performance over time without explicit programming.This introductory guide aims to provide a comprehensive overview of the fundamental concepts of Machine Learning, delving into its significance, various algorithms, real-world applications, challenges, ethical considerations, and the promising future it holds.",
            },
          ],
  });

  console.log(articleData.headers);
  //create array of content header objects to be used for body sections and table of contents
  const contentHeaderSequence = articleData.headers.map(
    ({ title, body }, index) => {
      let id = `${title}-${index}`;
      return {
        heading: title
          .split(" ")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" "),
        link: `http://localhost:5173/article_view/${articleData.id}#${id}`,
        id: id,
        body: body,
      };
    }
  );
  //handler for toggling bookmark
  const toggleBookmark = () =>
    setArticleData({ ...articleData, isBookmarked: !articleData.isBookmarked });
  return (
    <>
      <Container fluid className="h-100">
        <Row className="mt-4 mb-4">
          <Col>
            <ArticleHeader
              title={articleData.title}
              description={articleData.desc}
              author={articleData.author}
              date={articleData.date}
              isBookmarked={articleData.isBookmarked}
              bookmarkToggler={toggleBookmark}
            />
          </Col>
        </Row>

        <Row className=" gx-4 gy-5">
          <Col xs={12} md={8}>
            <ArticleImage image={"/ai_image.jpg"} alt_text={"AI-image"} />
            <Stack className="gap-3">
              <TableOfContents contentSequence={contentHeaderSequence} />

              {contentHeaderSequence.map(({ id, heading, body }, index) => {
                return <BodySection id={id} title={heading} body={body} />;
              })}
            </Stack>
          </Col>

          <Col xs={12} md={4} className="rel-topics-container ps-3">
            <RelatedTopicsList topicLists={relatedTopicsList} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
