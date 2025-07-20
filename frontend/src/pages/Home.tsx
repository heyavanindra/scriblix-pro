import Container from "../components/container";
import Footer from "../components/footer";
import LatestBlogs from "../components/latest-blogs";
import SubscribeCard from "../components/subscribe-card";
import { motion } from "motion/react";
import WavySvg from "../components/wacy-svg";

const Home = () => {
  return (
    <Container className="">
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
            transition={{ duration: 0.5,
              ease: "easeInOut"
             }}
          >
            Read under 5 minutes.
          </motion.h1>
        </div>
        <div className="absolute top-[30%] max-lg:top-[20%] left-1/2 -translate-x-1/2 -z-0 w-full overflow-hidden">
          <WavySvg />
        </div>

        <LatestBlogs></LatestBlogs>
      </div>
      <div className="max-lg:py-30 lg:pb-50 w-full bg-main flex items-center justify-center">
        <SubscribeCard></SubscribeCard>
      </div>
      <Footer></Footer>
    </Container>
  );
};

export default Home;
