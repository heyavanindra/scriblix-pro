import Container from "../components/container";
import LatestBlogs from "../components/latest-blogs";
import SubscribeCard from "../components/subscribe-card";
import { motion } from "motion/react";
import WavySvg from "../components/wacy-svg";
import { Helmet } from "react-helmet-async";

const Home = () => {
  console.log(`${window.location.origin}`);
  return (
    <Container keyval="home-container" className="">
      <Helmet>
        <title>Blog — Read Under 5 Minutes</title>
        <meta
          name="description"
          content="Bite-sized blogs for the curious mind. Stay updated with the latest stories, dev insights, and ideas — all under 5 minutes."
        />

        <meta property="og:title" content="Blog — Read Under 5 Minutes" />
        <meta
          property="og:description"
          content="Bite-sized blogs for the curious mind. Stay updated with the latest stories, dev insights, and ideas — all under 5 minutes."
        />
        <meta
          property="og:image"
          content={`${window.location.origin}/banner.png`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}`} />
        <meta property="og:site_name" content="Blog" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog — Read Under 5 Minutes" />
        <meta
          name="twitter:description"
          content="Bite-sized blogs for the curious mind. Stay updated with the latest stories, dev insights, and ideas — all under 5 minutes."
        />
        <meta
          name="twitter:image"
          content={`${window.location.origin}/banner.png`}
        />
        <link rel="canonical" href={`${window.location.origin}`} />
      </Helmet>
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
          <LatestBlogs></LatestBlogs>
        </div>
      </div>
      <div className="max-lg:py-30 lg:pb-20 w-full bg-main flex items-center justify-center">
        <SubscribeCard></SubscribeCard>
      </div>
    </Container>
  );
};

export default Home;
