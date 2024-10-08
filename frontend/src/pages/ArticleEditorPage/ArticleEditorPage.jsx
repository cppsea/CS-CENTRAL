/*import ArticleEditor from "../../Components/ArticleEditor/ArticleEditor";
import ArticleEditorContainer from './Components/ArticleEditor/ArticleEditorContainer/ArticleEditorContainer';
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
          border: "1px solid red",
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
}*/ 
import { useState } from "react";
import ArticleEditorContainer from "../../Components/ArticleEditor/ArticleEditorContainer/ArticleEditorContainer";
import DescEditor from "../../Components/ArticleEditor/DescEditor/DescEditor";
import HeaderEditor from "../../Components/ArticleEditor/HeaderEditor/HeaderEditor";

export default function ArticleEditorPage() {
  const [headerData, setHeaderData] = useState({
    time: new Date().getTime(),
    blocks: [],
  });

  const [descData, setDescData] = useState({
    time: new Date().getTime(),
    blocks: [],
  });

  const [mode, setMode] = useState("edit");

  return (
    <div>
      {/* Toggle between Edit and Review modes */}
      <ArticleEditorContainer mode={mode} setMode={setMode} />

      {mode === "edit" ? (
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
              border: "1px solid red",
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
      ) : (
        <div>
          {/* This will be the review mode where you can render the preview of the article */}
          <h1>Review Mode</h1>
          <h2>Header:</h2>
          <div dangerouslySetInnerHTML={{ __html: headerData.blocks.map(block => block.data.text).join(' ') }} />
          <h2>Description:</h2>
          <div dangerouslySetInnerHTML={{ __html: descData.blocks.map(block => block.data.text).join(' ') }} />
        </div>
      )}
    </div>
  );
}

