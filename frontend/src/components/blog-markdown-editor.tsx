import "@mdxeditor/editor/style.css";
import {
  MDXEditor,
  headingsPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  CodeToggle,
  CreateLink,
  linkPlugin,
  linkDialogPlugin,
} from "@mdxeditor/editor";
const BlogEditor = ({
  markdown,
  onChange,
}: {
  markdown: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div>
      <MDXEditor
        markdown={markdown}
        onChange={(value) => {
          onChange(value);
        }}
        plugins={[
          headingsPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          toolbarPlugin({
            toolbarClassName: "my-classname",

            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <CreateLink></CreateLink>
              </>
            ),
          }),
        ]}
      ></MDXEditor>
    </div>
  );
};

export default BlogEditor;
