import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import { useRef, useState, useEffect } from "react";
import Strikethrough from "@sotaproject/strikethrough";
import Undo from "editorjs-undo";
import { enforceBlockLimit, enforceCharLimit } from "../ArticleEditorHelpers";
import { Image, Form, Button } from 'react-bootstrap';
import "./DescEditor.scss";
export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolBar: true,
    config: {
      preserveBlank: true,
    },
  },
  strikethrough: Strikethrough,
};

const DESC_MAX_BLOCKS = 5;
export default function DescEditor({
  data,
  onChange,
  editorBlockId,
  charLimit,
}) {
  const ref = useRef();
  useEffect(() => {
    //Initialize editorjs if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: editorBlockId,
        tools: EDITOR_JS_TOOLS,
        placeholder: "Write text...",
        data: data,
        onReady: async () => {
          new Undo({ editor });
        },
        async onChange(api, event) {
          const content = await api.saver.save();
          const onChangeEvent = Array.isArray(event) ? event : [event];

          for (let currEvent of onChangeEvent) {
            await enforceBlockLimit(content, currEvent, api, DESC_MAX_BLOCKS);
            await enforceCharLimit(content, currEvent, api, charLimit);
          }

          onChange({
            ...content,
            blocks: content.blocks.slice(0, DESC_MAX_BLOCKS),
          });
        },
      });

      ref.current = editor;
    }

    //Add a return function to handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

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
      <Form className="form-editor w-75 m-auto mb-3">
        <Form.Group>
          <Form.Label className="p-0 m-0 form-control-lg fw-bold pt-3">Title</Form.Label>
          <Form.Control className="text-box" as="textarea" rows={2}></Form.Control>
        </Form.Group>
        <Form.Group className="">
          <Form.Label className="p-0 m-0 form-control-lg fw-bold pt-3">Description</Form.Label>
          <Form.Control className="" as="textarea" rows={2}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className="d-block p-0 m-0 form-control-lg fw-bold pt-3">Article Image</Form.Label>

          {image && (
            <div className="mt-3">
              <Image src={image} width="300" alt="Uploaded preview" fluid />
            </div>
          )}
          <Form.Label className="bg-primary p-2 rounded mt-2 upload-button" htmlFor="file-upload">
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
          <Form.Label className="d-block p-0 m-0 form-control-lg fw-bold pt-3">Article Body</Form.Label>
          <Form.Label className="border w-100 h-100 rounded" id={editorBlockId}></Form.Label>
        </Form.Group>
        <Form.Group className="d-flex justify-content-center">
          <Button className="mt-3" variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form >

    </>);
}

