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
import { PencilFill } from "react-bootstrap-icons";

import "../Settings.scss";
import * as auth from "../../auth/auth";
import PasswordChangeModal from "./PasswordChangeModal";
import ArrowMarker from "../ArrowMarker/ArrowMarker";

export default function ProfileEdit({}) {
  const [profileData, setProfileData] = useState({
    fname: "Joe",
    lname: "",
    email: "jsmith@gmail.com",
    username: "jsmith10",
    password: "password",
  });

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

    setValidated(true);
    setErrorMessages(newErrMessages);
  };

  return (
    <Container className="my-3">
      <h2 className="settings-header">Profile</h2>
      <div className="settings-divider"></div>

      <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
        <div>
          <div className="my-3 settings-section-header-container">
            <div className="settings-arrow-marker-container">
              <ArrowMarker />
            </div>
            <h4 className="settings-section-header">General</h4>
          </div>

          <Row xs={1} sm={2} className="gy-3">
            <Col>
              <Form.Label className="fw-medium settings-section-field-header">
                First name
              </Form.Label>
              <Form.Group>
                <InputGroup hasValidation>
                  <Form.Control
                    disabled={!editable.fname}
                    name="fname"
                    value={profileData.fname}
                    placeholder="First name"
                    className={`settings-input ${
                      editable.fname
                        ? "bg-editable-input"
                        : "bg-uneditable-input"
                    }`}
                    onChange={handleInput}
                    isInvalid={errorMessages.hasOwnProperty("fname")}
                  />
                  <Button
                    title="Edit"
                    disabled={editable.fname}
                    className={`settings-edit-button ${
                      !editable.fname
                        ? "settings-edit-button-edit"
                        : "settings-edit-button-unedit"
                    }`}
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
              <Form.Label className="fw-medium settings-section-field-header">
                Last name
              </Form.Label>
              <Form.Group>
                <InputGroup hasValidation>
                  <Form.Control
                    disabled={!editable.lname}
                    name="lname"
                    value={profileData.lname}
                    placeholder="Last name"
                    className={`settings-input ${
                      editable.lname
                        ? "bg-editable-input"
                        : "bg-uneditable-input"
                    }`}
                    onChange={handleInput}
                    isInvalid={errorMessages.hasOwnProperty("lname")}
                  />
                  <Button
                    title="Edit"
                    disabled={editable.lname}
                    className={`settings-edit-button  ${
                      !editable.lname
                        ? "settings-edit-button-edit"
                        : "settings-edit-button-unedit"
                    }`}
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
              <Form.Label className="fw-medium settings-section-field-header">
                Email
              </Form.Label>
              <Form.Group>
                <InputGroup hasValidation>
                  <Form.Control
                    disabled={!editable.email}
                    name="email"
                    type="email"
                    value={profileData.email}
                    placeholder="Email"
                    className={`settings-input ${
                      editable.email
                        ? "bg-editable-input"
                        : "bg-uneditable-input"
                    }`}
                    onChange={handleInput}
                    isInvalid={errorMessages.hasOwnProperty("email")}
                  />
                  <Button
                    disabled={editable.email}
                    title="Edit"
                    className={`settings-edit-button  ${
                      !editable.email
                        ? "settings-edit-button-edit"
                        : "settings-edit-button-unedit"
                    }`}
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
          <div className="my-3 settings-section-header-container">
            <div className="settings-arrow-marker-container">
              <ArrowMarker />
            </div>
            <h4 className="settings-section-header">Login</h4>
          </div>
          <Row className="gy-3">
            <Col sm={12}>
              <Form.Label className="fw-medium settings-section-field-header">
                Username
              </Form.Label>
              <Form.Group>
                <InputGroup hasValidation>
                  <Form.Control
                    disabled={!editable.username}
                    name="username"
                    value={profileData.username}
                    className={`settings-input ${
                      editable.username
                        ? "bg-editable-input"
                        : "bg-uneditable-input"
                    }`}
                    onChange={handleInput}
                    isInvalid={errorMessages.hasOwnProperty("username")}
                  />
                  <Button
                    disabled={editable.username}
                    title="Edit"
                    className={`settings-edit-button  ${
                      !editable.username
                        ? "settings-edit-button-edit"
                        : "settings-edit-button-unedit"
                    }`}
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
              <Form.Label className="fw-medium settings-section-field-header">
                Password
              </Form.Label>
              <Form.Group>
                <InputGroup hasValidation>
                  <Form.Control
                    disabled={!editable.password}
                    name="password"
                    type="password"
                    value={profileData.password}
                    className={`settings-input ${
                      editable.password
                        ? "bg-editable-input"
                        : "bg-uneditable-input"
                    }`}
                    onChange={handleInput}
                    isInvalid={errorMessages.hasOwnProperty("password")}
                  />

                  <Button
                    disabled={editable.password}
                    title="Edit"
                    className={`settings-edit-button  ${
                      !editable.password
                        ? "settings-edit-button-edit"
                        : "settings-edit-button-unedit"
                    }`}
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
            className="mt-3 justify-content-end "
          >
            <div>
              <Button className="settings-confirm-button" type="submit">
                Save
              </Button>
            </div>
            <div>
              <Button
                className="settings-cancel-button"
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

        <PasswordChangeModal
          show={editable.password}
          onHide={() => setEditable({ ...editable, password: false })}
          className="border-0 bg-editable-input"
        />
      </Form>
    </Container>
  );
}
