import { Button, Stack, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./WelcomeSection.scss";
import BrandName from "../../Home/AppBrand/BrandName";

export default function WelcomeSection() {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="sign-welcome-message fw-light text-black">Welcome to</h2>
      <div className=" d-flex flex-column align-items-center">
        <Image src="/logo_black.png" className="cc-wire-logo" />
      </div>
    
      <Stack gap={3}>
        <Button className="welcome-button" onClick={() => navigate("/")}>
          <span className="text-white text-uppercase welcome-btn-text">
            Browse as <span className="fw-semibold">guest</span>
          </span>
        </Button>
        <Button className="welcome-button" onClick={() => navigate("/signin")}>
          <span className="text-white text-uppercase welcome-btn-text">
            Login with my <span className="fw-semibold">account</span>
          </span>
        </Button>
        <span className="no-account-text text-black">
          No account yet?{" "}
          <Link className="no-account-link" to={"/signup"}>
            Create one.
          </Link>
        </span>
      </Stack>
    </div>
  );
}
