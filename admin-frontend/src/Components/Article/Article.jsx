import ArticleImage from "./ArticleImage.jsx";
import ArticleHeader from "./ArticleHeader/ArticleHeader.jsx";
import TableOfContents from "./Section/TableOfContents.jsx";
import RelatedTopicsList from "./Topics/RelatedTopicsList.jsx";
import BodySection from "./Section/BodySection.jsx";
import { Container, Row, Col, Stack } from "react-bootstrap";
import "./ArticleComponents.scss";
import "./Article.scss";
import { useEffect, useState } from "react";

//this component accepts an article object and displays the corresponding article
export default function Article({ article }) {
  //extracts article data pieces from provided article

  let titleBlocks = article.header.blocks;
  let descriptionBlocks = article.description.blocks;

  const [articleData, setArticleData] = useState({
    ...article,
    isBookmarked: false,
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

  return (
    <>
      <Container fluid className="preview-container">
        <Row className="mt-4 mb-4">
          <Col>
            <ArticleHeader
              titleBlocks={titleBlocks}
              descriptionBlocks={descriptionBlocks}
              author={articleData.author}
              date={articleData.published_at}
              disableBookmark
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <ArticleImage
              image={articleData.image}
              alt_text={`${articleData.header.blocks[0].data.text} image`}
            />
          </Col>
        </Row>

        <Row className=" gx-4 gy-5">
          <Col xs={12} md={8}>
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
        </Row>
      </Container>
    </>
  );
}
