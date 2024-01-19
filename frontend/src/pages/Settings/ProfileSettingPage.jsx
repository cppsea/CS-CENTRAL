import { Container, Row, Col } from "react-bootstrap";
import SettingsNavbar from "../../Components/Settings/Navbar/SettingsNavbar";
import ProfileEdit from "../../Components/Settings/Profile/ProfileEdit";


export default function ProfileSetting() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={12} lg={3}>
            <SettingsNavbar />
          </Col>

          <Col xs={12} lg={9}>
            <ProfileEdit />
          </Col>
        </Row>
      </Container>
    </>
  );
}
