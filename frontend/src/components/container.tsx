import cn from "../utils/cn";
import Navbar from "./Navbar";

type ContainerProps = { className?: string; children: React.ReactNode };

const Container = ({ className, children }: ContainerProps) => {
  return (
    <div className={cn("", className)}>
      <Navbar></Navbar>
      {children}
    </div>
  );
};

export default Container;
