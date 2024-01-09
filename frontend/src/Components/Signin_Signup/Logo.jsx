import { Stack, Image } from "react-bootstrap";
import logo from "../../assets/logo.png";

export default function Logo() {
  return (
    <Stack className="d-flex align-items-center justify-content-center h-100">
      <Image
        src={logo}
        style={{
          maxWidth: "200px",
          borderRadius: "20%",
        }}
        className="mb-4 w-50"
      />
      <h3 className="text-center fs-3 text-white">
        Learn - Explore - Innovate
      </h3>
      <h4 className="text-center fs-5 fst-italic fw-normal">
        CS Knowledge at Your Fingertips
      </h4>
    </Stack>
  );
}
