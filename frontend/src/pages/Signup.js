import { Col, Container, Row, Stack } from "react-bootstrap";
import SignupCard from "../Components/Signup/SignupCard";
import Logo from "../Components/Signin_Signup/Logo";
export default function Signup() {
  return (
    <>
      <Stack className="sign-page-background py-5 d-flex align-items-center justify-content-center">
        <Container
          fluid
          className="d-flex align-items-center"
          style={{ maxWidth: "1000px" }}
        >
          <Row className="w-100 gy-5 m-0">
            <Col xs={12} sm={6}>
             <Logo/>
            </Col>
            <Col xs={12} sm={6}>
              <SignupCard />
            </Col>
          </Row>
        </Container>
      </Stack>
    </>
  );
}
