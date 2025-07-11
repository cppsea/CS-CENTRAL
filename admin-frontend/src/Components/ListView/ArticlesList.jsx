import { Card, Container, Stack, Row, Col, Dropdown } from "react-bootstrap";
import "./ListView.scss";

export default function ArticlesList() {
  return (
    <Container className="p-0">
      <Stack>
        <Card className="my-4 p-4 border-0 item-card">
          <Row className="align-items-center">
            <Col>
              <div className="fw-semibold">
                Article Title
                <span className="fw-normal"> | John Doe (Author ID)</span>
              </div>
              <div className="text-muted text-truncate">01/01/2025</div>
            </Col>
            <Col xs="auto" className="text-end d-flex align-items-center gap-3">
              <div>Article ID</div>
              <div className="fw-semibold">Published</div>
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
      </Stack>
    </Container>
  );
}
