import ProjectCard from "@/app/components/common/ProjectCard";
import Button from "@/app/components/ui/Button";
import React from "react";

const Projects = () => {
  return (
    <div className="flex flex-col justify-center items-center px-6 md:px-16 xl:px-[90px] pt-[70.61px] pb-[99.9px] gap-[55.36px]">
      <div className="gap-[21px] grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 justify-center items-center">
        {[1, 2, 3, 4].map((index) => {
          return <ProjectCard key={index} />;
        })}
      </div>
      <div>
        <Button
          type="button"
          title="Load More"
          variant="xl:py-3 py-2 xl:px-6 px-4 flex bg-[#1D9ED9] rounded-full py-2 sm:py-3 sm:px-4 w-[196px] items-center justify-center text-md  lg:text-lg transition-colors font-medium hover:bg-[#1678a1] border"
        />
      </div>
    </div>
  );
};

export default Projects;
