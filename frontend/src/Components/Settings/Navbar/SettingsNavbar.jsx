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
    <Nav variant="underline" className="navbar-container">
      <Nav.Item className="settings-nav-item">
        <Nav.Link
          href="/settings/profile-settings"
          eventKey={"profile-settings"}
          className={`settings-nav-link fw-medium ${
            window.location.pathname === "/settings/profile-settings"
              ? "settings-nav-link-active"
              : ""
          }`}
          onClick={(e) => handleNavLinkClick("profile-settings", e)}
        >
          <span className="text-uppercase text-end settings-nav-link-text">
            Profile
            {window.location.pathname === "/settings/profile-settings" && (
              <span className={"settings-nav-link-active-highlight"}></span>
            )}
          </span>
        </Nav.Link>
      </Nav.Item>

      <Nav.Item className="settings-nav-item">
        <Nav.Link
          href="/settings/saved-articles"
          eventKey={"saved-articles"}
          className={`settings-nav-link fw-medium ${
            window.location.pathname === "/settings/saved-articles"
              ? "settings-nav-link-active"
              : ""
          }`}
          onClick={(e) => handleNavLinkClick("saved-articles", e)}
        >
          <span className="text-uppercase text-end settings-nav-link-text">
            Saved Articles
            {window.location.pathname === "/settings/saved-articles" && (
              <span className={"settings-nav-link-active-highlight"}></span>
            )}
          </span>
        </Nav.Link>
      </Nav.Item>

      <Nav.Item className="settings-nav-item">
        <Nav.Link
          href="/settings/customizations"
          eventKey={"customizations"}
          className={`settings-nav-link fw-medium ${
            window.location.pathname === "/settings/customizations"
              ? "settings-nav-link-active"
              : ""
          }`}
          onClick={(e) => handleNavLinkClick("customizations", e)}
        >
          <span className="text-uppercase text-end settings-nav-link-text">
            Customizations
            {window.location.pathname === "/settings/customizations" && (
              <span className={"settings-nav-link-active-highlight"}></span>
            )}
          </span>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
