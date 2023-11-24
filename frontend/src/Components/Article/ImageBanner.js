import { Image } from "react-bootstrap";
//Image Banner component
export default function ImageBanner({ image, alt_text }) {
  return <Image src={image} alt={alt_text} fluid className="article-image-banner"/>;
}
