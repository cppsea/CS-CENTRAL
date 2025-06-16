import { Stack } from "react-bootstrap";
import ArrowMarker from "../../ArrowMarker/ArrowMarker";
import BlocksParser from "../../BlocksParser/BlocksParser";
//component for author description
export default function ArticleHeaderDesc({ descriptionBlocks }) {
  return (
    <div className="d-flex">
      <Stack direction="horizontal">
        <div className="article-desc-arrow-marker-container">
          <ArrowMarker />
        </div>
        <p className="article-desc ps-3">
          <BlocksParser blocks={descriptionBlocks} />
        </p>
      </Stack>
    </div>
  );
}
