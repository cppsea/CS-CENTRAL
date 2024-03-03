import { Modal, Button, ModalBody } from "react-bootstrap";

//modal for confirming if the user wants to delete selected articles
export default function ConfirmDeleteModal({
  isOpen,
  handleClose,
  submitHandler,
}) {
  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0" />
      <ModalBody>
        <h5 className="text-center">
          Are you sure you want to remove the article(s) you selected?
        </h5>
        <div className="d-flex justify-content-between mt-4">
          <Button
            className="border-0 text-dark fw-medium"
            style={{ backgroundColor: "#B9B2B2" }}
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            className="border-0 text-dark fw-medium"
            style={{ backgroundColor: "#24BEEF" }}
            type="submit"
            onClick={() => {
              handleClose();
              submitHandler();
            }}
          >
            Yes
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
}
