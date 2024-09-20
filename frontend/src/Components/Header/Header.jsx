import {
  Button,
  Container,
  Image,
  Nav,
  Navbar,
  NavDropdown,
  OverlayTrigger,
  Popover,
  Stack
} from "react-bootstrap";
import avatar from "../../assets/avatar.jpg";
import SearchBar from "../SearchBar";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import "./Header.scss";

export default function Header() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const storedUser = localStorage.getItem("user");
  let username = null;
  if (storedUser) {
    username = JSON.parse(storedUser).username;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Navbar expand={"lg"} fixed="top" className="sticky-top px-4 bg-header">
        <Container>
          <Stack direction="horizontal" gap={2}>
            <Nav.Link href="/">
              <img className="p-1 cc-logo-header" src={"/cc_logo_white.png"} />
            </Nav.Link>
            <div className="header-divider"></div>

            <Navbar.Toggle aria-controls="basic-navbar-nav" id="toggler" />
            <Navbar.Collapse>
              <Nav variant="underline" className="ms-auto px-2">
                <Nav.Item>
                  <Nav.Link className="fw-medium" href="/" id="navbar_item">
                    Machine Learning
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="fw-medium" href="/" id="navbar_item">
                    Data Science
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <NavDropdown
                    className="fw-semibold"
                    title="More"
                    align={{ lg: "end" }}
                    id="navbar_item"
                  >
                    <NavDropdown.Item>Software Engineering</NavDropdown.Item>
                    <NavDropdown.Item>Cybersecurity</NavDropdown.Item>
                    <NavDropdown.Item>Game Development</NavDropdown.Item>
                    <NavDropdown.Item>General Programming</NavDropdown.Item>
                  </NavDropdown>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Stack>

          <Stack direction="horizontal" gap={3}>
            <div style={{ justifyContent: "center" }}>
              <SearchBar />
            </div>

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
                        {username
                          ? username.charAt(0).toUpperCase() + username.slice(1)
                          : "Guest"}
                      </Popover.Header>
                      <Popover.Body className="py-2">
                        <Nav>
                          <Nav.Item>
                            <Nav.Link
                              className="fw-medium"
                              href="/settings"
                              id="dropdown_items"
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
                    <Image src={avatar} roundedCircle width={40} />
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
