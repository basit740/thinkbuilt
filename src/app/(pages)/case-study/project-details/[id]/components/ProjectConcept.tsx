import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

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

const ProjectConcept = ({ project }: ProjectConceptProps) => {
  return (
    <section
      className="px-4 md:px-16 xl:px-[90px] py-[38px] w-full flex flex-col gap-[50px] "
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
        <h4 className="text-[34px] font-bold leading-[56px]">
          {project.project_concept_name || "Problem & Solutions"}
        </h4>
      </div>

      <div className="mt-[50px]">
        {project.project_concepts.map((concept, index) => (
          <div key={index} className="flex gap-2 mb-8">
            {/* Left */}
            <div className="flex h-auto">
              <div className="flex flex-col justify-start -mt-[54px]">
                <h6 className="text-3xl font-bold text-[#1D9ED9] leading-[38.955px]">
                  {concept.start_title}
                </h6>
                <p className="max-w-sm text-xl font-normal leading-[33.6px] text-white">
                  {concept.start_desc}
                </p>
              </div>
            </div>

            {/* Center */}
            <div className="flex gap-[10px]">
              <div className="flex flex-col h-auto">
                <Image
                  src="/icons/think_icon.svg"
                  alt="idea-icon"
                  height={80}
                  width={80}
                  className="h-20 min-w-20 w-20 min-h-20 mt-[-36px]"
                />
              </div>
              <Image
                src="/icons/wave_icon.svg"
                alt="wave-icon"
                height={108}
                width={300}
                className="w-full max-w-[300px] h-full max-h-[108px]"
              />
              <div className="flex flex-col h-auto justify-center">
                <Image
                  src="/icons/mark_done_icon.svg"
                  alt="mark-done"
                  height={69}
                  width={69}
                  className="h-[69px] min-w-[69px] w-[69px] min-h-[69px] mt-6"
                />
              </div>
            </div>

            {/* Right */}
            <div className="flex h-auto">
              <div className="flex flex-col justify-end ml-2.5 mt-20">
                <h6 className="text-3xl font-bold text-[#1D9ED9] leading-[38.955px]">
                  {concept.end_title}
                </h6>
                <p className="max-w-sm text-xl font-normal leading-[33.6px] text-white">
                  {concept.end_desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectConcept;
