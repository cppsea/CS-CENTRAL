import { Container, Nav } from "react-bootstrap";

import "../Settings.scss";

export default function SettingsNavbar() {
  return (
    <Container className="navbar-container my-3">
      <Nav
        variant="underline"
        defaultActiveKey={"/profile-settings"}
        className="flex-lg-column d-lg-inline flex-sm-row"
      >
        <Nav.Link
          className="text-dark fs-navbar-link fw-medium"
          href="/profile-settings"
        >
          Profile
        </Nav.Link>
        <Nav.Link
          className="text-dark fs-navbar-link fw-medium"
          eventKey={"link-1"}
        >
          Saved Articles
        </Nav.Link>
        <Nav.Link
          className="text-dark fs-navbar-link fw-medium"
          eventKey={"link-2"}
        >
          Customization
        </Nav.Link>
      </Nav>
    </Container>
  );
}
