import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import { useEffect } from "react";
import { useRef } from "react";
import List from "@editorjs/list";
import Strikethrough from "@sotaproject/strikethrough";
import SimpleImage from "@editorjs/simple-image";
import Undo from "editorjs-undo";
import DragDrop from "editorjs-drag-drop";

export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolBar: true,
  },
  header: {
    class: Header,
    config: {
      levels: [1, 2],
      defaultLevel: 1,
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

export default function ArticleEditor({ data, onChange, editorBlockId }) {
  const ref = useRef();
  useEffect(() => {
    //Initialize editorjs if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: editorBlockId,
        tools: EDITOR_JS_TOOLS,
        data: data,
        onReady: () => {
          new Undo({ editor });
          new DragDrop(editor);
        },
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
          console.log(data);
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
