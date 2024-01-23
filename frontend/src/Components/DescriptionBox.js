import { Container, Card, Stack } from "react-bootstrap";

export default function DescriptionBox({
  children,
  title,
  imgSrc,
  height,
  width,
  fluid
}) {
  return (
    <>
      <Container fluid={fluid}>
        <Card bg="info" className="rounded-5">
          <Stack direction="horizontal">
            <Card.Img
              src={imgSrc}
              style={{ width: width + "em", height: height + "em" }}
              className="p-1 rounded-5"
            />
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>{children}</Card.Text>
            </Card.Body>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
