import { Modal, Button, ModalBody } from "react-bootstrap";

//modal for confirming if the user wants to delete selected articles
export default function ConfirmDeleteModal({
  isOpen,
  handleClose,
  submitHandler,
}) {
  return (
    <Modal show={isOpen} onHide={handleClose} centered >
      <Modal.Header closeButton className="settings-articles-bookmark-modal border-0" />
      <ModalBody className="settings-articles-bookmark-modal">
        <h5 className="text-center">
          Are you sure you want to remove the article(s) you selected?
        </h5>
        <div className="d-flex justify-content-between mt-4">
          <Button
            className="settings-cancel-button"
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            className="settings-confirm-button"
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
