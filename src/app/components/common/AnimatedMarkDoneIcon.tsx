// src/components/AnimatedMarkDoneIcon.tsx

import React from "react";
import { motion } from "framer-motion";
import type { LegacyAnimationControls } from "framer-motion";

// Variants for the checkmark path drawing animation
// The animation will trigger when the parent's animation state becomes "markGlow"
const checkmarkVariants = {
  // Initial state: path is not drawn
  initial: { pathLength: 0, opacity: 0 },
  thinkGlow: { pathLength: 0, opacity: 0 },
  lightTravel: { pathLength: 0, opacity: 0 },
  // Final state: path is drawn
  markGlow: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.7 },
  },
};

interface AnimatedMarkDoneIconProps {
  controls: LegacyAnimationControls;
}

export const AnimatedMarkDoneIcon = ({ controls }: AnimatedMarkDoneIconProps) => {
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 69 69"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* The outer circle - this is not animated */}
      <circle cx="34.5" cy="34.5" r="33.5" stroke="#1D9ED9" strokeWidth="2" />

      {/* The checkmark path - this will be animated */}
      <motion.path
        d="M22 34.5L30.5 43L47 26.5"
        stroke="#1D9ED9"
        strokeWidth="4" // Adjusted for better visibility
        strokeLinecap="round"
        strokeLinejoin="round"
        initial="initial"
        animate={controls}
        variants={checkmarkVariants}
      />
    </motion.svg>
  );
};