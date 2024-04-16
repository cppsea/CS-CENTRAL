import { Container, Stack, Row, Col, Image } from "react-bootstrap";
import { Discord, Github, Instagram } from "react-bootstrap-icons";
import "./Footer.scss";
import logo from "../../assets/logo.png";
export default function Footer() {
  return (
    <footer id="CS-Catalog-footer" className="footer p-4">
      <Container fluid style={{ maxWidth: "1000px" }}>
        <Row>
          <Col
            xs={{ span: 12 }}
            lg={{ span: 6 }}
            className="d-flex justify-content-center justify-content-lg-start align-items-center p-0"
          >
            <Image
              src={logo}
              id="CS-Catalog-footer-logo"
              className="footer-logo"
              roundedCircle
            />
            <ul
              className="footer-socials-list d-flex flex-column align-self-stretch justify-content-evenly m-0"
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
          <Col
            xs={{ span: 12 }}
            lg={{ span: 6 }}
            className="d-flex justify-content-center justify-content-lg-start align-items-center p-0"
          >
            <h5
              className="footer-title flex-column d-flex"
              id="CS-Catalog-footer-title"
            >
              <span>CS</span> <span>CENTRAL</span>
            </h5>
            <ul
              className="footer-more-info-links-container d-flex flex-column align-self-stretch justify-content-evenly m-0"
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
