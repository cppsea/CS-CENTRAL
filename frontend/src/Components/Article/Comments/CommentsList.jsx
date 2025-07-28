import { Stack, Card, Row, Col, Container, Image } from "react-bootstrap";

const DEFAULT_AVATAR = "/default_avatar.jpg";

export default function CommentsList({ comments }) {
  return (
    <Container className="p-0">
      {comments.length === 0 ? (
        <h4 className="text-muted pb-4 fw-normal">
          No comments found. Be the first and post your own!
        </h4>
      ) : (
        <Stack>
          {comments.map((comment) => (
            <Card key={comment.id} className="my-4 p-4 border-0 item-card">
              <Row>
                <Col xs="auto">
                  <Image
                    src={comment.avatar || DEFAULT_AVATAR}
                    roundedCircle
                    width={50}
                    height={50}
                  />
                </Col>
                <Col>
                  <div>
                    <span className="fw-bold">{comment.name}</span>{" "}
                    <span className="text-muted">
                      @{comment.username} -{" "}
                      {new Date(comment.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div>{comment.content}</div>
                </Col>
              </Row>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
}
