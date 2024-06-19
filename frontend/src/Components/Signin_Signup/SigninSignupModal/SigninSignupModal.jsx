import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './SigninSignupModal.css'; // Import the custom CSS file

const SigninSignupModal = ({ show, handleClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    handleClose();
    navigate('/signin'); // Navigate to the sign-in page
  };

  const handleSignup = () => {
    handleClose();
    navigate('/signup'); // Navigate to the sign-up page
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="custom-modal" // Add a custom class for the modal
    >
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title id="contained-modal-title-vcenter" className="modal-title-custom">
          Log In or Sign Up
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        <h4 className="modal-body-text">To continue, please log in to your account or sign up if you don't have one yet.</h4>
      </Modal.Body>
      <Modal.Footer className="modal-footer-custom">
        <Button variant="success" onClick={handleSignup} className="btn-left btn-custom">
          Sign Up
        </Button>
        <Button variant="primary" onClick={handleLogin} className="btn-right btn-custom">
          Log In
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SigninSignupModal;

