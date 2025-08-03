import React from "react";
import { AnimatePresence, type MotionProps, motion } from "motion/react";

type AnimatePresenceType = {
  children: React.ReactNode;
  initial?: MotionProps["initial"];
  animate?: MotionProps["animate"];
  transition?: MotionProps["transition"];
  keyvalue?: string;
};

const AnimationWrapper = ({
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = {
    duration: 0.5,
  },
  keyvalue,
}: AnimatePresenceType) => {
  return (
    <AnimatePresence>
      <motion.div
        key={keyvalue}
        initial={initial}
        animate={animate}
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationWrapper;
