import { Col, Container, Row, Stack } from "react-bootstrap";

export default function SectionHeader({ header }) {
  return (
    <Container>
      <Row>
        <Col md={12} className="d-flex">
          <Stack direction="horizontal">
            <div className="section-header-marker h-100">&nbsp;</div>
            <h2 className="section-header d-inline ps-4">{header}</h2>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
