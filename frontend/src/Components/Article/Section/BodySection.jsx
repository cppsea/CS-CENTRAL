import SectionHeader from "./SectionHeader";
import SectionContent from "./SectionContent";

//Component for one of the sections within the body of an article
//takes in the body section blocks
//assumes that if there is a title, it will be the first block
export default function BodySection({ id, bodySectionBlocks }) {
  let titleBlock = bodySectionBlocks[0];
  let bodyContentBlocks = [...bodySectionBlocks.slice(1)];

  return (
    <div className="d-flex flex-column article-body-section" id={id}>
      <SectionHeader
        headerBlock={
          titleBlock
            ? [titleBlock]
            : [{ type: "header", data: { text: "Section Title", level: 2 } }]
        }
      />
      {bodyContentBlocks.map((block, index) => {
        return <SectionContent content={[block]} />;
      })}
    </div>
  );
}
