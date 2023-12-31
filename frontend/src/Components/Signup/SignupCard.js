import { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as auth from "../auth/auth";

export default function SignupCard() {
  const [formVal, setFormVal] = useState({
    username: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

          <Form noValidate>
            <div className="d-flex justify-content-between gap-2">
              <Form.Group className="my-4 is-invalid">
                <Form.Control
                  name="fname"
                  value={formVal.fname}
                  placeholder="First Name"
                  onChange={handleInput}
                  isInvalid={errorMessages.hasOwnProperty("fname")}
                  isValid={
                    isValidated && !errorMessages.hasOwnProperty("fname")
                  }
                />

                <Form.Control.Feedback
                  type={
                    errorMessages.hasOwnProperty("fname") ? "invalid" : "valid"
                  }
                >
                  {errorMessages.hasOwnProperty("fname")
                    ? errorMessages.fname
                    : "Looks Good"}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="my-4">
                <Form.Control
                  name="lname"
                  value={formVal.lname}
                  placeholder="Last Name"
                  onChange={handleInput}
                />
              </Form.Group>
            </div>
            <Form.Group>
              <Form.Control
                name="username"
                value={formVal.username}
                placeholder="Username"
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Control
                type="email"
                name="email"
                value={formVal.email}
                placeholder="Email"
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Control
                name="password"
                value={formVal.password}
                type="password"
                placeholder="Password"
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Control
                name="confirmPassword"
                value={formVal.confirmPassword}
                type="password"
                placeholder="Confirm Password"
                onChange={handleInput}
              />
            </Form.Group>
            <div className="d-grid">
              <Button onClick={handleSubmit} className="fw-bold text-white">
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
