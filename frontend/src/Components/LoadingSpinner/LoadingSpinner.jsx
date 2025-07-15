import { Spinner } from "react-bootstrap";
import "./LoadingSpinner.scss";

export default function LoadingSpinner() {
  return (
    <div className="fullscreen-spinner-container">
      <Spinner className="fullscreen-spinner" />
    </div>
  );
}
