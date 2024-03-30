import SectionHeader from "./SectionHeader";
import SectionContent from "./SectionContent";

//Component for one of the sections within the body of an article
//takes in the title and body content
export default function BodySection({ id, title, body }) {
  return (
    <div className="d-flex flex-column article-body-section" id={id}>
      <SectionHeader header={title} />
      <SectionContent content={body} />
    </div>
  );
}
