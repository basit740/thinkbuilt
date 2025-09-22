import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: {
    _id: string;
    project_name: string;
    project_summary: string;
    thumbnail_image_url: string;
    company_logo_url: string;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="py-[15.26px] px-[14.3px] rounded-[18.91px] flex justify-center items-center bg-[#26201E] w-full max-w-[622px] mx-auto">
      <div
        className="rounded-[20px] flex justify-center items-end h-[434.12px] w-full max-w-[591.4px] p-[10px]"
        style={{
          backgroundImage: `url(${
            project.thumbnail_image_url || "/images/project_card_bg.png"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col rounded-[59px] md:flex-row gap-3 py-[5.81px] pl-[5.79px] pr-[10.71px] justify-center items-center bg-black/83">
          {/* Left Side */}
          <div className="flex flex-col sm:flex-row gap-[10.83px] justify-center items-center">
            <Image
              src={project?.company_logo_url || "/images/ellipse.png"}
              alt={project.project_name}
              height={94}
              width={94}
              className="rounded-full w-[47px] lg:w-[94px] h-[47] lg:h-[94px] object-cover"
            />
            <div className="flex flex-col justify-center items-center sm:items-start gap-[11px]">
              <p className="font-bold text-[22px] leading-[24px] tracking-[0.4px]">
                {project.project_name}
              </p>
              <p className="font-normal text-base leading-[24px] tracking-[0px] text-white/[0.77] text-center sm:text-start max-w-3xs line-clamp-2">
                {project.project_summary}
              </p>
            </div>
          </div>

          {/* Right Side */}
          <Link href={`/case-study/project-details/${project._id}`}>
            <div className="flex justify-center items-center rounded-[30px] bg-[#1D9ED9] w-[156px] h-[46.291px] cursor-pointer border border-white/[0.60] hover:bg-[#1678a1] transition-colors">
              <div className="flex flex-row items-center gap-[7px]">
                <p className="font-medium text-base leading-[30px] text-white">
                  Case Study
                </p>
                <Image
                  src="/icons/right_arrow.svg"
                  alt="arrow"
                  width={14.655}
                  height={11.717}
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
