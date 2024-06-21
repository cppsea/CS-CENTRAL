import { Container, ListGroup, Row, Col, Image } from "react-bootstrap";
import { Discord, Github, Instagram } from "react-bootstrap-icons";
import "./Footer.scss";
import cs_central_white_img from "../../assets/cs-central-white.png";
import { useTheme } from "../../hooks/useTheme";

export default function Footer() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <footer id="CS-Catalog-footer" className="footer p-4">
      <Container>
        <Row className="justify-content-center">
          {/* Logo container*/}
          <Col
            className="d-flex align-items-center justify-content-center"
            xs={{ span: 5 }}
            sm={{ span: 4 }}
            md={{ span: 3, offset: 0 }}
            lg={3}
          >
            <Image src={cs_central_white_img} className="footer-logo" fluid />
          </Col>
          {/*social media container*/}
          <Col
            className="d-flex justify-content-sm-center justify-content-end divider"
            xs={{ span: 6 }}
            sm={{ span: 4 }}
          >
            <ListGroup
              className="footer-socials-list d-flex flex-column justify-content-evenly gap-3 ps-3"
              id="footer-socials-list"
              fluid
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
          {/* More info container */}
          <Col
            className="d-flex justify-content-center"
            xs={{ span: 12 }}
            sm={{ span: 4 }}
            md={{ span: 3 }}
            lg={{ span: 2, offset: 1 }}
          >
            <ListGroup
              className="footer-more-info-links-container d-flex flex-row flex-sm-column justify-content-evenly pt-3 font-weight-bold"
              id="more-info-links-container"
            >
              <ListGroup.Item className="footer-more-info-link-container bg-transparent border-0">
                <a className="more-info-link fs-5" id="footer-home-link">
                  Home
                </a>
              </ListGroup.Item>
              <ListGroup.Item className="footer-more-info-link-container bg-transparent border-0">
                <a className="more-info-link fs-5" id="footer-feedback-link">
                  Feedback
                </a>
              </ListGroup.Item>
              <ListGroup.Item className="footer-more-info-link-container bg-transparent border-0">
                <a className="more-info-link fs-5" id="footer-about-link">
                  About
                </a>
              </ListGroup.Item>
              <ListGroup.Item className="footer-more-info-link-container bg-transparent border-0">
                <a className="more-info-link fs-5" id="footer-team-link">
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
