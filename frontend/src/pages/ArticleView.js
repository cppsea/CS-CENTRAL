import { useParams } from "react-router-dom";
import Header from "../Components/Header.js";
import { Stack, Image, Card } from "react-bootstrap";

export default function ArticleView() {
  const { name = "" } = useParams();
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="position-absolute w-100 pb-2" style={{ top: 100 }}>
        <h3>
          This is a page for Article View:{" "}
          <span className="fst-italic">{name.length != 0 ? name : ""}</span>
        </h3>
      </div>
    </>
  );
}
