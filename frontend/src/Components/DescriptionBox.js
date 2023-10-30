import { Container, Card } from "react-bootstrap";

export default function DescriptionBox() {
  return (
    <>
      <Container fluid>
        <Card bg="info">
          <Card.Body>
            <Card.Title>What is CS Catalog?</Card.Title>
            <Card.Text>
              CS Catalog is a helpful site where we are seeking to faciliate
              understanding and exposure to Machine Learning (ML), which has
              been an incredibly popular discripline these days. We are aiming
              at assisting those students who are uncertain where to start in
              ML. Our target users will be Computer Science students who are
              passionate about ML or are planning to get into this area.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
