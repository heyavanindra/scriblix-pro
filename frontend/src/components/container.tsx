import cn from "../utils/cn";
import Footer from "./footer";
import Navbar from "./Navbar";
import AnimationWrapper from "./page-animation";

type ContainerProps = { className?: string; children: React.ReactNode, keyval:string };

const Container = ({ className, children ,keyval }: ContainerProps) => {
  return (
    <AnimationWrapper keyvalue={keyval}>
    <section className={cn("", className)}>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </section>
    </AnimationWrapper>
  );
};

export default Container;
