import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import { useRef, useState, useEffect } from "react";
import Strikethrough from "@sotaproject/strikethrough";
import Undo from "editorjs-undo";
import { enforceBlockLimit, enforceCharLimit } from "../ArticleEditorHelpers";
import { Image, Form, Button } from "react-bootstrap";
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

const DESC_MAX_BLOCKS = 10;
export default function DescEditor({
  data,
  onChange,
  editorBlockId,
  charLimit,
  hasLoadedInitialData,
}) {
  const editorRef = useRef();
  const hasRenderedInitialData = useRef(false);
  const [isEditorReady, setIsEditorReady] = useState(false);
  useEffect(() => {
    //Initialize editorjs if we don't have a reference
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: editorBlockId,
        tools: EDITOR_JS_TOOLS,
        placeholder: "Write text...",
        data: data,
        onReady: async () => {
          new Undo({ editor });
          setIsEditorReady(true);
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

      editorRef.current = editor;
    }

    //Add a return function to handle cleanup
    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
        hasRenderedInitialData.current = false;
      }
    };
  }, []);

  useEffect(() => {
    if (
      isEditorReady &&
      hasLoadedInitialData &&
      data &&
      !hasRenderedInitialData.current
    ) {
      editorRef.current
        .clear()
        .then(() => editorRef.current.render(data))
        .then(() => {
          hasRenderedInitialData.current = true;
        })
        .catch((err) => console.error("EditorJS render error:", err));
    }
  }, [isEditorReady, hasLoadedInitialData, data]);

  return (
    <>
      <div id={editorBlockId} />
    </>
  );
}
