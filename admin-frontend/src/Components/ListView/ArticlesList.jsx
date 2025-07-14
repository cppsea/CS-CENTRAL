import { Card, Container, Stack, Row, Col, Dropdown } from "react-bootstrap";
import "./ListView.scss";

export default function ArticlesList({ articles }) {
  return (
    <Container className="p-0">
      <Stack>
        {articles.length === 0 ? (
          <div className="text-muted my-4 display-6">No articles found.</div>
        ) : (
          <div className="text-muted my-4 display-6">Displaying results...</div>
        )}
        {articles.map((article) => (
          <Card className="my-4 p-4 border-0 item-card">
            <Row className="align-items-center">
              <Col>
                <div className="fw-semibold">
                  {article.header.blocks[0].data.text}
                  <span className="fw-normal"> | {article.author}</span>
                </div>
                {article.published_at && (
                  <div className="text-muted text-truncate">
                    {new Date(article.published_at).toLocaleDateString()}
                  </div>
                )}
              </Col>
              <Col
                xs="auto"
                className="text-end d-flex align-items-center gap-3"
              >
                <div>{article.id}</div>
                <div className="fw-semibold">
                  {article.published_at ? "Published" : "Unpublished"}
                </div>
                <Dropdown>
                  <Dropdown.Toggle variant="link" />
                  <Dropdown.Menu>
                    <Dropdown.Item>Edit</Dropdown.Item>
                    <Dropdown.Item>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
