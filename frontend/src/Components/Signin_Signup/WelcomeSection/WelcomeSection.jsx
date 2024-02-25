import { Button, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./WelcomeSection.scss";
export default function WelcomeSection() {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="sign-welcome-message welcome-text fw-light">
        Welcome to
        <span className="sign-website-name catalog-text">
          <span className="cs-text">CS</span>Catalog
        </span>
      </h2>
      <Stack gap={3}>
        <Button className="p-2" onClick={() => navigate("/")}>
          <span className="text-white text-uppercase welcome-btn-text">
            Browse as <span className="fw-semibold">guest</span>
          </span>
        </Button>
        <Button className="p-2" onClick={() => navigate("/signin")}>
          <span className="text-white text-uppercase welcome-btn-text">
            Login with my <span className="fw-semibold">account</span>
          </span>
        </Button>
        <span className="no-account-text">
          No account yet?{" "}
          <Link className="no-account-link" to={"/signin"}>
            Create one.
          </Link>
        </span>
      </Stack>
    </div>
  );
}
