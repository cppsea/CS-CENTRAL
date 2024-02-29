import { Outlet } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import SettingsNavbar from "../../Components/Settings/Navbar/SettingsNavbar";

import "./SettingsPage.scss";
export default function SettingsPage() {
  return (
    <>
      <Container fluid className="settings-page flex-grow-1 d-flex">
        <Row className="flex-grow-1 d-flex">
          <Col
            xs={12}
            lg={3}
            className="px-0 settings-navbar-column flex-grow-1"
          >
            <SettingsNavbar />
          </Col>

          <Col xs={12} lg={9} className="h-100">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
}
