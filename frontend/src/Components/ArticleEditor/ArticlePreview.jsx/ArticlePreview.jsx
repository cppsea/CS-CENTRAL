import { Container, Row, Col, Stack } from "react-bootstrap";
import ArticleHeader from "../../Article/ArticleHeader/ArticleHeader";
import ArticleImage from "../../Article/ArticleImage";
import BodySection from "../../Article/Section/BodySection";
import { useAuthContext } from "../../../hooks/useAuthContext";
export default function ArticlePreview({ articleEditorData, user }) {
  //insert dummy data if title and description blocks are empty
  let titleBlocks = articleEditorData.header.blocks;
  let descriptionBlocks = articleEditorData.description.blocks;

  if (titleBlocks.length == 0 || titleBlocks[0].data.text.length == 0) {
    titleBlocks = [
      { type: "header", data: { text: "Article Title", level: 1 } },
    ];
  }
  if (
    descriptionBlocks.length == 0 ||
    descriptionBlocks[0].data.text.length == 0
  ) {
    descriptionBlocks = [
      { type: "paragraph", data: { text: "This is a description." } },
    ];
  }

  return (
    <Container fluid className="h-100">
      <Row className="mt-4 mb-4">
        <Col>
          <ArticleHeader
            titleBlocks={titleBlocks}
            descriptionBlocks={descriptionBlocks}
            author={user ? `${user.first_name} ${user.last_name}` : "Guest"}
            date={(() => {
              let today = new Date();
              var dd = String(today.getDate()).padStart(2, "0");
              var mm = today.toLocaleString("default", { month: "long" });
              var yyyy = today.getFullYear();

              today = mm + " " + dd + ", " + yyyy;
              return today;
            })()}
            disableBookmark
          />
        </Col>
      </Row>

      <Row className=" gx-4 gy-5">
        <Col xs={12} md={8}>
          <Stack className="gap-3">
            <ArticleImage
              image={articleEditorData.image}
            />
            {/* <TableOfContents contentSequence={contentHeaderSequence} /> */}

            {articleEditorData.articleBody.map((bodySection, index) => {
              //assumes that if there is a title, it will be the first block

              let currentBodySectionBlocks = [...bodySection.blocks];

              //if the first block isn't a header, it will insert a dummy header
              if (
                bodySection.blocks.length > 0 &&
                bodySection.blocks[0].type !== "header"
              ) {
                currentBodySectionBlocks.splice(0, 0, {
                  type: "header",
                  data: { text: "Section Title", level: 2 },
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
  );
}
