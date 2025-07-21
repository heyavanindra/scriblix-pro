import { useState } from "react";
import BlogEditor from "../components/blog-markdown-editor";

const Editor = () => {
    const [markdown, setMarkdown] = useState<string>(''); // ✅ Not undefined

  return (
    <div>
      <BlogEditor markdown={markdown ?? ""} onChange={setMarkdown} />
    </div>
  );
};

export default Editor;
