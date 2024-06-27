import { useEffect, useState } from "react";
import { Form, Button, InputGroup, Container, Row, Col } from "react-bootstrap";
import * as auth from "../../auth/auth";

import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import "./Signin.scss";
import "../SignForm.scss";
import { useLogin } from "../../../hooks/useLogin";
export default function SigninCard() {
  const { isLoading, error, login } = useLogin();

  const [formVal, setFormVal] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  //whether form has run through validation yet
  const [isValidated, setValidated] = useState(false);

  // error messages
  const [errorMessages, setErrorMessages] = useState({});

  // handle input entered
  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormVal({
      ...formVal,
      [name]: value,
    });
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const isValidationPassed = () => {
    return Object.keys(errorMessages).length === 0;
  };

  const validateInputField = () => {
    const errMessagesList = {};
    const checkEmpty = auth.validationFunctions.checkEmpty;

    // check empty for now (will add more authentication from backend soon)
    for (const fieldName in formVal) {
      let validateResult = checkEmpty(fieldName, formVal[fieldName]);

      if (typeof validateResult === "string") {
        errMessagesList[fieldName] = validateResult;
      }
    }

    setValidated(true);
    setErrorMessages(errMessagesList);
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    validateInputField();
  };

  useEffect(() => {
    const handleSignin = async () => {
      if (isValidated && isValidationPassed()) {
        try {
          await login(formVal.username, formVal.password);
          navigate("/");
        } catch (error) {
          toast.error(error.message);
        }
      }
    };

    handleSignin();
  }, [errorMessages]);

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
          isInvalid={errorMessages.hasOwnProperty("username")}
          onChange={handleInput}
          required
          className="sign-text-input"
        />
        <Form.Control.Feedback type="invalid">
          {errorMessages.hasOwnProperty("username")
            ? errorMessages.username
            : ""}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="my-4">
        <InputGroup hasValidation>
          <Form.Control
            name="password"
            value={formVal.password}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            isInvalid={errorMessages.hasOwnProperty("password")}
            onChange={handleInput}
            required
            className="sign-text-input"
          />
          <Button
            title={showPassword ? "hide password" : "show password"}
            className="my-auto bg-white border-white sign-password-visbility-button"
            onClick={handlePasswordToggle}
          >
            {showPassword ? <EyeSlashFill /> : <EyeFill />}
          </Button>
          <Form.Control.Feedback type="invalid">
            {errorMessages.hasOwnProperty("password")
              ? errorMessages.password
              : ""}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <div className="d-grid">
        <Button type="submit" className="py-2">
          <span className="text-uppercase fw-semibold text-white sign-action-text">
            Login
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
    <ellipse cx="32" cy="60.999" opacity=".3" rx="19" ry="3"></ellipse>
    <path
      fill="#fd3c4f"
      d="M32,18.2c2.3,0,4.464,0.568,6.369,1.566c1.817,0.952,4.025,0.692,5.476-0.759	c2.174-2.173,1.656-5.853-1.056-7.305C39.574,9.98,35.903,9,32,9c-8.825,0-16.482,4.977-20.339,12.275l7.592,5.435	C21.33,21.714,26.252,18.2,32,18.2z"
    ></path>
    <path
      fill="#ffce29"
      d="M19.009,36.627C18.494,35.178,18.2,33.626,18.2,32c0-1.875,0.377-3.659,1.053-5.29l-7.592-5.435	C9.968,24.479,9,28.125,9,32c0,3.777,0.927,7.33,2.539,10.474l0.003-0.002c0,0,0,0,0,0L19.009,36.627z"
    ></path>
    <path
      fill="#98c900"
      d="M32,45.8c-5.996,0-11.084-3.832-12.988-9.175l-0.002,0.002c0,0,0,0,0,0l-7.468,5.845	C15.353,49.903,23.074,55,32,55c5.932,0,11.321-2.263,15.398-5.95l-7.155-6.012C37.943,44.763,35.098,45.8,32,45.8z"
    ></path>
    <polygon
      fill="#68e5fd"
      points="19.009,36.627 11.542,42.472 11.542,42.472 19.01,36.628"
    ></polygon>
    <path
      fill="#9c34c2"
      d="M54.985,31.244c-0.085-2.176-1.841-3.913-4.019-3.904L36.6,27.4c-2.542,0-4.6,2.059-4.6,4.6	s2.058,4.6,4.6,4.6h8.397c-0.918,2.592-2.597,4.818-4.754,6.438l7.155,6.012C52.056,44.841,55,38.771,55,32	C55,31.751,54.995,31.499,54.985,31.244z"
    ></path>
    <path
      fill="#fff"
      d="M32,14c2.574,0,4.668-1.952,4.945-4.452C35.352,9.196,33.7,9,32,9 c-8.825,0-16.482,4.977-20.339,12.275c-0.773,1.463-1.386,3.021-1.833,4.648c0.596,0.236,1.216,0.353,1.83,0.353 c1.794,0,3.527-0.968,4.425-2.665C19.215,17.683,25.314,14,32,14z"
      opacity=".3"
    ></path>
    <path
      d="M54.985,31.244c-0.063-1.612-1.046-2.979-2.435-3.578C51.034,28.526,50,30.134,50,32 c0,5.058-2.17,9.92-5.955,13.341C40.722,48.345,36.444,50,32,50c-2.578,0-4.675,1.958-4.946,4.463C28.647,54.813,30.301,55,32,55 c5.932,0,11.321-2.263,15.398-5.95C52.056,44.841,55,38.771,55,32C55,31.751,54.995,31.499,54.985,31.244z"
      opacity=".15"
    ></path>
    <path
      fill="none"
      stroke="#fff"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-miterlimit="10"
      stroke-width="3"
      d="M19.481,17.051c1.15-0.965,2.406-1.793,3.742-2.467s2.753-1.195,4.224-1.548"
    ></path>
  </svg>
);
