import React from "react";
import ArticleHeader from "../../Article/ArticleHeader/ArticleHeader";
import TableOfContents from "../../Article/Section/TableOfContents";
import BodySection from "../../Article/Section/BodySection";
import ArticleImage from "../../Article/ArticleImage";
import { Stack, Container, Row, Col } from "react-bootstrap";
import RelatedTopicsList from "../../Article/Topics/RelatedTopicsList";

// Sample Related Topics (you can customize or remove this)
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
];

export default function ReviewMode({ data }) {
  const contentHeaderSequence = data.bodySections
    ? data.bodySections.map(({ title, content }, index) => ({
        heading: title,
        link: `#${title}-${index}`,
        id: `${title}-${index}`,
        body: content,
      }))
    : [];

  return (
    <Container fluid className="h-100 article-review">
      <Row className="mt-4 mb-4">
        <Col>
          <ArticleHeader
            title={data.header?.text || "No Title"}
            description={data.desc?.text || "No Description"}
            author={data.author || "Unknown Author"}
            date={data.date || new Date().toLocaleDateString()}
          />
        </Col>
      </Row>

      <Row className="gx-4 gy-5">
        <Col xs={12} md={8}>
          <ArticleImage image={data.image || "/placeholder.jpg"} alt_text="Article Image" />

          <Stack className="gap-3">
            <TableOfContents contentSequence={contentHeaderSequence} />

            {contentHeaderSequence.map(({ id, heading, body }) => (
              <BodySection key={id} id={id} title={heading} body={body} />
            ))}
          </Stack>
        </Col>

        <Col xs={12} md={4} className="rel-topics-container ps-3">
          <RelatedTopicsList topicLists={relatedTopicsList} />
        </Col>
      </Row>
    </Container>
  );
}
