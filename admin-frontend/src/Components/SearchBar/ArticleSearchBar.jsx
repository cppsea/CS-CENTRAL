import { Form, Row, Col, Container, Button } from "react-bootstrap";
import "./SearchBar.scss";

export default function ArticleSearchBar() {
  return (
    <Container className="my-4 p-4 rounded search-container">
      <Form>
        <Row className="mb-3">
          <Form.Label column lg={1}>
            Title
          </Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Title" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Label column lg={1}>
            Author ID
          </Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Author ID" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Label column lg={1}>
            Article ID
          </Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Article ID" />
          </Col>
        </Row>
        <Row className="align-items-center">
          <Form.Label column lg={1}>
            Published (Yes)
          </Form.Label>
          <Col>
            <Form.Check type="checkbox" />
          </Col>
        </Row>
        <Row className="justify-content-end">
          <Col xs="auto">
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
