import { Container, Stack, ListGroup, Row, Col, Image } from "react-bootstrap";
import { Discord, Github, Instagram } from "react-bootstrap-icons";
import "./Footer.scss";
import logo from "../../assets/logo.png";
import CSCentralWhite from "../../assets/cs-central-white.png";
export default function Footer() {
  return (
    <footer id="CS-Catalog-footer" className="footer p-4">
      <Container>
        <Row className="justify-content-center">
          {/* Logo container*/}
          <Col
            className="d-flex align-items-center justify-content-center"
            xs={{ span: 6 }}
            md={{ span: 3 }}
            lg={3}
          >
            <Image
              src={logo}
              id="CS-Catalog-footer-logo"
              className="footer-logo"
              roundedCircle
            />
          </Col>
          {/*social media container*/}
          <Col
            className="d-flex justify-content-start border-end"
            xs={{ span: 6 }}
            md={{ span: 3 }}
          >
            <ListGroup
              className="footer-socials-list d-flex flex-column justify-content-evenly gap-2 ps-2"
              id="footer-socials-list"
            >
              <ListGroup.Item
                className="footer-social-container bg-transparent p-0 border-0"
                id="discord-social-container"
              >
                <a className="social-link" target="_blank">
                  <Discord className="footer-social-icon " />
                  <span className="footer-social-name ms-2">Discord</span>
                </a>
              </ListGroup.Item>
              <ListGroup.Item
                className="footer-social-container bg-transparent p-0 border-0"
                id="instagram-social-container"
              >
                <a className="social-link" target="_blank">
                  <Instagram className="footer-social-icon" />
                  <span className="footer-social-name ms-2 ">Instagram</span>
                </a>
              </ListGroup.Item>
              <ListGroup.Item
                className="footer-social-container bg-transparent p-0 d-block border-0"
                id="github-social-container"
              >
                <a
                  className="social-link"
                  href="https://github.com/cppsea/CS-Catalog"
                  target="_blank"
                >
                  <Github className="footer-social-icon large" fluid />
                  <span className="footer-social-name ms-2">Github</span>
                </a>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          {/* CS central logo container */}
          <Col
            className="d-flex justify-content-center"
            xs={{ span: 6 }}
            lg={{ span: 3, offset: 1 }}
            md={{ span: 3 }}
          >
            <Image src={CSCentralWhite} fluid />
          </Col>
          {/* More info container */}
          <Col
            className="d-flex justify-content-xs-start"
            xs={{ span: 6 }}
            md={{ span: 3 }}
            lg="auto"
          >
            <ListGroup
              className="footer-more-info-links-container d-flex flex-column justify-content-evenly "
              id="more-info-links-container"
            >
              <ListGroup.Item className="footer-more-info-link-container bg-transparent border-0">
                <a className="more-info-link" id="footer-home-link">
                  Home
                </a>
              </ListGroup.Item>
              <ListGroup.Item className="footer-more-info-link-container bg-transparent border-0">
                <a className="more-info-link" id="footer-feedback-link">
                  Feedback
                </a>
              </ListGroup.Item>
              <ListGroup.Item className="footer-more-info-link-container bg-transparent border-0">
                <a className="more-info-link" id="footer-about-link">
                  About
                </a>
              </ListGroup.Item>
              <ListGroup.Item className="footer-more-info-link-container bg-transparent border-0">
                <a className="more-info-link" id="footer-team-link">
                  Our team
                </a>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <span
        className="footer-copyright d-flex justify-content-center "
        id="CS-Catalog-copyright "
      >
        CS Catalog @ 2024 All Rights Reserved
      </span>
    </footer>
  );
}
