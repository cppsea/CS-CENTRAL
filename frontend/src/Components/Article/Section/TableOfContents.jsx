import { Stack } from "react-bootstrap";
import SectionHeader from "./SectionHeader";

/*
component for table of contents in article page, takes in array of objects containing strings for a heading and link to direct to the corresponding section

-will display the number corresponding to its position next to it
*/
export default function TableOfContents({ contentSequence }) {
  return (
    <div className="d-flex flex-column position-relative">
      <SectionHeader header={"Table of Contents"} />
      <div className="table-contents-marker-container">
        <div className="table-contents-marker">&nbsp;</div>
      </div>
      <Stack className="pt-1 ps-3" gap={2}>
        {contentSequence.map(({ heading, link }, index) => (
          <a className="table-content-heading ps-3" key={heading} href={link}>
            {index + 1}. {heading}
          </a>
        ))}
      </Stack>
    </div>
  );
}
