import { Container, Card, Stack, NavLink, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function LinkedDescriptionBox({
  children,
  title,
  fluid,
  disabled,
  variant,
}) {
  return (
    <>
      <Container fluid={fluid}>
        <Card bg="primary" className="rounded-5">
          <Card.Body>
            <Card.Title>
              <Button
                href="/article_view/:name"
                variant={variant}
                disabled={disabled}
                className="text-light fs-5"
                value={title}
              >
                {title}
              </Button>
            </Card.Title>
            <Card.Text className="text-light">{children}</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
