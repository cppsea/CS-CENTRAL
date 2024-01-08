import { Col, Container, Row, Stack } from "react-bootstrap";
import SigninCard from "../Components/Signin/SigninCard";
import Logo from "../Components/Signin_Signup/Logo";
export default function Signin() {
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
              <Logo />
            </Col>
            <Col xs={12} sm={6}>
              <SigninCard />
            </Col>
          </Row>
        </Container>
      </Stack>
    </>
  );
}
