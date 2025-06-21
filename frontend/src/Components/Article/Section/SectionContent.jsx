import BlocksParser from "../../BlocksParser/BlocksParser";
//Component for the body content of an article section's content
export default function SectionContent({ content }) {
  return (
    <div className="d-flex position-relative">
      <div className=" section-content-marker-container">
        <div className="section-content-marker">&nbsp;</div>
      </div>
      <span className="section-content-text pt-1 ps-4">
        <BlocksParser blocks={content} />
      </span>
    </div>
  );
}
