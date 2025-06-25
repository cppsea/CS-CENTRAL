import BodySectionEditor from "../../Components/ArticleEditor/BodySectionEditor/BodySectionEditor";
import DescEditor from "../../Components/ArticleEditor/DescEditor/DescEditor";
import HeaderEditor from "../../Components/ArticleEditor/HeaderEditor/HeaderEditor";
import { useEffect, useRef, useState } from "react";
import {
  PlusCircle,
  ArrowsMove,
  Trash,
  CloudSnowFill,
} from "react-bootstrap-icons";
import { Tab, Tabs, Form, Image, Button } from "react-bootstrap";

import { useAuthContext } from "../../hooks/useAuthContext";
import "./ArticleEditorPage.scss";
import ArticlePreview from "../../Components/ArticleEditor/ArticlePreview.jsx/ArticlePreview";
import { useParams } from "react-router-dom";
import { useGetArticleByID } from "../../hooks/useGetArticleByID";
import { useArticleCreate } from "../../hooks/useArticleCreate";
import { useArticleEdit } from "../../hooks/useArticleEdit";

export default function ArticleEditorPage() {
  const { user } = useAuthContext();
  const params = useParams();
  const [articleEditorData, setArticleEditorData] = useState({
    header: { time: new Date().getTime(), blocks: [] },
    image: "/ai_image.jpg",
    description: { time: new Date().getTime(), blocks: [] },
    articleBody: [],
  });

  //keeps track of the ids of body sections
  const [bodySectionIdSet, setBodySectionIdSet] = useState(new Set());

  const setHeaderData = (newData) => {
    setArticleEditorData((prev) => ({ ...prev, header: newData }));
  };
  const setDescData = (newData) => {
    setArticleEditorData((prev) => ({ ...prev, description: newData }));
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
    setArticleEditorData((prev) => {
      let newId = crypto.randomUUID();
      while (bodySectionIdSet.has(newId)) {
        newId = crypto.randomUUID();
      }
      setBodySectionIdSet(bodySectionIdSet.add(newId));

      return {
        ...prev,
        articleBody: [
          ...prev.articleBody,
          {
            id: newId,
            time: new Date().getTime(),
            blocks: [],
          },
        ],
      };
    });
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

      setArticleEditorData((prev) => ({
        ...prev,
        articleBody: newArticleBody,
      }));
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
        setArticleEditorData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    getArticleByID,
    isLoading: getArticleIsLoading,
    error: getArticleError,
  } = useGetArticleByID();

  //for ensuring it calls only once
  const hasRun = useRef(false);
  useEffect(() => {
    const fetchArticle = async () => {
      if (hasRun.current) return;
      if (!user || !params.articleID) return;
      hasRun.current = true;
      const retrievedArticle = await getArticleByID(params.articleID);
      if (retrievedArticle) {
        setArticleEditorData(retrievedArticle);
        setHasLoadedInitialData(true);
      }
    };
    fetchArticle();
  }, [user]);

  const {
    createArticle,
    isLoading: articleCreateIsLoading,
    error: articleCreateError,
  } = useArticleCreate();
  const {
    editArticle,
    isLoading: articleEditIsLoading,
    error: articleEditError,
  } = useArticleEdit();

  const [hasLoadedInitialData, setHasLoadedInitialData] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();

    let newArticle;
    if (params.articleID) {
      newArticle = await editArticle(params.articleID, articleEditorData);
    } else {
      newArticle = await createArticle(articleEditorData);
    }

    if (newArticle) {
      setArticleEditorData(newArticle);
    }
  };
  return (
    <>
      {/*placeholder for styling of page, insert editor js instances in*/}
      <Tabs
        defaultActiveKey="edit"
        className="d-flex justify-content-end align-items-end"
        onSelect={(key) => toggleEditView(key)}
      >
        <Tab eventKey="edit" className="edit-tab" title="Edit"></Tab>
        <Tab eventKey="preview" className="preview-tab" title="Preview"></Tab>
      </Tabs>

      {/* <Form className="form-editor w-75 m-auto mb-3">
        <Form.Group>
          <Form.Label className="p-0 m-0 form-control-lg fw-bold pt-3">
            Title
          </Form.Label>
          <Form.Control
            className="text-box"
            as="textarea"
            rows={2}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="">
          <Form.Label className="p-0 m-0 form-control-lg fw-bold pt-3">
            Description
          </Form.Label>
          <Form.Control className="" as="textarea" rows={2}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className="d-block p-0 m-0 form-control-lg fw-bold pt-3">
            Article Image
          </Form.Label>

          {image && (
            <div className="mt-3">
              <Image src={image} width="300" alt="Uploaded preview" fluid />
            </div>
          )}
          <Form.Label
            className="bg-primary p-2 rounded mt-2 upload-button"
            htmlFor="file-upload"
          >
            Upload Image
          </Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="file-upload"
            style={{ display: "none" }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="d-block p-0 m-0 form-control-lg fw-bold pt-3">
            Article Body
          </Form.Label>
          <Form.Control className="" as="textarea" rows={4}></Form.Control>
        </Form.Group>
        <Form.Group className="d-flex justify-content-center">
          <Button className="mt-3" variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form> */}
      {isEditView ? (
        <>
          <div className="container">
            <Button onClick={submitHandler}>
              {articleEditorData.id ? "Save" : "Create"}
            </Button>
            <h2 className="header">Title</h2>
            <div className="text-container">
              <HeaderEditor
                data={articleEditorData.header}
                onChange={setHeaderData}
                editorBlockId={"header-editor"}
                charLimit={50}
                hasLoadedInitialData={hasLoadedInitialData}
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
                hasLoadedInitialData={hasLoadedInitialData}
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
                          hasLoadedInitialData={hasLoadedInitialData}
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
              console.log("image");
              console.log(articleEditorData.image);
              console.log("\nDescription");
              console.log(JSON.stringify(articleEditorData.description));
              console.log("\nArticle Body");
              console.log(JSON.stringify(articleEditorData.articleBody));

              console.log(articleEditorData.articleBody);
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
