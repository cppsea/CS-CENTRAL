import { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SignupCard() {
  const [formVal, setFormVal] = useState({
    username: "",
    password: "",
    confirmPass: "",
  });

  // flags
  const [isEmpty, setIsEmpty] = useState(false);
  const [isNotMatched, setIsNotMatched] = useState(false);

  // functions for validating input fields (add more if possible)
  const validationFunctions = {
    checkEmpty: () => {
      formVal.username.length > 0 &&
      formVal.password.length > 0 &&
      formVal.confirmPass.length > 0
        ? setIsEmpty(false)
        : setIsEmpty(true);
    },
    checkPasswordMatch: () => {
      formVal.password !== formVal.confirmPass &&
      formVal.password.length !== 0 &&
      formVal.confirmPass.length !== 0
        ? setIsNotMatched(true)
        : setIsNotMatched(false);
    },
  };

  // an object containing input fields (keys)
  // and their associated validation funciton (values as an array)
  const formValidation = {
    username: [validationFunctions.checkEmpty],
    password: [validationFunctions.checkEmpty],
    confirmPass: [
      validationFunctions.checkEmpty,
      validationFunctions.checkPasswordMatch,
    ],
  };

  // handle input entered
  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormVal({
      ...formVal,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const fieldName in formValidation) {
      const validationFuncs = formValidation[fieldName];
      console.log(fieldName);
      validationFuncs.forEach((validationFunc) => validationFunc());
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="rounded-3 w-signup">
        <Card.Body className="bg-signin-card rounded-3">
          <Card.Title className="text-center fs-2 fw-bold">Sign up</Card.Title>
          {isEmpty && (
            <Alert dismissible variant="warning" className="my-auto mt-4">
              &#9888; Fields should not be empty
            </Alert>
          )}
          {isNotMatched && (
            <Alert dismissible variant="warning" className="my-auto mt-4">
              &#9888; Confirmed password failed to match
            </Alert>
          )}

          <Form>
            <div className="d-flex justify-content-between gap-2">
              <Form.Group className="my-4">
                <Form.Control name="fname" placeholder="First Name" />
              </Form.Group>
              <Form.Group className="my-4">
                <Form.Control name="lname" placeholder="Last Name" />
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
              <Form.Control type="email" placeholder="Email" />
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
                name="confirmPass"
                value={formVal.confirmPass}
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
            <Link to={"/signin"} className="text-dark">
              Already have an account? Sign in here
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
