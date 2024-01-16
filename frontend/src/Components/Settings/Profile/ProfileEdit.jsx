import { Container, Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import { PencilFill } from "react-bootstrap-icons";

export default function ProfileEdit() {
  return (
    <Container className="my-3">
      <Form>
        <div>
          <h4 className="ps-2 py-1 border-start border-4 border-primary">
            General
          </h4>

          <Row xs={1} sm={2} className="gy-3">
            <Col>
              <Form.Label className="fw-medium">First name</Form.Label>
              <Form.Group>
                <InputGroup>
                  <Form.Control
                    name="firstname"
                    placeholder="First name"
                    className="border border-dark border-end-0"
                  />
                  <Button
                    title="Edit"
                    className="bg-transparent border-start-0 border-dark"
                  >
                    <PencilFill />
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Label className="fw-medium">Last name</Form.Label>
              <Form.Group>
                <InputGroup>
                  <Form.Control
                    name="firstname"
                    placeholder="Last name"
                    className="border border-dark border-end-0"
                  />
                  <Button
                    title="Edit"
                    className="bg-transparent border-start-0 border-dark"
                  >
                    <PencilFill />
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Label className="fw-medium">Email</Form.Label>
              <Form.Group>
                <InputGroup>
                  <Form.Control
                    name="email"
                    placeholder="Email"
                    className="border border-dark border-end-0"
                  />
                  <Button
                    title="Edit"
                    className="bg-transparent border-start-0 border-dark"
                  >
                    <PencilFill />
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </div>
        <div>
          <h4 className="ps-2 py-1 mt-3 border-start border-4 border-primary">
            Login
          </h4>
          <Row className="gy-3">
            <Col sm={12}>
              <Form.Label className="fw-medium">Username</Form.Label>
              <Form.Group>
                <InputGroup>
                  <Form.Control
                    name="username"
                    placeholder="jsmith10"
                    className="border border-dark border-end-0"
                  />
                  <Button
                    title="Edit"
                    className="bg-transparent border-start-0 border-dark"
                  >
                    <PencilFill />
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Label className="fw-medium">Password</Form.Label>
              <Form.Group>
                <InputGroup>
                  <Form.Control
                    name="password"
                    placeholder="*************"
                    className="border border-dark border-end-0"
                  />
                  <Button
                    title="Edit"
                    className="bg-transparent border-start-0 border-dark"
                  >
                    <PencilFill />
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </div>
      </Form>
    </Container>
  );
}
