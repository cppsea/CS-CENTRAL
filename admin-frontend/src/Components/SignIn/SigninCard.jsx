import { useState } from "react";
import {
  Form,
  Button,
  InputGroup,
  Container,
  Row,
  Col,
  Stack,
  Card,
} from "react-bootstrap";
import * as auth from "../auth/auth";
import { useLogin } from "../../hooks/useLogin";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

export default function SigninCard() {
  const [formVal, setFormVal] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isValidated, setValidated] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const { login, isLoading, error } = useLogin();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormVal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errMessagesList = {};
    const checkEmpty = auth.validationFunctions.checkEmpty;

    // Validation
    for (const fieldName in formVal) {
      const validateResult = checkEmpty(fieldName, formVal[fieldName]);
      if (typeof validateResult === "string") {
        errMessagesList[fieldName] = validateResult;
      }
    }
    setErrorMessages(errMessagesList);

    if (Object.keys(errMessagesList).length === 0) {
      // If no errors, proceed with login
      try {
        await login({ username: formVal.username, password: formVal.password });
        // Redirect or perform other actions on successful login
      } catch (err) {
        setErrorMessages({ form: "Invalid credentials" });
      }
    } else {
      setValidated(true);
    }
  };

  return (
    <Container
      className="p-0"
      style={{ maxWidth: "800px", marginTop: "150px", marginBottom: "150px" }}
    >
      <Stack>
        <Card className="my-4 p-4 border-0 item-card">
          <Form
            noValidate
            validated={isValidated}
            onSubmit={handleSubmit}
            className="sign-form"
          >
            <h2 className="text-uppercase text-center fs-2 fw-bold">Login</h2>
            <Form.Group className="my-4">
              <Form.Control
                name="username"
                value={formVal.username}
                placeholder="Username"
                isInvalid={!!errorMessages.username}
                onChange={handleInput}
                required
                className="sign-text-input"
              />
              <Form.Control.Feedback type="invalid">
                {errorMessages.username || ""}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="my-4">
              <InputGroup hasValidation>
                <Form.Control
                  name="password"
                  value={formVal.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  isInvalid={!!errorMessages.password}
                  onChange={handleInput}
                  required
                  className="sign-text-input"
                />
                <Button
                  title={showPassword ? "hide password" : "show password"}
                  className="my-auto bg-white border-white "
                  onClick={handlePasswordToggle}
                  type="button"
                >
                  {showPassword ? <EyeSlashFill /> : <EyeFill />}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {errorMessages.password || ""}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            {errorMessages.form && (
              <p className="text-danger">{errorMessages.form}</p>
            )}
            {error && <p className="text-danger">{error}</p>}
            <div className="d-grid">
              <Button type="submit" className="py-2" disabled={isLoading}>
                <span className="text-uppercase fw-semibold text-white sign-action-text">
                  {isLoading ? "Logging in..." : "Login"}
                </span>
              </Button>
            </div>
          </Form>
        </Card>
      </Stack>
    </Container>
  );
}
