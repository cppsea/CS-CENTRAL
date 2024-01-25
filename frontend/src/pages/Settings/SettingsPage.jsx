import { Outlet } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import SettingsNavbar from "../../Components/Settings/Navbar/SettingsNavbar";

export default function SettingsPage() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={12} lg={3}>
            <SettingsNavbar />
          </Col>

          <Col xs={12} lg={9}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
}
