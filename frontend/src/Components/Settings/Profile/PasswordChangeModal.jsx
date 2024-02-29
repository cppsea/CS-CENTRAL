import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import * as auth from "../../auth/auth";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import "../Settings.scss";
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
    confirmNewPasswordCheckbox: false,
  });

  // handle input entered
  const handleInput = (e) => {
    let { name, value } = e.target;

    //if it is checkbox, set value to check prop
    if (name === "confirmNewPasswordCheckbox") {
      value = e.target.checked;
    }

    setPasswordData({
      ...passwordData,
      [name]: value,
    });
    console.log(passwordData);
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
        fieldName === "confirmNewPassword" ||
        fieldName === "confirmNewPasswordCheckbox"
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
    if (Object.keys(newErrMessages).length === 0) {
      setValidated(true);
    }
    setErrorMessages(newErrMessages);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bolder">Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={isValidated}>
          <Form.Group className="mt-2">
            {/* <Form.Label className="mt-2 fw-medium">Old password</Form.Label> */}
            <InputGroup>
              <Form.Control
                name="oldPassword"
                type={showPassword.oldPassword ? "text" : "password"}
                className={className}
                isInvalid={errorMessages.hasOwnProperty("oldPassword")}
                autoFocus
                onChange={handleInput}
                placeholder="Enter Your Old Password"
              />
              <Button
                title={
                  showPassword.oldPassword ? "hide password" : "show password"
                }
                className="password-edit-button"
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
          <Form.Group className="mt-4">
            {/* <Form.Label className="mt-2 fw-medium">New password</Form.Label> */}
            <InputGroup>
              <Form.Control
                name="newPassword"
                type={showPassword.newPassword ? "text" : "password"}
                className={className}
                isInvalid={errorMessages.hasOwnProperty("newPassword")}
                onChange={handleInput}
                placeholder="Enter your new password"
              />
              <Button
                title={
                  showPassword.newPassword ? "hide password" : "show password"
                }
                className="password-edit-button"
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
          <Form.Group className="mt-4">
            {/* <Form.Label className="mt-2 fw-medium">
              Confirm new password
            </Form.Label> */}
            <InputGroup>
              <Form.Control
                className={className}
                name="confirmNewPassword"
                type={showPassword.confirmNewPassword ? "text" : "password"}
                isInvalid={errorMessages.hasOwnProperty("confirmNewPassword")}
                onChange={handleInput}
                placeholder="Confirm your new password"
              />
              <Button
                title={
                  showPassword.confirmNewPassword
                    ? "hide password"
                    : "show password"
                }
                className="password-edit-button"
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
          <Form.Group className="mt-4">
            <Form.Check
              type={"checkbox"}
              isInvalid={errorMessages.hasOwnProperty(
                "confirmNewPasswordCheckbox"
              )}
            >
              <Form.Check.Input
                type={"checkbox"}
                className="password-checkbox"
                onChange={handleInput}
                name="confirmNewPasswordCheckbox"
                value={passwordData.confirmNewPasswordCheckbox}
                isInvalid={errorMessages.hasOwnProperty(
                  "confirmNewPasswordCheckbox"
                )}
              />
              <Form.Check.Label
                className="password-checkbox-label"
                isInvalid={errorMessages.hasOwnProperty(
                  "confirmNewPasswordCheckbox"
                )}
              >
                Confirm Password Change
              </Form.Check.Label>
              <Form.Control.Feedback type="invalid">
                {errorMessages.hasOwnProperty("confirmNewPasswordCheckbox")
                  ? errorMessages.confirmNewPasswordCheckbox
                  : ""}
              </Form.Control.Feedback>
            </Form.Check>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button className="settings-cancel-button fw-medium" onClick={onHide}>
          Cancel
        </Button>
        <Button
          className="settings-confirm-button"
          type="submit"
          onClick={handleSubmit}
        >
          Change password
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
