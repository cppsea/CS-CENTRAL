import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import { useEffect } from "react";
import { useRef, useState } from "react";
import Undo from "editorjs-undo";
import "./HeaderEditor.scss";
import { enforceBlockLimit, enforceCharLimit } from "../ArticleEditorHelpers";

export const EDITOR_JS_TOOLS = {
  header: {
    class: Header,
    config: {
      levels: [1, 2],
      defaultLevel: 1,
      enableLineBreaks: false,
    },
  },
  paragraph: {
    class: Paragraph,
    inlineToolBar: true,
    config: {
      preserveBlank: true,
    },
  },
};

//keep to one block
const HEADER_MAX_BLOCKS = 1;
export default function HeaderEditor({
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
        data: data,

        onReady: async (api) => {
          new Undo({ editor });
          setIsEditorReady(true);
        },
        async onChange(api, event) {
          const content = await api.saver.save();
          const onChangeEvent = Array.isArray(event) ? event : [event];

          for (let currEvent of onChangeEvent) {
            await enforceBlockLimit(content, currEvent, api, HEADER_MAX_BLOCKS);
            await enforceCharLimit(content, currEvent, api, charLimit);
          }

          onChange({
            ...content,
            blocks: content.blocks.slice(0, HEADER_MAX_BLOCKS),
          });
        },
        defaultBlock: "header",
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
