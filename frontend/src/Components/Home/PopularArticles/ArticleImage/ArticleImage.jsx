import { Image } from "react-bootstrap";
import "./ArticleImage.scss";
import NumberArrowMarker from "../NumberArrowMarker/NumberArrowMarker";

export default function ArticleImage({ article_img, number }) {
  return (
    <>
      <div>
        <NumberArrowMarker number={number}/>
        <Image src={article_img} className="article-img" />
      </div>
    </>
  );
}
