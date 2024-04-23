import { Container, Stack, Row, Col, Image } from "react-bootstrap";
import { Discord, Github, Instagram } from "react-bootstrap-icons";
import "./Footer.scss";
import logo from "../../assets/logo.png";
import CSCentralWhite from "../../assets/cs-central-white.png";
export default function Footer() {
  return (
    <footer id="CS-Catalog-footer" className="footer p-4">
      <Container fluid style={{ maxWidth: "1000px" }}>
        <Row>
          <Col
            className="d-flex align-items-center justify-content-center"
            xs
            md={3}
          >
            <Image
              src={logo}
              id="CS-Catalog-footer-logo"
              className="footer-logo"
              roundedCircle
              fluid
            />
          </Col>
          <Col className="d-flex">
            <ul
              className="footer-socials-list d-flex flex-column justify-content-evenly m-0"
              id="footer-socials-list"
            >
              <li
                className="footer-social-container"
                id="discord-social-container"
              >
                <a className="social-link" target="_blank">
                  <Discord className="footer-social-icon" />
                  <span className="footer-social-name">Discord</span>
                </a>
              </li>
              <li
                className="footer-social-container"
                id="instagram-social-container"
              >
                <a className="social-link" target="_blank">
                  <Instagram className="footer-social-icon" />
                  <span className="footer-social-name">Instagram</span>
                </a>
              </li>
              <li
                className="footer-social-container"
                id="github-social-container"
              >
                <a
                  className="social-link"
                  href="https://github.com/cppsea/CS-Catalog"
                  target="_blank"
                >
                  <Github className="footer-social-icon" />
                  <span className="footer-social-name">Github</span>
                </a>
              </li>
            </ul>
          </Col>
          <Col md="auto" className="vertical-divider"></Col>
          <Col className="d-flex justify-content-center" xs md={3}>
            <Image src={CSCentralWhite} fluid />
          </Col>
          <Col className="d-flex justify-content-left">
            <ul
              className="footer-more-info-links-container d-flex flex-column justify-content-evenly m-0"
              id="more-info-links-container"
            >
              <li className="footer-more-info-link-container">
                <a className="more-info-link" id="footer-home-link">
                  Home
                </a>
              </li>
              <li className="footer-more-info-link-container">
                <a className="more-info-link" id="footer-feedback-link">
                  Feedback
                </a>
              </li>
              <li className="footer-more-info-link-container">
                <a className="more-info-link" id="footer-about-link">
                  About
                </a>
              </li>
              <li className="footer-more-info-link-container">
                <a className="more-info-link" id="footer-team-link">
                  Our team
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <Row className="">
        <span
          className="footer-copyright d-flex justify-content-center"
          id="CS-Catalog-copyright"
        >
          CS Catalog @ 2024 All Rights Reserved
        </span>
      </Row>
    </footer>
  );
}
