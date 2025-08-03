import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import api from "../libs/api";

// article/top

type BlogType = {
  title: string;
  des: string;
  slug: string;
  featuredImage: string;
  author: {
    personal_info: {
      username: string;
    };
  };
}[];

const LatestBlogs = () => {
  // const blogs = [
  //   {
  //     title: "Know how to blunder your queen in 2 moves",
  //     src: "",
  //   },
  //   {
  //     title: "Why your knight hates you — and how to fix it",
  //     src: "",
  //   },
  //   {
  //     title: "10 openings guaranteed to lose in under 5 minutes",
  //     src: "",
  //   },
  //   {
  //     title: "I played the Bongcloud for 30 days. Here’s what happened",
  //     src: "",
  //   },
  //   {
  //     title: "This one trick made Magnus quit our game (not clickbait)",
  //     src: "",
  //   },
  //   {
  //     title: "The psychology behind rage quitting on move 3",
  //     src: "",
  //   },
  //   {
  //     title: "ChessGPT told me to sack my queen — so I did",
  //     src: "",
  //   },
  //   {
  //     title: "How to beat your little cousin and feel zero guilt",
  //     src: "",
  //   },
  //   {
  //     title: "Avoid these 5 endgame mistakes unless you hate winning",
  //     src: "",
  //   },
  //   {
  //     title: "I tried playing blindfold chess... and stubbed my toe",
  //     src: "",
  //   },
  // ];

  const [blogs, setBlogs] = useState<BlogType | null>(null);
  const [topBlogs, setTopBlogs] = useState<BlogType | null>(null);
  const fetchLatestBlogData = async () => {
    try {
      const response = await api.get(`/article/latest`);

      setBlogs(response.data.blog);
    } catch (error) {
      console.error(error);
      toast.error("Error while Fetching the latest blogs");
    }
  };

  const fetchTopBlogData = async () => {
    try {
      const response = await api.get(`/article/top`);
      setTopBlogs(response.data.blog);
    } catch (error) {
      console.error(error);
      toast.error("Error while Fetching the top blogs");
    }
  };

  useEffect(() => {
    fetchLatestBlogData();
    fetchTopBlogData();
  }, []);

  return (
    <section className="px-4 py-8 mt-20 lg:mt-30 ">
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-x-8 max-lg:gap-y-10">
        <div>
          <h2 className="font-semibold text-primary-text font-body text-lg px-4 py-2 max-lg:text-4xl">
            Latest
          </h2>

          <div className="flex flex-col gap-y-5">
            {blogs === null
              ? [1, 2, 3].map((_, idx) => (
                  <div
                    key={`skeleton-${idx}`}
                    className="bg-bg-card animate-pulse rounded-xl p-4 flex gap-4 items-center"
                  >
                    <div className="w-16 h-16 bg-gray-300 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-3/4" />
                      <div className="h-4 bg-gray-300 rounded w-1/2" />
                    </div>
                  </div>
                ))
              : blogs
                  .slice(0, 3)
                  .map((blog, idx) => (
                    <Card
                      key={blog.title + idx}
                      title={blog.title}
                      slug={blog.slug}
                      src={blog.featuredImage}
                    />
                  ))}
          </div>
        </div>
        <div>
          <h2 className="font-semibold font-body text-primary-text text-lg px-4 py-2 max-lg:text-4xl">
            Top
          </h2>
          <div className="flex flex-col gap-y-5 ">
            {topBlogs === null
              ? [1, 2, 3].map((_, idx) => (
                  <div
                    key={`skeleton-${idx}`}
                    className="bg-bg-card animate-pulse rounded-xl p-4 flex gap-4 items-center"
                  >
                    <div className="w-16 h-16 bg-gray-300 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-3/4" />
                      <div className="h-4 bg-gray-300 rounded w-1/2" />
                    </div>
                  </div>
                ))
              : topBlogs
                  .slice(0, 3)
                  .map((blog, idx) => (
                    <Card
                      key={idx}
                      title={blog.title}
                      src={blog.featuredImage}
                      slug={blog.slug}
                    />
                  ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Card = ({
  title,
  src,
  slug,
}: {
  title: string;
  src: string;
  slug: string;
}) => {
  return (
    <Link
      to={`/blog/${slug}`}
      className="bg-bg-card hover:border-accent hover:border cursor-pointer rounded-xl  p-4 flex gap-4 items-center hover:shadow-lg transition-shadow duration-300"
    >
      <div className="w-16 h-16  rounded-lg overflow-hidden flex-shrink-0">
        <img src={src} alt={title} className="w-full h-full object-cover" />
      </div>

      <p className="text-primary-text font-body">{title}</p>
    </Link>
  );
};

export default LatestBlogs;
