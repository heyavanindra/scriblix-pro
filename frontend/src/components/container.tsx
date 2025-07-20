import cn from "../utils/cn";
import Footer from "./footer";
import Navbar from "./Navbar";

type ContainerProps = { className?: string; children: React.ReactNode };

const Container = ({ className, children }: ContainerProps) => {
  return (
    <section className={cn("", className)}>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </section>
  );
};

export default Container;
