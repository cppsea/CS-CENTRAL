import { Modal, Image } from "react-bootstrap";
import "./ArticleImagePreview.scss";

export default function ArticleImagePreview({ imageSrc, show, setShow }) {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      className="preview-image-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Image Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={imageSrc} fluid />
      </Modal.Body>
    </Modal>
  );
}
