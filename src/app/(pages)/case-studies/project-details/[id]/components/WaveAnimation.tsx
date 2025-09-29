/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { motion } from "framer-motion";

// This is the string you copied from the d="..." attribute in your wave_icon.svg file.
const pathData = "M0 1H125.122C137.272 1 147.122 10.8497 147.122 23V87C147.122 99.1503 156.971 109 169.122 109H300";

// Animation variants for the traveling light dot
const lightDotVariants = {
  initial: { opacity: 0, offsetDistance: "0%" },
  thinkGlow: { opacity: 0 },
  lightTravel: {
    opacity: 1,
    offsetDistance: "100%",
  },
  markGlow: { opacity: 0 },
};

interface WaveAnimationProps {
  controls: any;
  isMobile?: boolean;
}

export const WaveAnimation = ({ controls, isMobile = false }: WaveAnimationProps) => {
  if (isMobile) {
    return (
      // Mobile View (Rotated)
      <div className="relative w-[150px] h-[150px] flex justify-center items-center">
        <svg
          width="150"
          height="150"
          viewBox="0 0 110 300" // ViewBox is swapped for rotation
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform"
        >
          {/* We rotate the path itself within the SVG canvas */}
          <path
            d={pathData}
            stroke="#1D9ED9"
            strokeWidth="2"
            pathLength="1" // Simplifies offset calculation
            transform="translate(55, 150) rotate(-90) translate(-150, -55)"
          />
        </svg>
        <motion.div
          initial="initial"
          animate={controls}
          variants={lightDotVariants}
          transition={{ duration: 2 }}
          className="absolute w-2 h-2 bg-[#1D9ED9] rounded-full"
          style={{
            filter: "drop-shadow(0 0 5px #1D9ED9)",
            offsetPath: `path("${pathData}")`,
            transform: "translate(55px, 150px) rotate(-90deg) translate(-150px, -55px)",
          }}
        />
      </div>
    );
  }

  return (
    // Desktop View
    <div className="relative w-[300px] h-[110px]">
      <svg
        width="300"
        height="110"
        viewBox="0 0 300 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={pathData}
          stroke="#1D9ED9"
          strokeWidth="2"
          pathLength="1" // Makes offsetDistance work as a percentage from 0 to 1
        />
      </svg>
      <motion.div
        initial="initial"
        animate={controls}
        variants={lightDotVariants}
        transition={{ duration: 3 }}
        className="absolute top-0 left-0 w-2 h-2 bg-[#1D9ED9] rounded-full"
        style={{
          filter: "drop-shadow(0 0 5px #1D9ED9)",
          offsetPath: `path("${pathData}")`, // This is the magic property!
        }}
      />
    </div>
  );
};