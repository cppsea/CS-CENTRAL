import { Container, Card, Stack, NavLink, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function LinkedDescriptionBox({
  children,
  title,
  fluid,
  disabled,
  variant,
  id,
}) {
  return (
    <>
      <Container fluid={fluid}>
        <Card bg="primary" className="rounded-5">
          <Card.Body>
            <Card.Title>
              <Button
                value={title}
                href={`/article_view/${id}`}
                variant={variant}
                disabled={disabled}
                className="text-light fs-5"
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
