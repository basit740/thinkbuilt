import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

interface Project {
  _id: string;
  project_name: string;
  project_summary: string;
  client_name: string;
  completion_date: string;
  thumbnail_image_url: string;
}

interface ProjectSummaryProps {
  project: Project;
}

const ProjectSummary = ({ project }: ProjectSummaryProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="flex flex-col gap-[45px] px-4 md:px-16 xl:px-[90px] ">
      <div className="w-full flex justify-between text-white">
        {/* Left Side */}
        <div className="flex flex-col gap-2.5">
          <motion.h2
            className="text-5xl font-bold"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {project.project_name}
          </motion.h2>
          <motion.p
            className="max-w-xl text-lg font-normal leading-[23.04px] -tracking-[0.72px]"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            {project.project_summary}
          </motion.p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-4 w-[344px] text-base font-normal -tracking-[0.64px] justify-center">
          <motion.div
            className="flex justify-between"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <p>Client</p>
            <p>{project.client_name}</p>
          </motion.div>
          <hr />
          <motion.div
            className="flex justify-between"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          >
            <p>Date</p>
            <p>{formatDate(project.completion_date)}</p>
          </motion.div>
        </div>
      </div>

      {/* Thumbnail Image */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
      >
        <Image
          src={project.thumbnail_image_url}
          alt={`${project.project_name} thumbnail`}
          height={717}
          width={1260}
          className="w-full h-[713.17px] object-center rounded-[25px]"
          priority
        />
      </motion.div>
    </section>
  );
};

export default ProjectSummary;
