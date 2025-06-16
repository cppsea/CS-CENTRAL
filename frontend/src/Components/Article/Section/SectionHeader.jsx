import ArrowMarker from "../../ArrowMarker/ArrowMarker";
import BlocksParser from "../../BlocksParser/BlocksParser";

//Component for the title of a article section
export default function SectionHeader({ headerBlock }) {
  return (
    <div className="d-flex">
      {/* <div className="section-header-marker h-100">&nbsp;</div> */}
      <div className="article-section-arrow-marker-container">
        <ArrowMarker />
      </div>
      <h2 className="section-header ps-2">
        <BlocksParser blocks={headerBlock} />
      </h2>
    </div>
  );
}
