import Container from "../components/container";
import LatestBlogs from "../components/latest-blogs";
import SubscribeCard from "../components/subscribe-card";
import { motion } from "motion/react";
import WavySvg from "../components/wacy-svg";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

const Home = () => {
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [topBlogs, setTopBlogs] = useState<BlogType | null>(null);
  const fetchLatestBlogData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/article/latest`
      );
      setBlog(response.data.blog);
    } catch (error) {
      console.error(error);
      toast.error("Error while Fetching the latest blogs");
    }
  };

  const fetchTopBlogData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/article/top`
      );
      setTopBlogs(response.data.blogs);
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
    <Container keyval="home-container" className="">
      <div className="relative flex  font-style flex-col items-center   min-h-screen bg-main ">
        <div className="mt-40 max-lg:mt-30 text-center tracking-wider">
          <motion.h1
            className="text-9xl max-lg:text-5xl max-xl:text-7xl text-primary-text font-bold  font-body mb-4 "
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            Read under 5 minutes.
          </motion.h1>
        </div>
        <div className="absolute top-[30%] max-lg:top-[20%] left-1/2 -translate-x-1/2 -z-0 w-full overflow-hidden pointer-events-none">
          <WavySvg />
        </div>
        <div>
          <LatestBlogs blogs={blog} topBlogs={topBlogs}></LatestBlogs>
        </div>
      </div>
      <div className="max-lg:py-30 lg:pb-20 w-full bg-main flex items-center justify-center">
        <SubscribeCard></SubscribeCard>
      </div>
    </Container>
  );
};

export default Home;
