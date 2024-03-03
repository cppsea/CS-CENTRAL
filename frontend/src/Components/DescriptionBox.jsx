import { Container, Card, Stack, Image } from "react-bootstrap";
import logo from "../assets/logo.png";

export default function DescriptionBox({ children, title, fluid }) {
  return (
    <>
      <Container fluid={fluid}>
        <Card bg="primary" className="rounded-5">
          <Card.Body>
            <Stack direction="horizontal">
              <div>
                <Image src={logo} width={200} rounded />
              </div>
              <div className="ps-3">
                <Card.Title className="fs-2">{title}</Card.Title>
                <Card.Text className="text-light">{children}</Card.Text>
              </div>
            </Stack>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
