import ArticleImage from "./ArticleImage.jsx";
import ArticleHeader from "./ArticleHeader/ArticleHeader.jsx";
import TableOfContents from "./Section/TableOfContents.jsx";
import RelatedTopicsList from "./Topics/RelatedTopicsList.jsx";
import BodySection from "./Section/BodySection.jsx";
import { Container, Row, Col, Stack } from "react-bootstrap";
import "./ArticleComponents.scss";
import "./Article.scss";
import { useEffect, useState } from "react";
import { useToggleBookmark } from "../../hooks/useToggleBookmark.jsx";
import { useAuthContext } from "../../hooks/useAuthContext.jsx";
import { useLoadingSpinner } from "../../context/SpinnerContext.jsx";
import toast from "react-hot-toast";
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
  const { user } = useAuthContext();
  const { toggleBookmark } = useToggleBookmark();
  const { showSpinner, hideSpinner } = useLoadingSpinner();
  //extracts article data pieces from provided article

  let titleBlocks = article.header.blocks;
  let descriptionBlocks = article.description.blocks;

  const [articleData, setArticleData] = useState({
    ...article
  });

  let contentSequence = [];

  for (const sectionIndex in articleData.articleBody) {
    const section = articleData.articleBody[sectionIndex];
    if (section.blocks.length > 0 && section.blocks[0].type === "header") {
      contentSequence.push({
        heading: section.blocks[0],
        link: `#${section.id}`,
      });
    } else {
      contentSequence.push({
        heading: {
          type: "header",
          data: { text: `Section ${Number(sectionIndex) + 1}` },
        },
        link: `#${section.id}`,
      });
    }
  }

  //handler for toggling bookmark depending on server response
  const toggleBookmarkHandler = async () => {
    if (!user) {
      toast.error("You must be logged in to bookmark this article.");
      return;
    }
    showSpinner();
    await ((ms) => new Promise((resolve) => setTimeout(resolve, ms)))(250);
    let result = toggleBookmark(articleData.id, articleData.isBookmarked);

    if (!result.error) {
      setArticleData({
        ...articleData,
        isBookmarked: !articleData.isBookmarked,
      });
    }
    hideSpinner();
  };
  return (
    <>
      <Container fluid className="h-100">
        <Row className="mt-4 mb-4">
          <Col>
            <ArticleHeader
              titleBlocks={titleBlocks}
              descriptionBlocks={descriptionBlocks}
              author={articleData.author}
              date={articleData.published_at}
              isBookmarked={articleData.isBookmarked}
              bookmarkToggler={toggleBookmarkHandler}
            />
          </Col>
        </Row>

        <Row className=" gx-4 gy-5">
          <Col xs={12} md={8}>
            <ArticleImage
              image={articleData.image}
              alt_text={`${articleData.header.blocks[0].data.text} image`}
            />
            <Stack className="gap-3">
              <TableOfContents contentSequence={contentSequence} />

              {articleData.articleBody.map((bodySection, index) => {
                //assumes that if there is a title, it will be the first block

                let currentBodySectionBlocks = [...bodySection.blocks];

                //if the first block isn't a header, it will insert a dummy header
                if (
                  bodySection.blocks.length > 0 &&
                  bodySection.blocks[0].type !== "header"
                ) {
                  currentBodySectionBlocks.splice(0, 0, {
                    type: "header",
                    data: { text: `Section ${index + 1}`, level: 2 },
                  });
                }
                return (
                  <BodySection
                    id={bodySection.id}
                    key={bodySection.id}
                    bodySectionBlocks={currentBodySectionBlocks}
                  />
                );
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
