import { Stack, Image } from "react-bootstrap";
import logo from "../../assets/logo.png";

export default function Logo() {
  return (
    <Stack className="d-flex align-items-center justify-content-center h-100">
      <Image
        src={logo}
        style={{
          borderRadius: "20%",
          width: "50%",
          maxWidth: "200px",
        }}
        className="mb-4"
      />
      <h3 className="text-center fs-3" style={{ color: "white" }}>
        Learn - Explore - Innovate
      </h3>
      <h4 className="text-center fs-5 fst-italic fw-normal">
        CS Knowledge at Your Fingertips
      </h4>
    </Stack>
  );
}
