import BodySectionEditor from "../../Components/ArticleEditor/BodySectionEditor/BodySectionEditor";
import DescEditor from "../../Components/ArticleEditor/DescEditor/DescEditor";
import HeaderEditor from "../../Components/ArticleEditor/HeaderEditor/HeaderEditor";
import { useState } from "react";
import { PlusCircle, ArrowsMove, Trash } from "react-bootstrap-icons";
import { Tab, Tabs, Form, Image } from "react-bootstrap";

import { useAuthContext } from "../../hooks/useAuthContext";
import "./ArticleEditorPage.scss";
import ArticlePreview from "../../Components/ArticleEditor/ArticlePreview.jsx/ArticlePreview";
import ArticleImagePreview from "../../Components/Article/ArticleImagePreview/ArticleImagePreview";

export default function ArticleEditorPage() {
  const { user } = useAuthContext();
  const [articleEditorData, setArticleEditorData] = useState({
    header: { time: new Date().getTime(), blocks: [] },
    image: "/ai_image.jpg",
    description: { time: new Date().getTime(), blocks: [] },
    articleBody: [],
  });

  //keeps track of the ids of body sections
  const [bodySectionIdSet, setBodySectionIdSet] = useState(new Set());

  const setHeaderData = (newData) => {
    setArticleEditorData({ ...articleEditorData, header: newData });
  };
  const setDescData = (newData) => {
    setArticleEditorData({ ...articleEditorData, description: newData });
  };
  const setArticleBodySectionDataCreator = (index) => (newData) => {
    setArticleEditorData((prev) => {
      return {
        ...prev,
        articleBody: prev.articleBody.map((section, i) => {
          //preserves the random UUID we have created
          return i === index ? { ...section, ...newData } : section;
        }),
      };
    });
  };

  const addNewBodySection = () => {
    let newArticleEditorData = { ...articleEditorData };
    let newId = crypto.randomUUID();
    while (bodySectionIdSet.has(newId)) {
      newId = crypto.randomUUID();
    }
    setBodySectionIdSet(bodySectionIdSet.add(newId));
    newArticleEditorData.articleBody.push({
      id: newId,
      time: new Date().getTime(),
      blocks: [],
    });
    setArticleEditorData(newArticleEditorData);
  };

  const removeBodySection = (index) => {
    let newArticleBody = [...articleEditorData.articleBody];
    newArticleBody = [
      ...newArticleBody.slice(0, index),
      ...newArticleBody.slice(index + 1),
    ];
    setArticleEditorData({
      ...articleEditorData,
      articleBody: newArticleBody,
    });

    bodySectionIdSet.delete(articleEditorData.articleBody[index].id);
    setBodySectionIdSet(new Set(bodySectionIdSet));
  };

  const [draggedIndex, setDraggedIndex] = useState(null);
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      let newArticleBody = [...articleEditorData.articleBody];
      let draggedBody = newArticleBody[draggedIndex];

      newArticleBody = [
        ...newArticleBody.slice(0, draggedIndex),
        ...newArticleBody.slice(draggedIndex + 1),
      ];

      newArticleBody.splice(dropIndex, 0, draggedBody);

      setArticleEditorData({
        ...articleEditorData,
        articleBody: newArticleBody,
      });
      setDraggedIndex(null);
    }
  };

  const [isEditView, setIsEditView] = useState(true);
  const toggleEditView = (key) => {
    switch (key) {
      case "edit":
        setIsEditView(true);
        break;
      case "preview":
        setIsEditView(false);
        break;
      default:
        break;
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setArticleEditorData({ ...articleEditorData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const [show, setShow] = useState(false);

  return (
    <>
      <ArticleImagePreview
        imageSrc={articleEditorData.image}
        show={show}
        setShow={setShow}
      />

      {/*placeholder for styling of page, insert editor js instances in*/}
      <Tabs
        defaultActiveKey="edit"
        className="d-flex justify-content-end align-items-end"
        onSelect={(key) => toggleEditView(key)}
      >
        <Tab eventKey="edit" className="edit-tab" title="Edit"></Tab>
        <Tab eventKey="preview" className="preview-tab" title="Preview"></Tab>
      </Tabs>

      {isEditView ? (
        <>
          <div className="container">
            <h2 className="header">Title</h2>
            <div className="text-container">
              <HeaderEditor
                data={articleEditorData.header}
                onChange={setHeaderData}
                editorBlockId={"header-editor"}
                charLimit={50}
              />
            </div>
          </div>
          <div className="container">
            <h2 className="header">Description</h2>
            <div className="text-container">
              <DescEditor
                data={articleEditorData.description}
                onChange={setDescData}
                editorBlockId={"desc-editor"}
                charLimit={200}
              />{" "}
            </div>
          </div>
          <div className="container">
            <h2 className="header">Article Image</h2>
            {articleEditorData.image && (
              <div className="image-container">
                <Image
                  src={articleEditorData.image}
                  width="300"
                  alt="Uploaded preview"
                  fluid
                  onClick={() => setShow(true)}
                />
              </div>
            )}
            <div className="image-container">
              <Form.Label className="upload-button" htmlFor="file-upload">
                Upload Image
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="file-upload"
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="container">
            <h2 className="header">Article Body</h2>
            <div className="text-container">
              {articleEditorData.articleBody.map(
                (articleBodySectionData, index) => {
                  return (
                    <div
                      key={index}
                      className="article-body-section"
                      onDragOver={(e) => e.preventDefault()}
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      <div className="body-section-editor">
                        <BodySectionEditor
                          key={`body-section-editor-${articleBodySectionData.id}`}
                          data={articleBodySectionData}
                          onChange={setArticleBodySectionDataCreator(index)}
                          charLimit={1000}
                          editorBlockId={`body-section-editor-${index}`}
                        />
                      </div>
                      <div className="icons">
                        <span id="drag-icon" draggable="true">
                          <ArrowsMove size={24} id="drag-icon" />
                        </span>
                        <Trash
                          id="trash-icon"
                          size={24}
                          onClick={() => removeBodySection(index)}
                        />
                      </div>
                      <hr className="body-divider" />
                    </div>
                  );
                }
              )}
              <PlusCircle
                id="plus-button"
                size={24}
                onClick={addNewBodySection}
              />
            </div>
          </div>
          <button
            onClick={() => {
              console.log("header");
              console.log(JSON.stringify(articleEditorData.header));
              console.log("\nDescription");
              console.log(JSON.stringify(articleEditorData.description));
              console.log("\nArticle Body");
              console.log(JSON.stringify(articleEditorData.articleBody));
            }}
          >
            Show Data
          </button>
        </>
      ) : (
        <>
          <ArticlePreview articleEditorData={articleEditorData} user={user} />
        </>
      )}
    </>
  );
}
