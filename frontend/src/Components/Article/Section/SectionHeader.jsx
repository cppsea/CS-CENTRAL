import ArrowMarker from "../../ArrowMarker/ArrowMarker";

//Component for the title of a article section
export default function SectionHeader({ header }) {
  return (
    <div className="d-flex">
      {/* <div className="section-header-marker h-100">&nbsp;</div> */}
      <div className="article-section-arrow-marker-container">
        <ArrowMarker />
      </div>
      <h2 className="section-header ps-2">{header}</h2>
    </div>
  );
}
