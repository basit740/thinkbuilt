// src/components/AnimatedThinkIcon.tsx

import React from "react";
import { motion } from "framer-motion";
import type { LegacyAnimationControls, Variants } from "framer-motion";

// Animation variants for the exclamation mark's vertical line
const exclamationLineVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  // Animate in when the 'thinkGlow' state starts
  thinkGlow: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  // Keep it visible for the rest of the sequence
  lightTravel: { opacity: 1, y: 0 },
  markGlow: { opacity: 1, y: 0 },
};

// Animation variants for the exclamation mark's dot
const exclamationDotVariants: Variants = {
  initial: { opacity: 0, scale: 0 },
  // Animate in slightly after the line for a nice effect
  thinkGlow: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "backOut", delay: 0.2 },
  },
  lightTravel: { opacity: 1, scale: 1 },
  markGlow: { opacity: 1, scale: 1 },
};

interface AnimatedThinkIconProps {
  controls: LegacyAnimationControls;
}

export const AnimatedThinkIcon = ({ controls }: AnimatedThinkIconProps) => {
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* The outer shape - this is not animated */}
      <path
        d="M39.9998 79C61.5226 79 78.9998 61.5228 78.9998 40C78.9998 18.4772 61.5226 1 39.9998 1C18.477 1 0.999817 18.4772 0.999817 40C0.999817 61.5228 18.477 79 39.9998 79Z"
        stroke="#1D9ED9"
        strokeWidth="2"
      />

      {/* The exclamation mark line - animated */}
      <motion.path
        d="M40 25V47"
        stroke="#1D9ED9"
        strokeWidth="4"
        strokeLinecap="round"
        initial="initial"
        animate={controls}
        variants={exclamationLineVariants}
      />

      {/* The exclamation mark dot - animated */}
      <motion.path
        d="M40 55V56"
        stroke="#1D9ED9"
        strokeWidth="5"
        strokeLinecap="round"
        initial="initial"
        animate={controls}
        variants={exclamationDotVariants}
      />
    </motion.svg>
  );
};
