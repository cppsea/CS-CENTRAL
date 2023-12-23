import { Card, Form, Button } from "react-bootstrap";
import google_logo from "../../assets/google_logo.png";

export default function Signin() {
  return (
    <div className="d-flex justify-content-center">
      <Card className="rounded-3 w-25">
        <Card.Body className="bg-signin-card rounded-3">
          <Card.Title className="text-center fs-2 fw-bold">Login</Card.Title>

          <Form>
            <Form.Group className="my-4">
              <Form.Control placeholder="Username" />
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form>

          <div className="d-grid">
            <Button className="fw-bold text-white">Login</Button>
            <p className="divider">
              <span className="text-between-divider">or</span>
            </p>
            <Button className="fw-bold text-white">
              <div className="d-flex justify-content-center">
                <img src={google_logo} className="me-1" />
                Sign in with Google
              </div>
            </Button>
            <Button className="fw-bold text-white mt-3">
              Create an account
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
