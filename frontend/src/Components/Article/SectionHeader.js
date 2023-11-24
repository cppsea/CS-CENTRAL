import { Stack } from "react-bootstrap";

//Component for the title of a article section
//Component for the title of a article section
export default function SectionHeader({ header }) {
  return (
    <div className="d-flex">
      <Stack direction="horizontal">
        <div className="section-header-marker h-100">&nbsp;</div>
        <h2 className="section-header d-inline ps-4">{header}</h2>
      </Stack>
    </div>
  );
}
