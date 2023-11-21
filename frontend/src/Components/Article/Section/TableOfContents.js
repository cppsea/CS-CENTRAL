import { Stack } from "react-bootstrap";
import SectionHeader from "./SectionHeader";

/*
component for table of contents in article page, takes in array of strings representing 
table of content headings

-will display the number corresponding to its position next to it
*/
export default function TableOfContents({ content_headings }) {
  return (
    <Stack>
      <SectionHeader header={"Table of Contents"} />
      <Stack className="pt-1 ps-3" gap={2}>
        {content_headings.map((content_heading, index) => (
          <p className="table-content-heading ps-3">
            {index + 1}. {content_heading}
          </p>
        ))}
      </Stack>
    </Stack>
  );
}
