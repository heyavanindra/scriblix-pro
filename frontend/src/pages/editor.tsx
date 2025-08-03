import BlogEditor from "../components/blog-markdown-editor";
import PublishForm from "../components/publishform";
import { blogStore } from "../state/zustand";

const Editor = () => {
  const { editorState } = blogStore();
  return editorState === "editor" ? (
    <BlogEditor></BlogEditor>
  ) : (
    <PublishForm></PublishForm>
  );
};

export default Editor;
