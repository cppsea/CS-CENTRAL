import { useEffect, useState } from "react";
import { Form, Button, InputGroup, Container, Row, Col } from "react-bootstrap";
import * as auth from "../../auth/auth";
import { useLogin } from "../../../hooks/useLogin";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import "./Signin.scss";
import "../SignForm.scss";
import { useNavigate } from "react-router-dom";

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="30"
    height="30"
    viewBox="0 0 64 64"
    className="my-auto me-2"
  >
    {/* SVG content */}
  </svg>
);

export default function SigninCard() {
  const { isLoading, error, login } = useLogin();
  const navigate = useNavigate();

  const [formVal, setFormVal] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isValidated, setValidated] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormVal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMessagesList = {};
    const checkEmpty = auth.validationFunctions.checkEmpty;

    // Validation
    for (const fieldName in formVal) {
      const validateResult = checkEmpty(fieldName, formVal[fieldName]);
      if (typeof validateResult === "string") {
        errMessagesList[fieldName] = validateResult;
      }
    }

    if (Object.keys(errMessagesList).length === 0) {
      // If no errors, proceed with login
      try {
        await login(formVal.username, formVal.password);
        // navigate("/");
        // Redirect or perform other actions on successful login
      } catch (err) {
        setErrorMessages({ form: "Invalid credentials" });
      }
    } else {
      setValidated(true);
      setErrorMessages(errMessagesList);
    }
  };

  return (
    <Form
      noValidate
      validated={isValidated}
      onSubmit={handleSubmit}
      className="sign-form"
    >
      <h2 className="text-uppercase sign-page-title text-center fs-2 fw-bold">
        Login
      </h2>
      <Form.Group className="my-4">
        <Form.Control
          name="username"
          value={formVal.username}
          placeholder="Username"
          isInvalid={!!errorMessages.username}
          onChange={handleInput}
          required
          className="sign-text-input"
        />
        <Form.Control.Feedback type="invalid">
          {errorMessages.username || ""}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="my-4">
        <InputGroup hasValidation>
          <Form.Control
            name="password"
            value={formVal.password}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            isInvalid={!!errorMessages.password}
            onChange={handleInput}
            required
            className="sign-text-input"
          />
          <Button
            title={showPassword ? "hide password" : "show password"}
            className="my-auto bg-white border-white sign-password-visbility-button"
            onClick={handlePasswordToggle}
            type="button"
          >
            {showPassword ? <EyeSlashFill /> : <EyeFill />}
          </Button>
          <Form.Control.Feedback type="invalid">
            {errorMessages.password || ""}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      {errorMessages.form && (
        <p className="text-danger">{errorMessages.form}</p>
      )}
      {error && <p className="text-danger">{error}</p>}
      <div className="d-grid">
        <Button type="submit" className="py-2" disabled={isLoading}>
          <span className="text-uppercase fw-semibold text-white sign-action-text">
            {isLoading ? "Logging in..." : "Login"}
          </span>
        </Button>

        <Container fluid className="my-3">
          <Row className="sign-page-divider-container">
            <Col xs={5} className="sign-page-divider"></Col>
            <Col
              xs={2}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span className="text-black">or</span>
            </Col>
            <Col xs={5} className="sign-page-divider"></Col>
          </Row>
          <div></div>
        </Container>
        <Button className="google-sign-in-button border-0 py-2">
          <div className="d-flex justify-content-center align-items-center">
            <GoogleIcon />
            <span className="google-sign-in-button-text text-uppercase sign-action-text">
              Sign in with <span className="fw-semibold">Google</span>
            </span>
          </div>
        </Button>
        <Button className="mt-4 py-2" href="/signup">
          <span className="text-uppercase text-white sign-btn-text sign-action-text">
            Create an <span className="fw-semibold">account</span>
          </span>
        </Button>
      </div>
    </Form>
  );
}
