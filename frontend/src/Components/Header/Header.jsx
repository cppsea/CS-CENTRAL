import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.jpg";

import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Image,
  InputGroup,
  Form,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { Search, LightbulbFill } from "react-bootstrap-icons";

import "./Header.scss";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";

export default function Header() {
  const [isCollapse, setIsCollapse] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleMenu = (value) => {
    const hiddenElements = document.getElementsByClassName("toggle-hidden");
    if (!hiddenElements) {
      return;
    }
    Array.from(hiddenElements).forEach((element) => {
      element.style.display = value ? "block" : "none";
    });
    setIsCollapse(!value);
  };
  return (
    <>
      <Navbar collapseOnSelect expand="md" className="header-menu">
        <Container>
          {/* logo */}
          <Navbar.Brand className="logo-area toggle-hidden" href="#home">
            <Image src={logo} width={70} />
          </Navbar.Brand>
          {/* Nav */}
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => toggleMenu(isCollapse)}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="w-100 d-flex">
              <div className="divider"></div>
              <Nav.Link href="#machine-learning">MACHINE LEARNING</Nav.Link>
              <Nav.Link href="#data-science">DATA SCIENCE</Nav.Link>
              <NavDropdown title="MORE" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">OPTION 1</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">OPTION 2</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">OPTION 3</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <InputGroup className="search-box">
                <Form.Control
                  placeholder="Search..."
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Text id="basic-addon2">
                  <Search />
                </InputGroup.Text>
              </InputGroup>
            </Nav>
            <Nav className="toggle-hidden">
              <Nav.Link href="#light-bulb" onClick={toggleTheme}>
                <LightbulbFill
                  size={40}
                  className={`${isDarkMode ? "text-black" : "text-white"} `}
                />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {/* avatar */}
          <Navbar.Brand className="toggle-hidden">
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
                <Image src={avatar} roundedCircle width={50} />
              </Button>
            </OverlayTrigger>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}
