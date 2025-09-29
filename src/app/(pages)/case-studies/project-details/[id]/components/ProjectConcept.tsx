import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { WaveAnimation } from "./WaveAnimation";
import { AnimatedMarkDoneIcon } from "@/app/components/common/AnimatedMarkDoneIcon";
import { AnimatedThinkIcon } from "@/app/components/common/AnimatedThinkIcon";

// --- TYPE DEFINITIONS ---
interface ProjectConcept {
  start_title: string;
  start_desc: string;
  end_title: string;
  end_desc: string;
}

interface Project {
  _id: string;
  project_concept_name: string;
  project_concepts: ProjectConcept[];
}

interface ProjectConceptProps {
  project: Project;
}

// --- ANIMATION VARIANTS ---

const thinkIconVariants = {
  initial: { filter: "none" },
  thinkGlow: {
    filter: "drop-shadow(0 0 10px #1D9ED9)",
  },
  lightTravel: { filter: "none" },
  markGlow: { filter: "none" },
};

const markIconVariants = {
  initial: { filter: "none" },
  thinkGlow: { filter: "none" },
  lightTravel: { filter: "none" },
  markGlow: {
    filter: "drop-shadow(0 0 10px #1D9ED9)",
  },
};

// --- COMPONENT ---

const ProjectConcept = ({ project }: ProjectConceptProps) => {
  return (
    <section
      className="px-4 md:px-16 xl:px-[90px] py-[38px] w-full flex flex-col gap-0 lg:gap-[50px] "
      style={{
        backgroundImage: " url('/images/project_concept_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex gap-1.5 items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          className="h-5 w-5"
        >
          <Image
            src="/icons/flower_icon.svg"
            alt="flower-icon"
            width={20}
            height={20}
          />
        </motion.div>
        <h4 className="text-2xl text-[34px] font-bold leading-[56px]">
          {project.project_concept_name || "Problem & Solution"}
        </h4>
      </div>

      <div className="mt-[50px]">
        {project.project_concepts.map((concept, index) => (
          <ConceptItem key={index} concept={concept} />
        ))}
      </div>
    </section>
  );
};

// --- SINGLE CONCEPT ITEM COMPONENT (for cleaner logic) ---

const ConceptItem = ({ concept }: { concept: ProjectConcept }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  // Trigger animation when the component is 50% in view, and only run it once
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    // Define the animation sequence using async/await
    const sequence = async () => {
      // Slight delay after section is in view and data loaded
      await new Promise((resolve) => setTimeout(resolve, 600));
      // 1. Start the 'thinkGlow' state and wait for its animation to complete
      await controls.start("thinkGlow");
      // Slight delay before starting wave animation
      await new Promise((resolve) => setTimeout(resolve, 500));
      // 2. Start 'lightTravel' and wait for it to complete
      await controls.start("lightTravel");
      // 3. Start 'markGlow' and wait for it to complete
      await controls.start("markGlow");
    };

    if (isInView) {
      sequence();
    }
  }, [isInView, controls]);

  return (
    <div ref={ref} className="flex flex-col lg:flex-row gap-2 mb-8">
      {/* Left Side: Problem */}
      <div className="flex h-auto">
        <div className="flex flex-col justify-start lg:-mt-[54px]">
          <h6 className="text-2xl xl:text-3xl font-bold text-[#1D9ED9] leading-[38.955px]">
            {concept.start_title}
          </h6>
          <p className="max-w-sm sm:max-w-lg lg:max-w-[345px] 2xl:max-w-xl text-base xl:text-xl font-normal leading-[33.6px] text-white">
            {concept.start_desc}
          </p>
        </div>
      </div>

      {/* Center Animation: Desktop */}
      <div className="hidden lg:flex gap-[10px] items-center relative">
        <motion.div
          initial="initial"
          animate={controls}
          variants={thinkIconVariants}
          transition={{ duration: 0.5 }}
          className="h-20 w-20 mt-[-110px]"
        >
          <AnimatedThinkIcon controls={controls} />
        </motion.div>

        <WaveAnimation controls={controls} />

        <motion.div
          initial="initial"
          animate={controls}
          variants={markIconVariants}
          transition={{ duration: 0.5 }}
          className="h-[69px] w-[69px] mt-[116px]"
        >
          <AnimatedMarkDoneIcon controls={controls} />
        </motion.div>
      </div>

      {/* Mobile Center View */}
      <div className="flex flex-col lg:hidden gap-4 items-center">
        <motion.div
          initial="initial"
          animate={controls}
          variants={thinkIconVariants} // Glow for mobile
          className="h-14 w-14 ml-[85px]"
        >
          <AnimatedThinkIcon controls={controls} />
        </motion.div>

        <WaveAnimation controls={controls} isMobile={true} />

        <motion.div
          initial="initial"
          animate={controls}
          variants={markIconVariants} // Glow for mobile
          className="h-14 w-14 mr-[85px]"
        >
          <AnimatedMarkDoneIcon controls={controls} />
        </motion.div>
      </div>

      {/* Right Side: Solution */}
      <div className="flex h-auto">
        <div className="flex flex-col justify-end lg:ml-2.5 lg:mt-20 mb-4 lg:mb-0">
          <h6 className="text-2xl xl:text-3xl font-bold text-[#1D9ED9] leading-[38.955px]">
            {concept.end_title}
          </h6>
          <p className="max-w-sm sm:max-w-lg lg:max-w-[345px] 2xl:max-w-xl text-base xl:text-xl font-normal leading-[33.6px] text-white">
            {concept.end_desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectConcept;
