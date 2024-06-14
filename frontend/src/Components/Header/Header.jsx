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
import { Search, LightbulbFill } from "react-bootstrap-icons";

import "./Header.scss";
import { useState } from "react";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const sm = 576;

  // crolling listener event
  const windowWidth = window.innerWidth;
  if (windowWidth <= sm) {
    document.addEventListener("scroll", function (e) {
      // get current vertical scrolling point
      const positionPoint = window.scrollY;
      console.log("width ", windowWidth);

      // get searchBox area
      console.log("position Point ", positionPoint);
      const searchBox = document.getElementById("searchBox");
      if (!searchBox) {
        return;
      }
      if (positionPoint > 30) {
        searchBox.style.display = "none";
      } else {
        searchBox.style.display = "block";
      }
    });
  }

  return (
    <>
      <Navbar expand={"lg"} className="sticky-top px-4 bg-header nav-menu">
        <Container>
          <Stack direction="horizontal" gap={2}>
            <Nav.Link href="/">
              <img className="p-1 cc-logo-header" src={"/cc_logo_white.png"} />
            </Nav.Link>
            <div className="header-divider"></div>
          </Stack>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            id="toggler"
            className="order-first"
          />
          <Navbar.Collapse>
            <Nav variant="underline" className="ms-auto px-2 ">
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
          <div class="search-box" id="searchBox">
            <input type="text" className="form-control" />
            <Search className="search-bar" />
          </div>
          <LightbulbFill className="lightbulb m-3 d-none d-sm-block d-lg-block" />

          <Nav variant="underline">
            <Nav.Item>
              <OverlayTrigger
                rootClose
                trigger="click"
                placement={"bottom"}
                overlay={
                  <Popover>
                    <Popover.Header as="h3" className="text-center bg-primary">
                      Hello John!
                    </Popover.Header>
                    <Popover.Body className="py-2">
                      <Nav>
                        <Nav.Item>
                          <Nav.Link
                            className="fw-medium"
                            href="/settings/profile-settings"
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
                        <div id="profile_menu_divider"></div>
                        <Nav.Item>
                          <Nav.Link
                            className="fw-medium"
                            href="/signin"
                            id="dropdown_items"
                            style={{ color: "red" }}
                          >
                            Sign out
                          </Nav.Link>
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
        </Container>
      </Navbar>
    </>
  );
}
