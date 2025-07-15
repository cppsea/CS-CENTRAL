import {
  Card,
  Container,
  Stack,
  Row,
  Col,
  Image,
  Dropdown,
  Spinner,
} from "react-bootstrap";
import "./ListView.scss";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { useGiveAdmin } from "../../hooks/useGiveAdmin";
import { useRemoveAdmin } from "../../hooks/useRemoveAdmin";
import { useLoadingSpinner } from "../../context/SpinnerContext";

const DEFAULT_AVATAR = "/default_avatar.jpg";

export default function UsersList({ users, setUsers }) {
  const { deleteUser } = useDeleteUser();
  const { giveAdmin } = useGiveAdmin();
  const { removeAdmin } = useRemoveAdmin();
  const { showSpinner, hideSpinner } = useLoadingSpinner();

  const handleDeleteUser = async (id) => {
    showSpinner();
    let json = await deleteUser(id);
    if (json && !json.error) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
    hideSpinner();
  };

  const handleGiveAdmin = async (id) => {
    showSpinner();
    let json = await giveAdmin(id);
    if (json && !json.error) {
      setUsers((prev) =>
        prev.map((user) => (user.id !== id ? user : { ...user, role: "admin" }))
      );
    }
    hideSpinner();
  };

  const handleRemoveAdmin = async (id) => {
    showSpinner();
    let json = await removeAdmin(id);
    if (json && !json.error) {
      setUsers((prev) =>
        prev.map((user) => (user.id !== id ? user : { ...user, role: "user" }))
      );
    }
    hideSpinner();
  };

  return (
    <Container className="p-0">
      <Stack>
        {users && users.length === 0 ? (
          <div className="text-muted my-4 display-6">No users found.</div>
        ) : (
          <div className="text-muted my-4 display-6">Displaying results...</div>
        )}
        {users &&
          users.map((user) => (
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
                      | {user.first_name} {user.last_name}
                    </span>
                  </div>
                  <div className="text-muted text-truncate">{user.email}</div>
                </Col>

                <Col
                  xs="auto"
                  className="text-end d-flex align-items-center gap-3"
                >
                  <div className="fw-semibold">
                    {user?.role === "admin" && "Admin"}
                  </div>
                  <div className="fw-semibold">{user.id}</div>
                  <Dropdown>
                    <Dropdown.Toggle variant="link" />
                    <Dropdown.Menu>
                      <Dropdown.Item>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDeleteUser(user.id)}>
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={
                          user?.role === "admin"
                            ? () => handleRemoveAdmin(user.id)
                            : () => handleGiveAdmin(user.id)
                        }
                      >
                        {user?.role === "admin" ? "Remove Admin" : "Give Admin"}
                      </Dropdown.Item>
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
