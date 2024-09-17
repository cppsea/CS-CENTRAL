import BodySectionEditor from "../../Components/ArticleEditor/BodySectionEditor/BodySectionEditor";
import DescEditor from "../../Components/ArticleEditor/DescEditor/DescEditor";
import HeaderEditor from "../../Components/ArticleEditor/HeaderEditor/HeaderEditor";
import { useState } from "react";
import { PlusCircle } from "react-bootstrap-icons";
export default function ArticleEditorPage() {
  const [articleEditorData, setArticleEditorData] = useState({
    header: { time: new Date().getTime(), blocks: [] },
    description: { time: new Date().getTime(), blocks: [] },
    articleBody: [{ time: new Date().getTime(), blocks: [] }],
  });

  const setHeaderData = (newData) => {
    setArticleEditorData({ ...articleEditorData, header: newData });
  };
  const setDescData = (newData) => {
    setArticleEditorData({ ...articleEditorData, description: newData });
  };
  const setArticleBodySectionDataCreator = (index) => {
    return (newData) => {
      setArticleEditorData({
        ...articleEditorData,
        articleBody: [
          ...articleEditorData.articleBody.slice(0, index),
          newData,
          ...articleEditorData.articleBody.slice(index + 1),
        ],
      });
    };
  };

  const addNewBodySection = () => {
    let newArticleEditorData = { ...articleEditorData };
    newArticleEditorData.articleBody.push({
      time: new Date().getTime(),
      blocks: [],
    });
    setArticleEditorData(newArticleEditorData);
  };

  return (
    <>
      <HeaderEditor
        data={articleEditorData.header}
        onChange={setHeaderData}
        editorBlockId={"header-editor"}
        charLimit={10}
      />
      <DescEditor
        data={articleEditorData.description}
        onChange={setDescData}
        editorBlockId={"desc-editor"}
        charLimit={50}
      />

      {articleEditorData.articleBody.map((articleBodySectionData, index) => {
        return (
          <BodySectionEditor
            key={`body-section-editor-${index}`}
            data={articleBodySectionData}
            onChange={setArticleBodySectionDataCreator(index)}
            charLimit={20}
            editorBlockId={`body-section-editor-${index}`}
          />
        );
      })}

      <PlusCircle onClick={addNewBodySection} />
      <button onClick={() => console.log(JSON.stringify(articleEditorData))}>
        Show Data
      </button>
    </>
  );
}
