import { Container, Row, Col, Stack } from "react-bootstrap";

export default function BodySection({ body }) {
  return (
    <Container>
      <Row>
        <Col md={12} className="d-flex">
          <Stack direction="horizontal">
            <div className=" body-section-marker-container h-100">
              <div className="body-section-marker h-100">&nbsp;</div>
            </div>

            <p className="body-section-text pt-3 ps-3">{body}</p>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
