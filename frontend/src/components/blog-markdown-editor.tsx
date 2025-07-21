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
  InsertImage,
  imagePlugin,
} from "@mdxeditor/editor";
const BlogEditor = ({
  markdown,
}: {
  markdown: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div>
      <MDXEditor
        markdown={markdown}
        plugins={[
          headingsPlugin(),
          linkPlugin(),
          imagePlugin({
            imageUploadHandler: () => {
              return Promise.resolve("https://picsum.photos/200/300");
            },
            imageAutocompleteSuggestions: [
              "https://picsum.photos/200/300",
              "https://picsum.photos/200",
            ],
          }),
          linkDialogPlugin(),
          toolbarPlugin({
            toolbarClassName: "my-classname",

            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <CreateLink></CreateLink>
                <InsertImage></InsertImage>
              </>
            ),
          }),
        ]}
      ></MDXEditor>
    </div>
  );
};

export default BlogEditor;
