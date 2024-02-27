import { Container, Nav } from "react-bootstrap";
import "./SettingsNavbar.scss";
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
            className={`settings-nav-link fw-medium ${
              window.location.pathname === "/settings/profile-settings"
                ? "settings-nav-link-active" //"nav-link-underline-primary text-primary"
                : ""
            }`}
            onClick={(e) => handleNavLinkClick("profile-settings", e)}
          >
            Profile
            {window.location.pathname === "/settings/profile-settings" && (
              <div className="settings-nav-link-active-highlight"></div>
            )}
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            href="/settings/saved-articles"
            eventKey={"saved-articles"}
            className={`settings-nav-link fw-medium ${
              window.location.pathname === "/settings/saved-articles"
                ? "settings-nav-link-active" //"nav-link-underline-primary text-primary"
                : ""
            }`}
            onClick={(e) => handleNavLinkClick("saved-articles", e)}
          >
            Saved Articles
            {window.location.pathname === "/settings/saved-articles" && (
              <div className="settings-nav-link-active-highlight"></div>
            )}
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            href="/settings/customizations"
            eventKey={"customizations"}
            className={`settings-nav-link fw-medium ${
              window.location.pathname === "/settings/customizations"
                ? "settings-nav-link-active" //"nav-link-underline-primary text-primary"
                : ""
            }`}
            onClick={(e) => handleNavLinkClick("customizations", e)}
          >
            Customizations
            {window.location.pathname === "/settings/customizations" && (
              <div className="settings-nav-link-active-highlight"></div>
            )}
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
}
