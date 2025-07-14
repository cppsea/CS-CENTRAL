import {
  Card,
  Container,
  Stack,
  Row,
  Col,
  Image,
  Dropdown,
} from "react-bootstrap";
import "./ListView.scss";

const DEFAULT_AVATAR = "/default_avatar.jpg";

export default function UsersList({ users }) {
  return (
    <Container className="p-0">
      <Stack>
        {users.length === 0 ? (
          <div className="text-muted my-4 display-6">No users found.</div>
        ) : (
          <div className="text-muted my-4 display-6">Displaying results...</div>
        )}
        {users.map((user) => (
          <Card key={user.id} className="my-4 p-4 border-0 item-card">
            <Row className="align-items-center">
              <Col xs="auto">
                <Image
                  src={user.avatar_id || DEFAULT_AVATAR}
                  roundedCircle
                  width={50}
                  height={50}
                />
              </Col>
              <Col>
                <div className="fw-semibold">
                  Username
                  <span className="fw-normal">
                    {" "}
                    | {user.first_name} {user.last_name}
                  </span>
                </div>
                <div className="text-muted text-truncate">{user.email}</div>
              </Col>
              <Col
                xs="auto"
                className="text-end d-flex align-items-center gap-3"
              >
                <div className="fw-semibold">{user.id}</div>
                <Dropdown>
                  <Dropdown.Toggle variant="link" />
                  <Dropdown.Menu>
                    <Dropdown.Item>Edit</Dropdown.Item>
                    <Dropdown.Item>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
