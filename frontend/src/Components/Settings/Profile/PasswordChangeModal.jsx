import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import * as auth from "../../auth/auth";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import '../Settings.scss'
export default function PasswordChangeModal({ show, onHide, className }) {
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // handle input entered
  const handleInput = (e) => {
    const { name, value } = e.target;

    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  //whether form has run through validation yet
  const [isValidated, setValidated] = useState(false);

  // error messages
  const [errorMessages, setErrorMessages] = useState({});

  const isValidationPassed = () => {
    return Object.keys(errorMessages).length === 0 ? true : false;
  };

  useEffect(() => {
    // might add API endpoints to handle backend authentication here
    if (isValidated && isValidationPassed()) {
      window.location.reload();
    }
  }, [isValidationPassed]);

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrMessages = {};
    const formValidation = auth.formValidation;

    for (const fieldName in formValidation) {
      if (
        fieldName === "oldPassword" ||
        fieldName === "newPassword" ||
        fieldName === "confirmNewPassword"
      ) {
        const validationFuncs = formValidation[fieldName];

        validationFuncs.forEach((validationFunc) => {
          let validateResult = validationFunc(
            fieldName,
            passwordData[fieldName],
            passwordData.newPassword
          );

          if (typeof validateResult === "string") {
            newErrMessages[fieldName] = validateResult;
          }
        });
      }
    }

    console.log(errorMessages);
    setValidated(true);
    setErrorMessages(newErrMessages);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={isValidated}>
          <Form.Group>
            <Form.Label className="mt-2 fw-medium">Old password</Form.Label>
            <InputGroup>
              <Form.Control
                name="oldPassword"
                type={showPassword.oldPassword ? "text" : "password"}
                className={className}
                isInvalid={errorMessages.hasOwnProperty("oldPassword")}
                autoFocus
                onChange={handleInput}
              />
              <Button
                title={
                  showPassword.oldPassword ? "hide password" : "show password"
                }
                className="bg-transparent border-start-0 border-dark edit-button-hover-light"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    oldPassword: !showPassword.oldPassword,
                  })
                }
              >
                {showPassword.oldPassword ? <EyeSlashFill /> : <EyeFill />}
              </Button>
              <Form.Control.Feedback type="invalid">
                {errorMessages.hasOwnProperty("oldPassword")
                  ? errorMessages.oldPassword
                  : ""}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2 fw-medium">New password</Form.Label>
            <InputGroup>
              <Form.Control
                name="newPassword"
                type={showPassword.newPassword ? "text" : "password"}
                className={className}
                isInvalid={errorMessages.hasOwnProperty("newPassword")}
                onChange={handleInput}
              />
              <Button
                title={
                  showPassword.newPassword ? "hide password" : "show password"
                }
                className="bg-transparent border-start-0 border-dark edit-button-hover-light"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    newPassword: !showPassword.newPassword,
                  })
                }
              >
                {showPassword.newPassword ? <EyeSlashFill /> : <EyeFill />}
              </Button>
              <Form.Control.Feedback type="invalid">
                {errorMessages.hasOwnProperty("newPassword")
                  ? errorMessages.newPassword
                  : ""}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2 fw-medium">
              Confirm new password
            </Form.Label>
            <InputGroup>
              <Form.Control
                className={className}
                name="confirmNewPassword"
                type={showPassword.confirmNewPassword ? "text" : "password"}
                isInvalid={errorMessages.hasOwnProperty("confirmNewPassword")}
                onChange={handleInput}
              />
              <Button
                title={
                  showPassword.confirmNewPassword
                    ? "hide password"
                    : "show password"
                }
                className="bg-transparent border-start-0 border-dark edit-button-hover-light"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    confirmNewPassword: !showPassword.confirmNewPassword,
                  })
                }
              >
                {showPassword.confirmNewPassword ? (
                  <EyeSlashFill />
                ) : (
                  <EyeFill />
                )}
              </Button>
              <Form.Control.Feedback type="invalid">
                {errorMessages.hasOwnProperty("confirmNewPassword")
                  ? errorMessages.confirmNewPassword
                  : ""}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="border-0 text-dark fw-medium"
          style={{ backgroundColor: "#B9B2B2" }}
          onClick={onHide}
        >
          Cancel
        </Button>
        <Button
          className="border-0 text-dark fw-medium"
          style={{ backgroundColor: "#24BEEF" }}
          type="submit"
          onClick={handleSubmit}
        >
          Change password
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
