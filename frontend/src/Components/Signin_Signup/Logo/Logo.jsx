import { Stack, Image } from "react-bootstrap";
import "./Logo.scss";

export default function Logo() {
  return (
    <Stack className="d-flex align-items-center justify-content-center h-100">
      <Image src="/cc_logo.png" className="cc-logo" />
      <h3 className="text-center middle-slogan text-black fw-bold">
        Learn - Explore - Innovate
      </h3>
      <p className="text-center bottom-slogan fst-italic fw-normal text-black">
        CS Knowledge at Your Fingertips
      </p>
    </Stack>
  );
}
