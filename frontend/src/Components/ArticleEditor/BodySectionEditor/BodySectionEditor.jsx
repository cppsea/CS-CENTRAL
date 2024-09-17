import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import { useEffect } from "react";
import { useRef } from "react";
import Strikethrough from "@sotaproject/strikethrough";
import Undo from "editorjs-undo";
import { enforceBlockLimit, enforceCharLimit } from "../ArticleEditorHelpers";
import List from "@editorjs/list";
import SimpleImage from "@editorjs/simple-image";

export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolBar: true,
    config: {
      preserveBlank: true,
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  strikethrough: Strikethrough,
  image: {
    class: SimpleImage,
    inlineToolBar: true,
  },
};

const BODY_SECTION_MAX_BLOCKS = 5;
export default function BodySectionEditor({
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
        onReady: async () => {
          new Undo({ editor });
        },
        async onChange(api, event) {
          const content = await api.saver.save();
          const onChangeEvent = Array.isArray(event) ? event : [event];

          for (let currEvent of onChangeEvent) {
            await enforceBlockLimit(
              content,
              currEvent,
              api,
              BODY_SECTION_MAX_BLOCKS
            );
            await enforceCharLimit(content, currEvent, api, charLimit);
          }

          onChange({
            ...content,
            blocks: content.blocks.slice(0, BODY_SECTION_MAX_BLOCKS),
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

  return <div id={editorBlockId} />;
}
