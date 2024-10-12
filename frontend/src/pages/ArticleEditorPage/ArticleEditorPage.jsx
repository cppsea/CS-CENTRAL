import BodySectionEditor from "../../Components/ArticleEditor/BodySectionEditor/BodySectionEditor";
import DescEditor from "../../Components/ArticleEditor/DescEditor/DescEditor";
import HeaderEditor from "../../Components/ArticleEditor/HeaderEditor/HeaderEditor";
import { useState } from "react";
import { PlusCircle } from "react-bootstrap-icons";
import { Tab, Tabs, Image, Form, Button } from "react-bootstrap";

export default function ArticleEditorPage() {
  const [articleEditorData, setArticleEditorData] = useState({
    header: { time: new Date().getTime(), blocks: [] },
    description: { time: new Date().getTime(), blocks: [] },
    articleBody: [
      { time: new Date().getTime(), blocks: [] },
      { time: new Date().getTime(), blocks: [] },
    ],
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

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/*placeholder for styling of page, insert editor js instances in*/}
      <Tabs
        defaultActiveKey="profile"
        className="d-flex justify-content-end align-items-end"
      >
        <Tab eventKey="edit" className="edit-tab" title="Edit"></Tab>
        <Tab eventKey="preview" className="preview-tab" title="Preview"></Tab>
      </Tabs>

      <Form className="form-editor w-75 m-auto mb-3">
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
      </Form>

      <h2>header editorjs instance</h2>
      <HeaderEditor
        data={articleEditorData.header}
        onChange={setHeaderData}
        editorBlockId={"header-editor"}
        charLimit={10}
      />
      <h2>desc editorjs instance</h2>

      <DescEditor
        data={articleEditorData.description}
        onChange={setDescData}
        editorBlockId={"desc-editor"}
        charLimit={50}
      />
      <h2>article body sections editorjs instance</h2>

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
