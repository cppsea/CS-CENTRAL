import { useState } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  InputGroup,
  Button,
  Stack,
} from "react-bootstrap";
import { PencilFill, EyeSlashFill, EyeFill } from "react-bootstrap-icons";

import "./ProfileEdit.scss";
import * as auth from "../../auth/auth";

export default function ProfileEdit() {
  const [profileData, setProfileData] = useState({
    fname: "Joe",
    lname: "Smith",
    email: "jsmith@gmail.com",
    username: "jsmith10",
    password: "password",
  });

  const [showPassword, setShowPassword] = useState(false);

  // keep track of chnanges
  const [isDataChanged, setIsDataChanged] = useState(false);

  //whether form has run through validation yet
  const [isValidated, setValidated] = useState(false);

  // error messages
  const [errorMessages, setErrorMessages] = useState({});

  const [editable, setEditable] = useState({
    fname: false,
    lname: false,
    email: false,
    username: false,
    password: false,
  });

  // handle input entered
  const handleInput = (e) => {
    const { name, value } = e.target;

    setIsDataChanged(true);
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrMessages = {};
    const formValidation = auth.formValidation;

    for (const fieldName in formValidation) {
      const validationFuncs = formValidation[fieldName];

      validationFuncs.forEach((validationFunc) => {
        let validateResult = validationFunc(fieldName, profileData[fieldName]);

        if (typeof validateResult === "string") {
          newErrMessages[fieldName] = validateResult;
        }
      });
    }

    console.log(errorMessages);
    setValidated(true);
    setErrorMessages(newErrMessages);
  };

  return (
    <Container className="my-3">
      <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
        <div>
          <h4 className="ps-2 py-1 border-start border-4 border-primary">
            General
          </h4>

          <Row xs={1} sm={2} className="gy-3">
            <Col>
              <Form.Label className="fw-medium">First name</Form.Label>
              <Form.Group>
                <InputGroup>
                  <Form.Control
                    disabled={!editable.fname}
                    name="fname"
                    value={profileData.fname}
                    placeholder="First name"
                    className="border border-dark border-end-0"
                    style={{
                      backgroundColor: editable.fname ? "#2D2626" : "#E9ECEF",
                      color: editable.fname ? "white" : "gray",
                    }}
                    onChange={handleInput}
                    isInvalid={errorMessages.hasOwnProperty("fname")}
                  />
                  <Button
                    title="Edit"
                    disabled={editable.fname}
                    className="bg-transparent border-start-0 border-dark edit-button-hover-light"
                    style={{ color: editable.fname ? "gray" : "black" }}
                    onClick={() => setEditable({ ...editable, fname: true })}
                  >
                    <PencilFill />
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errorMessages.hasOwnProperty("fname")
                      ? errorMessages.fname
                      : ""}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Label className="fw-medium">Last name</Form.Label>
              <Form.Group>
                <InputGroup>
                  <Form.Control
                    disabled={!editable.lname}
                    name="lname"
                    value={profileData.lname}
                    placeholder="Last name"
                    className="border border-dark border-end-0"
                    style={{
                      backgroundColor: editable.lname ? "#2D2626" : "#E9ECEF",
                      color: editable.lname ? "white" : "gray",
                    }}
                    onChange={handleInput}
                    isInvalid={errorMessages.hasOwnProperty("lname")}
                  />
                  <Button
                    title="Edit"
                    disabled={editable.lname}
                    className="bg-transparent border-start-0 border-dark edit-button-hover-light"
                    style={{ color: editable.lname ? "gray" : "black" }}
                    onClick={() => setEditable({ ...editable, lname: true })}
                  >
                    <PencilFill />
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errorMessages.hasOwnProperty("lname")
                      ? errorMessages.lname
                      : ""}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Label className="fw-medium">Email</Form.Label>
              <Form.Group>
                <InputGroup>
                  <Form.Control
                    disabled={!editable.email}
                    name="email"
                    type="email"
                    value={profileData.email}
                    placeholder="Email"
                    className="border border-dark border-end-0"
                    style={{
                      backgroundColor: editable.email ? "#2D2626" : "#E9ECEF",
                      color: editable.email ? "white" : "gray",
                    }}
                    onChange={handleInput}
                    isInvalid={errorMessages.hasOwnProperty("email")}
                  />
                  <Button
                    disabled={editable.email}
                    title="Edit"
                    className="bg-transparent border-start-0 border-dark edit-button-hover-light"
                    style={{ color: editable.email ? "gray" : "black" }}
                    onClick={() => setEditable({ ...editable, email: true })}
                  >
                    <PencilFill />
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errorMessages.hasOwnProperty("email")
                      ? errorMessages.email
                      : ""}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </div>
        <div>
          <h4 className="ps-2 py-1 mt-3 border-start border-4 border-primary">
            Login
          </h4>
          <Row className="gy-3">
            <Col sm={12}>
              <Form.Label className="fw-medium">Username</Form.Label>
              <Form.Group>
                <InputGroup>
                  <Form.Control
                    disabled={!editable.username}
                    name="username"
                    value={profileData.username}
                    className="border border-dark border-end-0"
                    style={{
                      backgroundColor: editable.username
                        ? "#2D2626"
                        : "#E9ECEF",
                      color: editable.username ? "white" : "gray",
                    }}
                    onChange={handleInput}
                    isInvalid={errorMessages.hasOwnProperty("username")}
                  />
                  <Button
                    disabled={editable.username}
                    title="Edit"
                    className="bg-transparent border-start-0 border-dark edit-button-hover-light"
                    style={{ color: editable.username ? "gray" : "black" }}
                    onClick={() => setEditable({ ...editable, username: true })}
                  >
                    <PencilFill />
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errorMessages.hasOwnProperty("username")
                      ? errorMessages.username
                      : ""}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Label className="fw-medium">Password</Form.Label>
              <Form.Group>
                <InputGroup>
                  <Form.Control
                    disabled={!editable.password}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={profileData.password}
                    className="border border-dark border-end-0"
                    style={{
                      backgroundColor: editable.password
                        ? "#2D2626"
                        : "#E9ECEF",
                      color: editable.password ? "white" : "gray",
                    }}
                    onChange={handleInput}
                    isInvalid={errorMessages.hasOwnProperty("password")}
                  />
                  <Button
                    disabled={!editable.password}
                    title={showPassword ? "hide password" : "show password"}
                    className="bg-transparent border-start-0 border-dark edit-button-hover-light"
                    onClick={handlePasswordToggle}
                  >
                    {showPassword ? <EyeSlashFill /> : <EyeFill />}
                  </Button>
                  <Button
                    disabled={editable.password}
                    title="Edit"
                    className="bg-transparent border-start-0 border-dark edit-button-hover-light"
                    style={{ color: editable.password ? "gray" : "black" }}
                    onClick={() => setEditable({ ...editable, password: true })}
                  >
                    <PencilFill />
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errorMessages.hasOwnProperty("password")
                      ? errorMessages.password
                      : ""}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </div>

        {isDataChanged && (
          <Stack
            direction="horizontal"
            gap={3}
            className="mt-3 justify-content-end"
          >
            <div>
              <Button
                className="border-0 text-dark fw-medium"
                style={{ backgroundColor: "#24BEEF" }}
                type="submit"
              >
                Save
              </Button>
            </div>
            <div>
              <Button
                className="border-0 text-dark fw-medium"
                style={{ backgroundColor: "#B9B2B2" }}
                onClick={() => {
                  setIsDataChanged(false);
                  window.location.reload();
                }}
              >
                Cancel
              </Button>
            </div>
          </Stack>
        )}
      </Form>
    </Container>
  );
}
