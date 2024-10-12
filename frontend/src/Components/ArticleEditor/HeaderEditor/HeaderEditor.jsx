import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import { useEffect } from "react";
import { useRef } from "react";
import Undo from "editorjs-undo";
import "./HeaderEditor.scss";
import { enforceBlockLimit, enforceCharLimit } from "../ArticleEditorHelpers";
import { Tab, Tabs } from "react-bootstrap";

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
}) {
  const ref = useRef();
  useEffect(() => {
    //Initialize editorjs if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: editorBlockId,
        tools: EDITOR_JS_TOOLS,
        data: data,

        onReady: async (api) => {
          new Undo({ editor });
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

      ref.current = editor;
    }

    //Add a return function to handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <div id={editorBlockId} />
    </>
  );
}
