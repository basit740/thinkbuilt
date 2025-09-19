import Carousel from "@/app/components/ui/Carousel";
import Image from "next/image";
import React from "react";

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
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <section className="mt-[120px] mb-[80px] flex flex-col gap-10 px-4 md:px-16 xl:px-[90px] ">
      {/* Project Overview */}
      <div className="flex flex-col lg:flex-row gap-[56px] justify-between">
        {/* Overview */}
        <div className="flex flex-row gap-[13.8px] items-start">
          <Image
            src="/icons/flower_icon.svg"
            alt="flower-icon"
            width={37}
            height={37}
          />
          <div className="flex flex-col gap-3 lg:gap-[6.51px]">
            <h2 className="text-[58px] font-bold leading-[56px] w-full lg:max-w-[255px]">
              Project <span className="text-[#1D9ED9]">Overview</span>
            </h2>
            <p className="w-full lg:max-w-xs">
              {project.project_overview}
            </p>
          </div>
        </div>

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
        <div className="flex flex-col gap-[28px] justify-start items-center w-full lg:max-w-md">
          <div className="flex gap-1.5">
            <Image
              src="/icons/flower_icon.svg"
              alt="flower-icon"
              width={20}
              height={20}
            />
            <h4 className="text-[34px] font-bold leading-[56px]">
              Technology Used
            </h4>
          </div>

          <div className="flex flex-wrap gap-[10.3px]">
            {project.technology_used.map((tech, index) => (
              <div
                key={index}
                className="rounded-[176px] px-[31.5px] py-[8.58px] text-[22px] font-normal leading-[32.601px] text-[#B1B1B1] border border-[#B9B9B9] bg-[#F6F6F61A]"
              >
                {tech.tech_name}
              </div>
            ))}
          </div>
        </div>

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
        <div className="flex flex-col gap-[14.08px] justify-start items-center">
          <div className="flex gap-1.5">
            <Image
              src="/icons/flower_icon.svg"
              alt="flower-icon"
              width={20}
              height={20}
            />
            <h4 className="text-[34px] font-bold leading-[56px]">Duration</h4>
          </div>

          <div className="px-[17px] py-[15px] rounded-[18px] border-2 border-[#B9B9B9] text-lg font-normal leading-[32.04px] tracking-[0.36px]">
            <p>
              By: <span className="text-[#1D9ED9]">ThinkBuildSolutions</span>
            </p>
            <p>
              Time Duration: <span className="text-[#1D9ED9]">{project.time_duration}</span>
            </p>
            <p>{formatCompletionDate(project.completion_date)}</p>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="w-full">
        <Carousel
          images={project.pages_images_urls.length > 0 ? project.pages_images_urls : [
            "/images/project_thumbnail.png",
            "/images/project_card_bg.png",
            "/images/case_study_hero_bg.png",
          ]}
        />
      </div>
    </section>
  );
};

export default ProjectOverview;
