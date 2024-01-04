import { useEffect, useState } from "react";
import { Card, Form, Button, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../auth/auth";

import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

export default function SignupCard() {
  const [formVal, setFormVal] = useState({
    username: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

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

  const handleConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const isValidationPassed = () => {
    return Object.keys(errorMessages).length === 0 ? true : false;
  };

  useEffect(() => {
    // might add API endpoints to handle backend authentication here
    if (isValidated && isValidationPassed()) {
      navigate("/signin");
    }
  }, [isValidationPassed]);

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrMessages = {};
    const formValidation = auth.formValidation;

    for (const fieldName in formValidation) {
      const validationFuncs = formValidation[fieldName];

      validationFuncs.forEach((validationFunc) => {
        let validateResult = validationFunc(
          fieldName,
          formVal[fieldName],
          formVal.password
        );

        if (typeof validateResult === "string") {
          newErrMessages[fieldName] = validateResult;
        }
      });
    }

    setValidated(true);
    setErrorMessages(newErrMessages);
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="rounded-3 w-signup">
        <Card.Body className="bg-signin-card rounded-3">
          <Card.Title className="text-center fs-2 fw-bold">Sign up</Card.Title>

          <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between gap-2">
              <Form.Group className="my-4">
                <Form.Control
                  name="fname"
                  value={formVal.fname}
                  placeholder="First Name"
                  onChange={handleInput}
                  isInvalid={errorMessages.hasOwnProperty("fname")}
                  required
                />

                <Form.Control.Feedback type="invalid">
                  {errorMessages.hasOwnProperty("fname")
                    ? errorMessages.fname
                    : ""}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="my-4">
                <Form.Control
                  name="lname"
                  value={formVal.lname}
                  placeholder="Last Name"
                  onChange={handleInput}
                  isInvalid={errorMessages.hasOwnProperty("lname")}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errorMessages.hasOwnProperty("lname")
                    ? errorMessages.lname
                    : ""}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <Form.Group>
              <Form.Control
                name="username"
                value={formVal.username}
                placeholder="Username"
                onChange={handleInput}
                isInvalid={errorMessages.hasOwnProperty("username")}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errorMessages.hasOwnProperty("username")
                  ? errorMessages.username
                  : ""}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Control
                type="email"
                name="email"
                value={formVal.email}
                placeholder="Email"
                onChange={handleInput}
                isInvalid={errorMessages.hasOwnProperty("email")}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errorMessages.hasOwnProperty("email")
                  ? errorMessages.email
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
                  onChange={handleInput}
                  isInvalid={errorMessages.hasOwnProperty("password")}
                  required
                />
                <Button
                  title={showPassword ? "hide password" : "show password"}
                  className="my-auto bg-white border-white"
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
            <Form.Group className="my-4">
              <InputGroup hasValidation>
                <Form.Control
                  name="confirmPassword"
                  value={formVal.confirmPassword}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  onChange={handleInput}
                  isInvalid={errorMessages.hasOwnProperty("confirmPassword")}
                  required
                />
                <Button
                  title={
                    showConfirmPassword ? "hide password" : "show password"
                  }
                  className="my-auto bg-white border-white"
                  onClick={handleConfirmPasswordToggle}
                >
                  {showConfirmPassword ? <EyeSlashFill /> : <EyeFill />}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {errorMessages.hasOwnProperty("confirmPassword")
                    ? errorMessages.confirmPassword
                    : ""}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <div className="d-grid">
              <Button type="submit" className="fw-bold text-white">
                Register
              </Button>
            </div>
          </Form>

          <div className="text-center mt-2">
            <Link to={"/signin"} className="hyperlink">
              Already have an account? Sign in here
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
