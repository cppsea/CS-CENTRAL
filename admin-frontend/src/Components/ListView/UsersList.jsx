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

export default function UsersList() {
  return (
    <Container className="p-0">
      <Stack>
        <Card className="my-4 p-4 border-0 item-card">
          <Row className="align-items-center">
            <Col xs="auto">
              <Image
                src={DEFAULT_AVATAR}
                roundedCircle
                width={50}
                height={50}
              />
            </Col>
            <Col>
              <div className="fw-semibold">
                Username<span className="fw-normal"> | John Doe</span>
              </div>
              <div className="text-muted text-truncate">email@example.com</div>
            </Col>
            <Col xs="auto" className="text-end d-flex align-items-center gap-3">
              <div className="fw-semibold">User ID</div>
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
      </Stack>
    </Container>
  );
}
