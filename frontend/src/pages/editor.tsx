import { useState } from "react";

const Editor = () => {
  const [editorState, setEditorState] = useState("editor");
  return editorState === "editor" ? (
    <h1>Blog Editor</h1>
  ) : (
    <h1>Publish form</h1>
  );
};

export default Editor;
