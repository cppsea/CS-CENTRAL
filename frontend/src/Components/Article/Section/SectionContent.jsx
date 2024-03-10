//Component for the body content of an article section's content
export default function SectionContent({ content }) {
  return (
    <div className="d-flex position-relative">
      <div className=" section-content-marker-container">
        <div className="section-content-marker">&nbsp;</div>
      </div>
      <p className="section-content-text pt-3 ps-4">{content}</p>
    </div>
  );
}
