import { Col, Container, Row } from "react-bootstrap";

export default function SectionHeader({ header }) {
  return (
    <Container>
      <Row>
        <Col md={12} className="d-flex align-items-center gap-4">
          <div className="section-header-marker h-100"></div>
          <h2 className="d-inline">{header}</h2>
        </Col>
      </Row>
    </Container>
  );
}
