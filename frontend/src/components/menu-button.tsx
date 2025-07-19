import React from "react";
import { motion,type Transition, type SVGMotionProps , type MotionProps} from "motion/react";
import cn from "../utils/cn";

type MenuButtonProps = {
  isOpen?: boolean;
  width?: number;
  height?: number;
  strokeWidth?: number;
  color?: string;
  transition?: Transition;
  lineProps?: SVGMotionProps<SVGLineElement>;
  className?: string;
} &  Omit<React.SVGProps<SVGSVGElement>, keyof MotionProps>;

const MenuButton: React.FC<MenuButtonProps> = ({
  isOpen = false,
  width = 24,
  height = 24,
  strokeWidth = 1,
  color = "#000",
  transition,
  lineProps,
  className,
  ...props
}) => {
  const variant = isOpen ? "opened" : "closed";

  const top = {
    closed: { rotate: 0, translateY: 0 },
    opened: { rotate: 45, translateY: 2 },
  };

  const center = {
    closed: { opacity: 1 },
    opened: { opacity: 0 },
  };

  const bottom = {
    closed: { rotate: 0, translateY: 0 },
    opened: { rotate: -45, translateY: -2 },
  };

  const sharedLineProps: SVGMotionProps<SVGLineElement> = {
    stroke: color,
    strokeWidth: strokeWidth,
    vectorEffect: "non-scaling-stroke",
    initial: "closed",
    animate: variant,
    transition,
    ...lineProps,
  };

  const unitHeight = 4;
  const unitWidth = (unitHeight * width) / height;

  return (
    <motion.svg
      viewBox={`0 0 ${unitWidth} ${unitHeight}`}
      overflow="visible"
      preserveAspectRatio="none"
      width={width}
      height={height}
      {...props}
      className={cn("", className)}
    >
      <motion.line
        x1="0"
        x2={unitWidth}
        y1="0"
        y2="0"
        variants={top}
        {...sharedLineProps}
      />
      <motion.line
        x1="0"
        x2={unitWidth}
        y1="2"
        y2="2"
        variants={center}
        {...sharedLineProps}
      />
      <motion.line
        x1="0"
        x2={unitWidth}
        y1="4"
        y2="4"
        variants={bottom}
        {...sharedLineProps}
      />
    </motion.svg>
  );
};

export { MenuButton };
