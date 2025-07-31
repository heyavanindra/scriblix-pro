import React, { useEffect, useState } from "react";
import BlogEditor from "../components/blog-markdown-editor";
import { useForm } from "react-hook-form";
import { createPostSchema } from "../schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { z } from "zod";
import { motion } from "motion/react";

type CreatePostSchema = z.infer<typeof createPostSchema>;

const Editor = () => {
  const tagOptions = [
    "User",
    "Admin",
    "Guest",
    "Moderator",
    "Subscriber",
    "Contributor",
    "Author",
  ];
  const [markdown, setMarkdown] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const selectedTags = watch("tags");

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setValue("tags", [...selectedTags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setValue(
      "tags",
      selectedTags.filter((t) => t !== tag)
    );
  };

  async function submitHandler(data: CreatePostSchema) {
    const finalData = {
      ...data,
      content: markdown,
      author: "ehrweho",
    };
    console.log(finalData);

    try {
     const response = await axios.post("http://localhost:3000/api/v1/article",finalData)
     
      toast.success(response.data.message || "Post created successfully!");
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message || "Something went wrong");
    }
  }

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/image/upload",
        formData
      );
      setValue("featuredImage", response.data.imageUrl);
      setSuccess(true);
      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message || "Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setValue("content", markdown);
  }, [setValue, markdown]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-lg">
      <motion.form
        onSubmit={handleSubmit(submitHandler)}
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block font-semibold mb-1 text-gray-700">Title</label>
          <input
            type="text"
            {...register("title")}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <label className="block font-semibold mb-1 text-gray-700">Select Tags</label>
          <input type="hidden" {...register("tags")} />
          <select
            className="w-full border border-gray-300 p-2 rounded"
            onChange={(e) => addTag(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              -- Choose a tag --
            </option>
            {tagOptions.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          {errors.tags && (
            <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
          )}
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-red-600 hover:text-red-800 font-bold"
              >
                &times;
              </button>
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
        >
          <label className="block font-semibold mb-1 text-gray-700">Content</label>
          <BlogEditor markdown={markdown} onChange={setMarkdown} />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block font-semibold mb-1 text-gray-700">
            Featured Image
          </label>
          <input
            type="file"
            onChange={uploadImage}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {success && <p className="text-green-500 text-sm mt-1">Image uploaded!</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
        >
          <label className="block font-semibold mb-1 text-gray-700">Author</label>
          <input
            type="text"
            {...register("author")}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
          )}
        </motion.div>

        <motion.button
          type="submit"
          disabled={isSubmitting || loading}
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.02 }}
          className="w-full bg-blue-500 text-white py-2 rounded-md font-medium disabled:opacity-50 transition duration-300"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Editor;
