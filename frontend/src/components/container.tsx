import cn from "../utils/cn";
import Footer from "./footer";
import Navbar from "./Navbar";
import AnimationWrapper from "./page-animation";

type ContainerProps = { className?: string; children: React.ReactNode, key:string };

const Container = ({ className, children ,key }: ContainerProps) => {
  return (
    <AnimationWrapper keyvalue={key}>
    <section className={cn("", className)}>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </section>
    </AnimationWrapper>
  );
};

export default Container;
