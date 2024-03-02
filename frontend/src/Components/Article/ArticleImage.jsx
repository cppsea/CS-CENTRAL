import { Image } from "react-bootstrap";
//Article Image
export default function ArticleImage({ image, alt_text }) {
  return <Image src={image} alt={alt_text} fluid className="article-image mb-3 mx-auto"/>;
}
