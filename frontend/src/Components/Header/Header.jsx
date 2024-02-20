import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.jpg";
import {
  Container,
  Nav,
  Navbar,
  Image,
  Stack,
  NavDropdown,
  OverlayTrigger,
  Popover,
  Button,
} from "react-bootstrap";
import SearchBar from "../SearchBar";

import "./Header.scss";

export default function Header() {
  return (
    <>
      {/* <Stack gap={3} className="flex-grow-0"> */}
      <Navbar expand="lg" fixed="top" className="sticky-top px-4 bg-header">
        <Container fluid>
          <Stack direction="horizontal" gap={2}>
            <Nav.Link href="/">
              <Image className="p-1" src={logo} roundedCircle width={60} />
            </Nav.Link>
            <div className="header-divider"></div>

            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              id="toggler"
            />
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
            <Stack style={{ justifyContent: "center" }}>
              <SearchBar />
            </Stack>

            <Nav variant="underline">
              <Nav.Item>
                {/* <Nav.Link id="navbar_item"> */}
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
                        Hello John Smith!
                      </Popover.Header>
                      <Popover.Body>
                        <Nav>
                          <Nav.Item>
                            <Nav.Link
                              className="fw-medium"
                              href="/"
                              id="dropdown_items"
                            >
                              My Profile
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              className="fw-medium"
                              href="/settings/saved-articles"
                              id="dropdown_items"
                            >
                              Saved Articles
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              className="fw-medium"
                              href="/settings"
                              id="dropdown_items"
                            >
                              Settings
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <Button className=" bg-transparent border-0">
                    <Image src={avatar} roundedCircle width={40} />
                  </Button>
                </OverlayTrigger>
                {/* </Nav.Link> */}
              </Nav.Item>
            </Nav>
          </Stack>
        </Container>
      </Navbar>
      {/* </Stack> */}
    </>
  );
}
