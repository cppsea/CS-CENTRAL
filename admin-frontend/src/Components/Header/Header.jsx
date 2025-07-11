import {
  Container,
  Nav,
  Navbar,
  Image,
  Stack,
  OverlayTrigger,
  Popover,
  Button,
} from "react-bootstrap";

import { SunFill, MoonFill } from "react-bootstrap-icons";
import { useState, useEffect } from "react";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import "./Header.scss";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DEFAULT_AVATAR = "/default_avatar.jpg";

export default function Header() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };

  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    return (
      stored ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  const checkLoggedIn = (e) => {
    if (!user) {
      e.preventDefault();
      logout();
      navigate("/signin");
      toast.error("Please login or create an account.");
      e.stopPropagation();
    }
  };
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <>
      <Navbar expand="sm" fixed="top" className="sticky-top px-4 bg-header">
        <Container>
          <Stack direction="horizontal" gap={2}>
            <Nav.Link href="/">
              <img className="p-1 cc-logo-header" src={"/cc_logo_white.png"} />
            </Nav.Link>
            <div className="header-divider"></div>

            <Nav className="ms-auto px-2">
              <Nav.Item>
                <Nav.Link className="fw-medium" href="/" id="navbar_item">
                  Admin
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Stack>

          <Stack
            direction="horizontal"
            gap={3}
            className="flex-grow-1 justify-content-end align-items-center header-right"
          >
            <Button
              variant="link"
              className="p-0 me-2 toggle-theme-button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "light" ? (
                <SunFill size={24} />
              ) : (
                <MoonFill size={24} />
              )}
            </Button>

            <Nav variant="underline">
              <Nav.Item>
                <OverlayTrigger
                  rootClose
                  trigger="click"
                  placement={"bottom"}
                  overlay={
                    <Popover>
                      <Popover.Header
                        as="h3"
                        className="text-center bg-primary"
                      >
                        Hello {user ? user.first_name : "Guest"}!
                      </Popover.Header>
                      <Popover.Body className="py-2">
                        <Nav>
                          <Nav.Item>
                            <Nav.Link
                              className="fw-medium"
                              href="/settings/profile-settings"
                              id="dropdown_items"
                              onClick={checkLoggedIn}
                            >
                              My Profile
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              className="fw-medium"
                              href="/settings"
                              id="dropdown_items"
                              onClick={checkLoggedIn}
                            >
                              Settings
                            </Nav.Link>
                          </Nav.Item>
                          <div id="profile_menu_divider"></div>
                          <Nav.Item>
                            {user ? (
                              <Nav.Link
                                className="fw-medium"
                                href="/signin"
                                id="dropdown_items"
                                style={{ color: "red" }}
                                onClick={handleLogout}
                              >
                                Sign out
                              </Nav.Link>
                            ) : (
                              <Nav.Link
                                className="fw-bold"
                                href="/signin"
                                id="dropdown_items"
                                style={{ color: "lightblue" }}
                              >
                                Sign in
                              </Nav.Link>
                            )}
                          </Nav.Item>
                        </Nav>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <Button className=" bg-transparent border-0 p-0">
                    <Image
                      src={user ? user.avatar : DEFAULT_AVATAR}
                      roundedCircle
                      width={50}
                      height={50}
                    />
                  </Button>
                </OverlayTrigger>
              </Nav.Item>
            </Nav>
          </Stack>
        </Container>
      </Navbar>
    </>
  );
}
