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
          {project.project_concept_name || "Problem & Solutions"}
        </h4>
      </div>

      <div className="mt-[50px]">
        {project.project_concepts.map((concept, index) => (
          <div key={index} className="flex flex-col lg:flex-row gap-2 mb-8">
            {/* Left */}
            <div className="flex h-auto">
              <div className="flex flex-col justify-start lg:-mt-[54px]">
                <h6 className="text-2xl xl:text-3xl font-bold text-[#1D9ED9] leading-[38.955px]">
                  {concept.start_title}
                </h6>
                <p className="max-w-sm sm:max-w-lg lg:max-w-[345px] text-base xl:text-xl font-normal leading-[33.6px] text-white">
                  {concept.start_desc}
                </p>
              </div>
            </div>

            {/* Desktop Center View */}
            <div className="hidden lg:flex gap-[10px]">
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

            {/* Mobile Center View */}
            <div className="flex flex-col lg:hidden gap-[10px] items-center">
              <div className="flex flex-col h-auto mb-[16px] ml-[72px]">
                <Image
                  src="/icons/think_icon.svg"
                  alt="idea-icon"
                  height={40}
                  width={40}
                  className="h-10 min-w-10 w-10 min-h-10"
                />
              </div>
              <Image
                src="/icons/wave_icon.svg"
                alt="wave-icon"
                height={150}
                width={200}
                className="min-w-[200px] min-h-[150px] transform rotate-90"
              />
              <div className="flex flex-col h-auto justify-center mt-5 mr-[72px]">
                <Image
                  src="/icons/mark_done_icon.svg"
                  alt="mark-done"
                  height={40}
                  width={40}
                  className="h-10 min-w-10 w-10 min-h-10"
                />
              </div>
            </div>

            {/* Right */}
            <div className="flex h-auto">
              <div className="flex flex-col justify-end lg:ml-2.5 lg:mt-20 mb-4 lg:mb-0">
                <h6 className="text-2xl xl:text-3xl font-bold text-[#1D9ED9] leading-[38.955px]">
                  {concept.end_title}
                </h6>
                <p className="max-w-sm sm:max-w-lg lg:max-w-[345px] text-base xl:text-xl font-normal leading-[33.6px] text-white">
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
