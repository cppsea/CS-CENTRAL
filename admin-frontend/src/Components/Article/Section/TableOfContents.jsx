import { Stack } from "react-bootstrap";
import SectionHeader from "./SectionHeader";
import BlocksParser from "../../BlocksParser/BlocksParser";

/*
component for table of contents in article page, 
takes in array of objects containing heading block data text and section id

*/
export default function TableOfContents({ contentSequence }) {
  return (
    <div className="d-flex flex-column position-relative">
      <SectionHeader
        headerBlock={[{ type: "header", data: { text: "Table of Contents" } }]}
      />
      <div className="table-contents-marker-container">
        <div className="table-contents-marker">&nbsp;</div>
      </div>
      <Stack className="pt-1 ps-3" gap={2}>
        {contentSequence.map(({ heading, link }, index) => {
          return (
            <a className="table-content-heading ps-3" key={heading.data.text + link} href={link} >
              {index + 1}. <BlocksParser blocks={[heading]} />
            </a>
          );
        })}
      </Stack>
    </div>
  );
}
