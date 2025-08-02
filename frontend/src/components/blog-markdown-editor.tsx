import { Link } from "react-router-dom";
import AnimationWrapper from "./page-animation";
import React, { useEffect } from "react";
import {
  getImageUrl,
  uploadImageByUrl,
  uploadImageByFile,
} from "../utils/cloudinary";
import { toast } from "react-hot-toast";
import { blogStore } from "../state/zustand";
import EditorJS, { type OutputData } from "@editorjs/editorjs";
import EditorjsList from "@editorjs/list";
//@ts-expect-error "eihrhweer"
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import ImageTool from "@editorjs/image";
import Header from "@editorjs/header";
import InlineCode from "@editorjs/inline-code";
import Paragraph from "@editorjs/paragraph";
//@ts-expect-error "eihrhweer"
import Embed from "@editorjs/embed";

const BlogEditor = () => {
  const { blog, setBlog, textEditor, setEditorState, setTextEditor } =
    blogStore();
  const { banner, content, title } = blog;

  useEffect(() => {
    const editor = new EditorJS({
      holder: "textEditor",
      data: content,
      tools: {
        paragraph: {
          //@ts-expect-error i dont know how to fix it for now
          class: Paragraph,
          inlineToolbar: true,
        },
        List: {
          //@ts-expect-error idont know how to fix it
          class: EditorjsList,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        header: {
          //@ts-expect-error might fix is later (so far its working)
          class: Header,
          inlineToolbar: true,
          config: {
            placeholder: "Type Heading",
            levels: [2, 3],
            defaultLevel: 2,
          },
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByUrl: uploadImageByUrl,

              uploadByFile: uploadImageByFile,
            },
          },
        },
        qoute: {
          class: Quote,
          inlineToolbar: true,
        },
        marker: Marker,
        inlineCode: InlineCode,
        embed: Embed,
      },
      placeholder: "Lets Write A Awesome Story",
      onReady: () => {
        console.log("Editor is Ready to work");
      },
    });

    editor.isReady.then(() => {
      setTextEditor(editor);
    });
  }, []);

  const handlePublish = async () => {
    if (!banner) {
      toast.error("Please add banner");
    }
    if (!title) {
      toast.error("Please Add title");
    }
    if (!textEditor) {
      toast.error("no text editor");
      return;
    }

    try {
      const data: OutputData = await textEditor.save();
      console.log(data);
      if (data.blocks.length) {
        setBlog({
          ...blog,
          content: data,
        });
        setEditorState("publish");
      } else {
        toast.error("Write something in your blog to publish it");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in handle publish");
    }
  };

  const handleOnchangeImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const url = await getImageUrl(e);

      setBlog({
        ...blog,
        banner: url,
      });
    } catch (error) {
      toast.error("Something went wrong while uploading image");
      console.error(error);
    }
  };

  {
    /* Handle Title Resize */
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  {
    /* Handle text area change */
  }

  const handletitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    setBlog({
      ...blog,
      title: input.value,
    });
  };

  return (
    <>
      <nav className="z-10 sticky top-0 flex items-center gap-12 w-full px-[5vw] py-5 h-[80px] border-b border-grey bg-main">
        <Link to={"/"} className="flex-none w-10">
          <h1>Logo</h1>
        </Link>
        <p className="max-md:hidden text-primary-text line-clamp-1 w-full">
          {title.length ? title : "New Blog"}
        </p>
        <div className="flex items-center mx-auto gap-x-2">
          <button
            className="rounded-4xl bg-primary-text text-main font-semibold px-4 h-9 py-2 text-center cursor-pointer"
            onClick={handlePublish}
          >
            Publish
          </button>
          <button className="bg-main px-4 border rounded-4xl h-9 w-28 cursor-pointer text-primary-text border-primary-text">
            Save draft
          </button>
        </div>
      </nav>
      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative hover:opacity-80 aspect-video bg-main border-4 border-gray-500">
              <label htmlFor="uploadBanner">
                <img
                  src={banner ? banner : "/vite.svg"}
                  alt=""
                  className="z-20"
                />
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png,.jpg"
                  hidden
                  onChange={handleOnchangeImage}
                />
              </label>
            </div>
            <textarea
              defaultValue={title}
              placeholder="blog title"
              className="text-4xl font-medium  w-full h-20 outline-none resize-none leading-tight mt-10 placeholder:opacity-40 ring-2 rounded-2xl"
              id=""
              onKeyDown={handleTitleKeyDown}
              onChange={handletitleChange}
            />
            <hr className="w-full opacity-10 my-5" />
            <div id="textEditor" className="font-body"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
