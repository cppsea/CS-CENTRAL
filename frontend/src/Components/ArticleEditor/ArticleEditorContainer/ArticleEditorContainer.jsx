import React, { useState } from "react";
import EditMode from "./EditMode";
import ReviewMode from "./ReviewMode";
import "./ArticleEditorContainer.scss";

export default function ArticleEditorContainer() {
  const [mode, setMode] = useState("edit"); // "edit" or "review"
  const [articleData, setArticleData] = useState({
    header: { text: "" },
    desc: { text: "" },
    author: "",
    date: new Date().toLocaleDateString(),
    image: "",
    bodySections: [
      { title: "Introduction", content: "This is the introduction content." },
    ],
  });

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  const handleEditorChange = (newData) => {
    setArticleData(newData);
  };

  return (
    <div className="article-editor-container">
      <div className="editor-toggle">
        <button
          className={mode === "edit" ? "active" : ""}
          onClick={() => handleModeChange("edit")}
        >
          Edit
        </button>
        <button
          className={mode === "review" ? "active" : ""}
          onClick={() => handleModeChange("review")}
        >
          Review
        </button>
      </div>

      {mode === "edit" ? (
        <EditMode data={articleData} onChange={handleEditorChange} />
      ) : (
        <ReviewMode data={articleData} />
      )}
    </div>
  );
}
