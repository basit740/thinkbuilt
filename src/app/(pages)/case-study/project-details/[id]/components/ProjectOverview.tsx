import Carousel from "@/app/components/ui/Carousel";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

interface Project {
  _id: string;
  project_name: string;
  project_overview: string;
  technology_used: { tech_name: string }[];
  pages_images_urls: string[];
  time_duration: string;
  completion_date: string;
}

interface ProjectOverviewProps {
  project: Project;
}

const ProjectOverview = ({ project }: ProjectOverviewProps) => {
  const formatCompletionDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <section className="mt-[120px] mb-[80px] flex flex-col gap-10 px-4 md:px-16 xl:px-[90px] ">
      {/* Project Overview */}
      <div className="flex flex-col lg:flex-row gap-[56px] justify-between">
        {/* Overview */}
        <motion.div
          className="flex flex-row gap-[13.8px] items-start"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          >
            <Image
              src="/icons/flower_icon.svg"
              alt="flower-icon"
              width={37}
              height={37}
            />
          </motion.div>
          <div className="flex flex-col gap-3 lg:gap-[6.51px]">
            <motion.h2
              className="text-[58px] font-bold leading-[56px] w-full lg:max-w-[255px]"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Project <span className="text-[#1D9ED9]">Overview</span>
            </motion.h2>
            <motion.p
              className="w-full lg:max-w-xs"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {project.project_overview}
            </motion.p>
          </div>
        </motion.div>

        {/* Vertical Divider */}
        <div
          className="hidden lg:block h-auto w-[0.5px] bg-[#787878]"
          role="separator"
          aria-orientation="vertical"
        />

        {/* Horizontal Divider */}
        <div
          className="block lg:hidden h-px w-full bg-[#787878]"
          role="separator"
          aria-orientation="horizontal"
        />

        {/* Tech Used */}
        <motion.div
          className="flex flex-col gap-[28px] justify-start items-center w-full lg:max-w-md"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="flex gap-1.5 items-center"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
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
              Technology Used
            </h4>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-[10.3px] justify-center"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {project.technology_used.map((tech, index) => (
              <div
                key={index}
                className="rounded-[176px] px-[31.5px] py-[8.58px] text-[22px] font-normal leading-[32.601px] text-[#B1B1B1] border border-[#B9B9B9] bg-[#F6F6F61A]"
              >
                {tech.tech_name}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Vertical Divider */}
        <div
          className="hidden lg:block h-auto w-[0.5px] bg-[#787878]"
          role="separator"
          aria-orientation="vertical"
        />

        {/* Horizontal Divider */}
        <div
          className="block lg:hidden h-px w-full bg-[#787878]"
          role="separator"
          aria-orientation="horizontal"
        />

        {/* Duration */}
        <motion.div
          className="flex flex-col gap-[14.08px] justify-start items-center"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="flex gap-1.5 items-center"
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
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
            <h4 className="text-[34px] font-bold leading-[56px]">Duration</h4>
          </motion.div>

          <motion.div
            className="px-[17px] py-[15px] rounded-[18px] border-2 border-[#B9B9B9] text-lg font-normal leading-[32.04px] tracking-[0.36px]"
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p>
              By: <span className="text-[#1D9ED9]">ThinkBuildSolutions</span>
            </p>
            <p>
              Time Duration:{" "}
              <span className="text-[#1D9ED9]">{project.time_duration}</span>
            </p>
            <p>{formatCompletionDate(project.completion_date)}</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="w-full">
        <Carousel
          images={
            project.pages_images_urls.length > 0
              ? project.pages_images_urls
              : [
                  "/images/project_thumbnail.png",
                  "/images/project_card_bg.png",
                  "/images/case_study_hero_bg.webp",
                ]
          }
        />
      </div>
    </section>
  );
};

export default ProjectOverview;
