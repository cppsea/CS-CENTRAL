import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import { Container, Stack } from "react-bootstrap";
export default function BasePage() {
  return (
    <Container fluid className="p-0 min-vh-100">
      <Header />
      <Outlet />
    </Container>
  );
}
