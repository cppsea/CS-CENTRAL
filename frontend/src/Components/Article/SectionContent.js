import { Container, Row, Col, Stack } from "react-bootstrap";

//Component for the body content of an article section's content
export default function SectionContent({ content }) {
  return (
    <Container>
      <Row>
        <Col md={12} className="d-flex">
          <Stack direction="horizontal">
            <div className=" section-content-marker-container h-100">
              <div className="section-content-marker h-100">&nbsp;</div>
            </div>

            <p className="section-content-text pt-3 ps-3">{content}</p>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
