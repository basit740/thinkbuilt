/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { motion } from "framer-motion";

// This is the string you copied from the d="..." attribute in your wave_icon.svg file.
const pathData =
  "M0 1H125.122C137.272 1 147.122 10.8497 147.122 23V87C147.122 99.1503 156.971 109 169.122 109H300";

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

export const WaveAnimation = ({
  controls,
  isMobile = false,
}: WaveAnimationProps) => {
  if (isMobile) {
    // You can easily adjust the size by changing this scale value (e.g., 0.8 = 80% size)
    const scale = 0.8;

    // Calculate the new dimensions based on the scale factor
    const mobileWidth = 110 * scale;
    const mobileHeight = 300 * scale;

    return (
      <div
        className="relative"
        style={{ width: mobileWidth, height: mobileHeight }}
      >
        <div
          // The inner container is now scaled down using the transform property
          className="absolute top-0 w-[300px] h-[110px]"
          style={{
            left: mobileWidth, // The left offset is also updated to match the new width
            transform: `rotate(90deg) scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {/* The SVG and motion.div below are completely UNCHANGED, preserving the animation */}
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
              pathLength="1"
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
              offsetPath: `path("${pathData}")`,
            }}
          />
        </div>
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
