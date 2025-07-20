"use client";
import { motion } from "motion/react";

const WavySvg = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1920 400"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <clipPath id="revealClip">
          <motion.rect
            initial={{ width: 0 }}
            animate={{ width: 1920 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            height="100%"
            x="0"
            y="0"
          />
        </clipPath>
      </defs>

      <g clipPath="url(#revealClip)">
        <path
          d="M-0.5,202.438l-0.052,-4.876c652.442,-147.776 1292.83,-147.815 1921.12,0.004l-0.073,4.868c-627.563,-147.646 -1269.32,-147.598 -1921,0.004Z"
          fill="#ffb703"
        />
      </g>
    </svg>
  );
};

export default WavySvg;
