import Container from "../components/container";
import LatestBlogs from "../components/latest-blogs";
import SubscribeCard from "../components/subscribe-card";

const Home = () => {
  return (
    <Container className="">
      <div className="relative flex  font-style flex-col items-center   min-h-screen bg-main ">
        <div className="mt-40 text-center tracking-wider">
          <h1 className="text-9xl text-primary-text font-bold  font-body mb-4 ">
            Read under 5 minutes.
          </h1>
        </div>
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -z-0 w-full overflow-hidden">
          <img
            src="/arc.svg"
            alt="Arc Background"
            className="w-[2000px] mx-auto opacity-80"
          />
        </div>

        <LatestBlogs></LatestBlogs>
      </div>
      <div className="h-200 w-full bg-main flex items-center justify-center">
        <SubscribeCard></SubscribeCard>
      </div>
    </Container>
  );
};

export default Home;
