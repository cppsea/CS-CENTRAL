import { Container, Row, Col, Image, Card } from "react-bootstrap";

const DEFAULT_AVATAR = "/default_avatar.jpg";

export default function UserData({ user }) {
  return (
    <>
      <Container className="my-4 d-flex justify-content-center">
        <Card className="px-4 py-3 w-100" style={{ maxWidth: "800px" }}>
          <Row className="align-items-center">
            <Col xs="auto">
              <Image
                src={user.avatar_id || DEFAULT_AVATAR}
                roundedCircle
                width={100}
                height={100}
              />
            </Col>

            <Col xs="auto">
              <div className="display-5 mb-2">
                {user.first_name} {user.last_name}
              </div>

              <div className="mb-1">
                <strong>Role: </strong>
                <span>{user.role}</span>
              </div>

              <div className="mb-1">
                <strong>Username: </strong>
                <span>{user.username}</span>
              </div>

              <div className="mb-1">
                <strong>Email: </strong>
                <span>{user.email}</span>
              </div>

              <div>
                <strong>User ID: </strong>
                <span>{user.id}</span>
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}
