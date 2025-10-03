import Carousel from "@/app/components/ui/Carousel";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  const formatCompletionDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="mt-16 lg:mt-[120px] mb-10 lg:mb-[80px] flex flex-col gap-10 px-4 md:px-16 xl:px-[90px] ">
      {/* Project Overview */}
      <div className="flex flex-col lg:flex-row gap-9 lg:gap-[56px] justify-between">
        {/* Overview */}
        <motion.div
          key={`overview-${isMobile ? 'mobile' : 'desktop'}`}
          className="flex flex-row gap-2 lg:gap-[13.8px] items-start"
          initial={isMobile ? { y: -50, opacity: 0 } : { x: -50, opacity: 0 }}
          whileInView={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            className="w-20 h-14 lg:w-[37px] lg:h-[37px] lg:mt-2"
          >
            <Image
              src="/icons/flower_icon.svg"
              alt="flower-icon"
              width={37}
              height={37}
              className="w-20 h-14 lg:w-[37px] lg:h-[37px]"
            />
          </motion.div>
          <div className="flex flex-col gap-3 lg:gap-[6.51px]">
            <motion.h2
              key={`overview-title-${isMobile ? 'mobile' : 'desktop'}`}
              className="text-white text-5xl lg:text-[58px] font-bold leading-[56px] w-full lg:max-w-[255px]"
              initial={isMobile ? { y: -30, opacity: 0 } : { x: -30, opacity: 0 }}
              whileInView={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Project <span className="text-[#1D9ED9]">Overview</span>
            </motion.h2>
            <motion.p
              key={`overview-desc-${isMobile ? 'mobile' : 'desktop'}`}
              className="w-full lg:max-w-xs"
              initial={isMobile ? { y: -30, opacity: 0 } : { x: -30, opacity: 0 }}
              whileInView={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
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
            className="flex gap-1.5 w-full items-center justify-start lg:justify-center"
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
            <h4 className="text-white text-3xl lg:text-[34px] font-bold leading-[56px]">
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
          key={`duration-${isMobile ? 'mobile' : 'desktop'}`}
          className="flex flex-col gap-[14.08px] justify-start items-center"
          initial={isMobile ? { y: 50, opacity: 0 } : { x: 50, opacity: 0 }}
          whileInView={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            key={`duration-title-${isMobile ? 'mobile' : 'desktop'}`}
            className="flex gap-1.5 items-center w-full"
            initial={isMobile ? { y: 30, opacity: 0 } : { x: 30, opacity: 0 }}
            whileInView={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
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
            <h4 className="text-white text-3xl lg:text-[34px] font-bold leading-[56px]">
              Duration
            </h4>
          </motion.div>

          <motion.div
            key={`duration-content-${isMobile ? 'mobile' : 'desktop'}`}
            className="w-full px-[17px] py-[15px] rounded-[18px] border-2 border-[#B9B9B9] text-lg font-normal leading-[32.04px] tracking-[0.36px]"
            initial={isMobile ? { y: 30, opacity: 0 } : { x: 30, opacity: 0 }}
            whileInView={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
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
