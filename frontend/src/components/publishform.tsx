import { IconX } from "@tabler/icons-react";
import AnimationWrapper from "./page-animation";
import { blogStore } from "../state/zustand";
import type React from "react";
import Tags from "./tag.component";
import { toast } from "react-toastify";
import  { AxiosError } from "axios";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../libs/api";


const PublishForm = () => {
  const { setEditorState, blog, setBlog } = blogStore();
  const [submitting, setSubmitting] = useState(false)
  const redirect = useNavigate();

  const characterLimit = 200;
  const tagLimit = 5;
  const handleCloseEvent = () => {
    setEditorState("editor");
  };

  const handleTitleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlog({
      ...blog,
      title: e.target.value,
    });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setBlog({
      ...blog,
      des: e.target.value,
    });
  };

  const handleDescriptionKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleKeydownFunction = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    if (e.key === "Enter") {
      if (blog.tags.length < tagLimit) {
        if (!blog.tags.includes(value)) {
          setBlog({
            ...blog,
            tags: [...blog.tags, value],
          });
        }
      } else {
        toast.error(`You can add max ${tagLimit} tags`);
      }
      (e.target as HTMLInputElement).value = "";
    }
  };

  const publishBlogHandler = async () => {
    if (submitting) {
      return
    }
 
    if (!blog.title) {
      return toast.error("Write blog title before publishing");
    }

    if (!blog.des.length || blog.des.length > 200) {
      return toast.error(
        `Write a description about your blog within ${characterLimit} Characters to publish`
      );
    }

    if (!blog.tags.length) {
      return toast.error("Enter at least 1 tag to help us rank yout blog");
    }

    const loadingToast = toast.loading("Publishing.....");

    const { title, banner, content, des, tags } = blog;
    const blogObj = {
      title,
      banner,
      content,
      des,
      tags,
      draft: false,
    };
    setSubmitting(true)

    try {
      await api.post(`/article`, blogObj);
      setSubmitting(false)
      toast.dismiss(loadingToast);
      toast.success("Published");
      setTimeout(() => {
        redirect("/");
      }, 500);
    } catch (err) {
      setSubmitting(false)
      toast.dismiss(loadingToast);
      console.error(err);
      
      const error = err as AxiosError<{ message: string; errors: string }>;
      return toast.error(
        `${error.response?.data.errors} || Something went wrong while publishing blog`
      );
    }finally{
      setSubmitting(false)
    }
  };

  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 px-6 relative">
        <button
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%] flex items-center justify-center hover:bg-gray-100 rounded-full transition"
          onClick={handleCloseEvent}
        >
          <IconX />
        </button>

        <div className="max-w-[550px] w-full mx-auto">
          <p className="text-neutral-700 mb-1 text-sm">Preview</p>
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-300 mt-4">
            <img
              src={blog.banner ? blog.banner : "/vite.svg"}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-semibold mt-4 leading-tight line-clamp-1 break-words">
            {blog.title}
          </h1>
          <p className="font-body text-xl leading-7 mt-4 line-clamp-2 text-gray-700">
            {blog.des}
          </p>
        </div>

        <div className="max-w-[550px] w-full mx-auto mt-12 lg:mt-0 space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Blog Title</p>
            <input
              type="text"
              placeholder="Blog Title"
              defaultValue={blog.title}
              onChange={handleTitleChangeEvent}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">
              A short Description About Your blog
            </p>
            <textarea
              maxLength={characterLimit}
              defaultValue={blog.des}
              onChange={handleDescriptionChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black resize-none h-32"
              onKeyDown={handleDescriptionKeyDown}
            ></textarea>
          </div>

          <p className="text-sm text-gray-500 text-right">
            {characterLimit - blog.des.length} Characters Left
          </p>
          <p>Topic- ( Help In searching and Ranking you blog)</p>
          <div className="relative  pl-2 py-2 pb-4">
            <input
              type="text"
              placeholder="Topics"
              className="sticky bg-main"
              onKeyDown={handleKeydownFunction}
            />
            {blog.tags.map((tag, idx) => (
              <Tags key={`${tag}+${idx}`} tag={tag}></Tags>
            ))}
            <p>{tagLimit - blog.tags.length} Tags Left</p>
          </div>
          <button
            className="px-4 py-1 bg-accent text-primary-text rounded-full drop-shadow-black cursor-pointer text-shadow-xl font-body hover:scale-103 active:scale-100 transition-all duration-300 ease-in-out "
            onClick={publishBlogHandler}
            disabled={submitting}
          >
            Publish
          </button>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
