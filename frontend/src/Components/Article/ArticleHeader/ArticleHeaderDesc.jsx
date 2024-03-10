import { Stack } from "react-bootstrap";
import ArrowMarker from "../../ArrowMarker/ArrowMarker";
//component for author description
export default function ArticleHeaderDesc({ desc }) {
  return (
    <div className="d-flex">
      <Stack direction="horizontal">
        <div className="article-desc-arrow-marker-container">
          <ArrowMarker />
        </div>
        <p className="article-desc ps-3">{desc}</p>
      </Stack>
    </div>
  );
}
