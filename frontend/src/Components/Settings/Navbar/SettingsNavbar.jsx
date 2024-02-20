import { Container, Nav } from "react-bootstrap";
import "../Settings.scss";
import { useNavigate } from "react-router-dom";

export default function SettingsNavbar() {
  const navigate = useNavigate();

  const handleNavLinkClick = (eventKey, event) => {
    event.preventDefault();
    navigate(`/settings/${eventKey}`);
  };

  return (
    <Container className="navbar-container my-3">
      <Nav
        variant="underline"
        className="flex-lg-column d-lg-inline flex-sm-row"
      >
        <Nav.Item>
          <Nav.Link
            href="/settings/profile-settings"
            eventKey={"profile-settings"}
            className={`link-primary fs-navbar-link fw-medium ${
              window.location.pathname === "/settings" ||
              window.location.pathname === "/settings/profile-settings"
                ? "nav-link-underline-primary text-primary"
                : "text-dark"
            }`}
            onClick={(e) => handleNavLinkClick("profile-settings", e)}
          >
            Profile
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            href="/settings/saved-articles"
            eventKey={"saved-articles"}
            className={`link-primary fs-navbar-link fw-medium ${
              window.location.pathname === "/settings/saved-articles"
                ? "nav-link-underline-primary text-primary"
                : "text-dark"
            }`}
            onClick={(e) => handleNavLinkClick("saved-articles", e)}
          >
            Saved Articles
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            href="/settings/customizations"
            eventKey={"customizations"}
            className={`link-primary fs-navbar-link fw-medium ${
              window.location.pathname === "/settings/customizations"
                ? "nav-link-underline-primary text-primary"
                : "text-dark"
            }`}
            onClick={(e) => handleNavLinkClick("customizations", e)}
          >
            Customizations
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
}
