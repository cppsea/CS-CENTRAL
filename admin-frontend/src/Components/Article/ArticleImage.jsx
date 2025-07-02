import { useState } from "react";
import { Image } from "react-bootstrap";
import ArticleImagePreview from "../../Components/Article/ArticleImagePreview/ArticleImagePreview";
//Article Image
export default function ArticleImage({ image, alt_text }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <ArticleImagePreview imageSrc={image} show={show} setShow={setShow} />
      <Image
        src={image}
        alt={alt_text}
        fluid
        className="article-image mb-3 mx-auto"
        onClick={() => setShow(true)}
      />
    </>
  );
}
