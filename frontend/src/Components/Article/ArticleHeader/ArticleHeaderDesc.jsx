import { Stack } from "react-bootstrap";

//component for author description
export default function ArticleHeaderDesc({ desc }) {
  return (
    <div className="d-flex">
      <Stack direction="horizontal">
        <div className="article-desc-marker h-100">&nbsp;</div>
        <p className="article-desc ps-3">{desc}</p>
      </Stack>
    </div>
  );
}
