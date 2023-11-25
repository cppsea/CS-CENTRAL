import logo from "../assets/logo.png";
import {
  Nav,
  Navbar,
  Image,
  Stack,
  NavDropdown,
  Badge,
  Offcanvas,
} from "react-bootstrap";
import SearchBar from "./SearchBar";
import { useState } from "react";

export default function Header() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Stack gap={3}>
        <div>
          <Navbar expand="lg" fixed="top" className="sticky-top" bg="primary">
            <Stack direction="horizontal" gap={2}>
              <Nav.Link href="/">
                <Image className="p-1" src={logo} roundedCircle width={65} />
              </Nav.Link>
              <Navbar.Brand
                className="fs-2 fw-medium text-white"
                href="/"
                style={{ fontFamily: "Roboto" }}
              >
                CS Catalog
              </Navbar.Brand>
            </Stack>
            <Stack style={{ justifyContent: "center" }} className="px-2">
              <SearchBar />
            </Stack>
            <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav variant="underline" className="ms-auto px-2">
                <Nav.Item>
                  <Nav.Link
                    className="text-light fw-medium fs-6"
                    onClick={handleShow}
                  >
                    Notifications <Badge bg="secondary">8</Badge>
                  </Nav.Link>
                  <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title>Notifications</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      You can check out notifications here
                    </Offcanvas.Body>
                  </Offcanvas>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className="text-light fw-medium fs-6"
                    href="/article_search_results"
                  >
                    Article Catalog
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <NavDropdown
                    className="text-light fw-semibold fs-6"
                    title="Joe Smith"
                    align={{ lg: "end" }}
                  >
                    <NavDropdown.Item>My Profile</NavDropdown.Item>
                    <NavDropdown.Item>Saved Articles</NavDropdown.Item>
                    <NavDropdown.Item>Settings</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>Sign Out</NavDropdown.Item>
                  </NavDropdown>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </Stack>
    </>
  );
}
