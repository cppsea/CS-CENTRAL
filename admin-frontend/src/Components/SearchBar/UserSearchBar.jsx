import { Form, Row, Col, Container, Button } from "react-bootstrap";
import "./SearchBar.scss";

export default function UserSearchBar() {
  return (
    <Container className="my-4 p-4 rounded search-container">
      <Form>
        <Row className="mb-3">
          <Form.Label column lg={1}>
            Username
          </Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Username" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Label column lg={1}>
            First Name
          </Form.Label>
          <Col>
            <Form.Control type="text" placeholder="First Name" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Label column lg={1}>
            Last Name
          </Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Last Name" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Label column lg={1}>
            Email
          </Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Email" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Label column lg={1}>
            ID
          </Form.Label>
          <Col>
            <Form.Control type="text" placeholder="ID" />
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
