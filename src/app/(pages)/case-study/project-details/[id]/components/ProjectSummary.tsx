import Image from "next/image";
import React from "react";

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
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section className="flex flex-col gap-[45px] px-4 md:px-16 xl:px-[90px] ">
      <div className="w-full flex justify-between text-white">
        {/* Left Side */}
        <div className="flex flex-col gap-2.5">
          <h2 className="text-5xl font-bold">{project.project_name}</h2>
          <p className="max-w-xl text-lg font-normal leading-[23.04px] -tracking-[0.72px]">
            {project.project_summary}
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-4 w-[344px] text-base font-normal leading-[20.8px] -tracking-[0.64px] justify-center">
          <div className="flex justify-between">
            <p>Client</p>
            <p>{project.client_name}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p>Date</p>
            <p>{formatDate(project.completion_date)}</p>
          </div>
        </div>
      </div>

      {/* Thumbnail Image */}
      <div>
        <Image
          src={project.thumbnail_image_url}
          alt={`${project.project_name} thumbnail`}
          height={717}
          width={1260}
          className="w-full h-[713.17px] object-cover rounded-[25px]"
          priority
        />
      </div>
    </section>
  );
};

export default ProjectSummary;
