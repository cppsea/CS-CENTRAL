import ArticleEditor from "../../Components/ArticleEditor/ArticleEditor";
import { useState } from "react";
export default function ArticleEditorPage() {
  const [data, setData] = useState({
    time: new Date().getTime(),
    blocks: [],
  });

  return (
    <>
      <ArticleEditor
        data={data}
        onChange={(newData) => setData(newData)}
        editorBlockId={"article-editor"}
      />
    </>
  );
}
