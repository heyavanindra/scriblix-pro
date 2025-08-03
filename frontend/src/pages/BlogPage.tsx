import { useParams } from "react-router-dom";
import api from "../libs/api";
import toast, { LoaderIcon } from "react-hot-toast";
import { useEffect, useState } from "react";
import AnimationWrapper from "../components/page-animation";
import type { AxiosError } from "axios";
import BlockContent from "../components/BlockContent";

type BlockType = {
  id: string;
  type: string;
  data: {
    caption: string;
    text: "string";
    level?: number;
    file: {
      url: string;
    };
  };
};

type ContentType = {
  version: string;
  time: number;
  blocks: BlockType[];
};

type BlogType = {
  title: string;
  des: string;
  slug: string;
  tags: string[];
  featuredImage: string;
  activity: {
    total_likes: number;
    total_comments: number;
    total_reads: number;
  };
  author: {
    personal_info: {
      username: string;
    };
  };
  content: ContentType[];
  publishedAt: Date;
};

const BlogPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/article/${slug}`);
      console.log(response.data.blog);
      setBlog(response.data.blog);
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError<{ message: string }>;
      setError(axiosError.response?.data.message);
      toast.error("Error while Fetching blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
    if (error) {
      toast.error("Error occured while fetching the blog")
    }
  }, []);

  return (
  <AnimationWrapper>
    {loading ? (
      <div className="flex justify-center items-center h-screen">
        <LoaderIcon className="text-3xl" />
      </div>
    ) : (
      <>
        {blog === null ? (
          <div className="text-center text-xl font-semibold mt-20">
            Blog Not Found
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="flex flex-col items-center gap-4 mb-10">
              <img
                src={blog.featuredImage}
                alt="Banner"
                className="w-full max-h-[400px] object-cover rounded-lg shadow-md"
              />
              <h1 className="text-4xl font-bold text-center">{blog.title}</h1>
              <div className="flex gap-4 text-gray-600 text-sm">
                <p>By @{blog.author.personal_info.username}</p>
                <p>• {new Date(blog.publishedAt).toDateString()}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              {blog.content[0].blocks.map((block, idx) => (
                <BlockContent block={block} key={`${block.id + idx}`} />
              ))}
            </div>
          </div>
        )}
      </>
    )}
  </AnimationWrapper>
);

};

export default BlogPage;
