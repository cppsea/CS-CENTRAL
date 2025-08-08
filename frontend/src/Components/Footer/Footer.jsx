import { Container, Stack, Row, Col, Image } from "react-bootstrap";
import { Discord, Github, Instagram } from "react-bootstrap-icons";
import "./Footer.scss";
import logo from "../../assets/logo.png";
export default function Footer() {
  return (
    <footer id="CS-Catalog-footer" className="footer p-4">
      <Container className="footer-container">
        <Row>
          <Col
            xs={{ span: 12 }}
            lg={{ span: 6 }}
            className="d-flex justify-content-center align-items-center cc-logo-footer"
          >
            <Image
              src={"/logo_white.png"}
              id="CS-Catalog-footer-logo"
              className="footer-logo"
            />
          </Col>
          <Col
            xs={{ span: 12 }}
            lg={{ span: 6 }}
            className="links-container"
          >
            <div className="social-icons-container">
              <div>
                <a className="social-link" target="_blank">
                  <Discord className="footer-social-icon" />
                  <span className="footer-social-name">Discord</span>
                </a>
              </div>
              <div>
                <a className="social-link" target="_blank">
                  <Instagram className="footer-social-icon" />
                  <span className="footer-social-name">Instagram</span>
                </a>
              </div>
              <div>
                <a
                  className="social-link"
                  href="https://github.com/cppsea/CS-Catalog"
                  target="_blank"
                >
                  <Github className="footer-social-icon" />
                  <span className="footer-social-name">Github</span>
                </a>
              </div>
            </div>
            <div className="vertical-divider"></div>
            <div className="social-icons-container">
              <div>
                <a className="more-info-link" id="footer-home-link">
                  Home
                </a>
              </div>
              <div>
                <a className="more-info-link" id="footer-feedback-link">
                  Feedback
                </a>
              </div>
              <div>
                <a className="more-info-link" id="footer-about-link">
                  About
                </a>
              </div>
              <div>
                <a className="more-info-link" id="footer-team-link">
                  Our team
                </a>
              </div>
            </div>
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
