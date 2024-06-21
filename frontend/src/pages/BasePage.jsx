import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import { Container } from "react-bootstrap";
import Footer from "../Components/Footer/Footer";

export default function BasePage() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
