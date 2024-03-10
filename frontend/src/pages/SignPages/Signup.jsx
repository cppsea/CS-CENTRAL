import { Col, Container, Row } from "react-bootstrap";
import SignupCard from "../../Components/Signin_Signup/Signup/SignupCard";
import Logo from "../../Components/Signin_Signup/Logo/Logo";
import "./SignPages.scss";
export default function Signup() {
  return (
    <>
      <Container fluid className="sign-page-container">
        <Row className="w-100 gy-5 m-0">
          <Col xs={12} sm={6} className="sign-page-logo-section m-0 ">
            <Logo />
          </Col>
          <Col xs={12} sm={6} className="m-0 sign-page-sign-section">
            <SignupCard />
          </Col>
        </Row>
      </Container>
    </>
  );
}
