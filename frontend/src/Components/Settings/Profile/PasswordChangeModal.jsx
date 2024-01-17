import { useState } from "react";

import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

export default function PasswordChangeModal({ show, onHide, className }) {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label className="mt-2 fw-medium">Old password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                className={className}
                autoFocus
              />
              <Button
                title={showPassword ? "hide password" : "show password"}
                className="bg-transparent border-start-0 border-dark edit-button-hover-light"
                onClick={handlePasswordToggle}
              >
                {showPassword ? <EyeSlashFill /> : <EyeFill />}
              </Button>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2 fw-medium">New password</Form.Label>
            <InputGroup>
              <Form.Control
                className={className}
                type={showPassword ? "text" : "password"}
              />
              <Button
                title={showPassword ? "hide password" : "show password"}
                className="bg-transparent border-start-0 border-dark edit-button-hover-light"
                onClick={handlePasswordToggle}
              >
                {showPassword ? <EyeSlashFill /> : <EyeFill />}
              </Button>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2 fw-medium">
              Confirm new password
            </Form.Label>
            <InputGroup>
              <Form.Control
                className={className}
                type={showPassword ? "text" : "password"}
              />
              <Button
                title={showPassword ? "hide password" : "show password"}
                className="bg-transparent border-start-0 border-dark edit-button-hover-light"
                onClick={handlePasswordToggle}
              >
                {showPassword ? <EyeSlashFill /> : <EyeFill />}
              </Button>
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
          onClick={onHide}
        >
          Change password
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
