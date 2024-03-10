import { Stack } from "react-bootstrap";

//component for article title
export default function ArticleHeaderTitle({ title }) {
  return (
    <Stack direction="horizontal">
      <h1 className="fw-bold article-title">{title}</h1>
    </Stack>
  );
}
