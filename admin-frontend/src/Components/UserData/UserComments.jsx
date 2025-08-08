import { Container, Row, Col, Dropdown, Card, Stack } from "react-bootstrap";

export default function UserComments({ comments, onDelete }) {
  return (
    <Container className="p-0">
      <h2 className="text-uppercase ">Comments</h2>
      {comments.length === 0 ? (
        <h4 className="text-muted pb-4 fw-normal">No comments posted yet.</h4>
      ) : (
        <Stack>
          {comments.map((comment) => (
            <Card key={comment.id} className="my-4 p-4 border-0 item-card">
              <Row>
                <Col>
                  <div className="text-muted">
                    {new Date(comment.created_at).toLocaleString()}
                  </div>
                  <div>{comment.content}</div>
                </Col>
                <Col xs="auto" className="text-end d-flex">
                  <Dropdown>
                    <Dropdown.Toggle variant="link" />
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => onDelete(comment.id)}>
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
}
