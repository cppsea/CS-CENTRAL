import {
  Stack,
  Card,
  Row,
  Col,
  Container,
  Image,
  Dropdown,
} from "react-bootstrap";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { ThreeDotsVertical } from "react-bootstrap-icons";

const DEFAULT_AVATAR = "/default_avatar.jpg";

export default function CommentsList({ comments, onDelete }) {
  const { user } = useAuthContext();

  return (
    <Container fluid className="p-0 comments-list">
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
                {user?.username === comment.username && (
                  <Col xs="auto" className="text-end d-flex">
                    <Dropdown>
                      <Dropdown.Toggle variant="link">
                        <ThreeDotsVertical />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => onDelete(comment.id)}>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                )}
              </Row>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
}
