import ArticleEditor from "../../Components/ArticleEditor/ArticleEditor";
import DescEditor from "../../Components/ArticleEditor/DescEditor/DescEditor";
import HeaderEditor from "../../Components/ArticleEditor/HeaderEditor/HeaderEditor";
import { useState } from "react";
export default function ArticleEditorPage() {
  const [headerData, setHeaderData] = useState({
    time: new Date().getTime(),
    blocks: [],
  });
  const [descData, setDescData] = useState({
    time: new Date().getTime(),
    blocks: [],
  });

  return (
    <>
      <HeaderEditor
        data={headerData}
        onChange={(newData) => {
          setHeaderData(newData);
        }}
        editorBlockId={"header-editor"}
        charLimit={10}
      />
      <div
        style={{
          width: "100%",
          border: "1px solid #79A2D2",
        }}
      ></div>
      <DescEditor
        data={descData}
        onChange={(newData) => {
          setDescData(newData);
        }}
        editorBlockId={"description-editor"}
        charLimit={10}
      />
    </>
  );
}
