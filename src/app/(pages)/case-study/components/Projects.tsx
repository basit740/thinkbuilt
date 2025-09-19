"use client";

import ProjectCard from "@/app/components/common/ProjectCard";
import Button from "@/app/components/ui/Button";
import React, { useState, useEffect } from "react";
import { useGetProjectsQuery } from "@/store/api/projectsApi";
import toast from "react-hot-toast";

const Projects = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(9); // Show 9 projects initially (3x3 grid)
  const {
    data: projectsData,
    isLoading,
    error,
    isFetching,
  } = useGetProjectsQuery({
    page,
    limit,
  });

  const projects = projectsData?.projects || [];
  const totalProjects = projectsData?.total || 0;
  const hasMore = projects.length < totalProjects;

  useEffect(() => {
    if (error) {
      toast.error("Failed to load projects. Please try again later.");
    }
  }, [error]);

  const handleLoadMore = () => {
    if (hasMore && !isFetching) {
      setPage((prev) => prev + 1);
    }
  };

  if (isLoading && page === 1) {
    return (
      <div className="gap-[21px] grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 justify-center items-center px-6 md:px-16 xl:px-[90px] pt-[70.61px] pb-[99.9px]">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="py-[15.26px] px-[14.3px] rounded-[18.91px] flex justify-start items-start bg-[#26201E] w-full max-w-[622px]"
          >
            <div className="rounded-[20px] flex justify-center items-end h-[434.12px] w-full max-w-[591.4px] p-[10px]" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    console.error("Error fetching projects:", error);
    return (
      <div className="flex flex-col justify-center items-center px-6 md:px-16 xl:px-[90px] pt-[70.61px] pb-[99.9px] gap-[55.36px]">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            Failed to load projects. Please try again later.
          </p>
          <Button
            type="button"
            title="Retry"
            variant="xl:py-3 py-2 xl:px-6 px-4 flex bg-[#1D9ED9] rounded-full py-2 sm:py-3 sm:px-4 w-[196px] items-center justify-center text-md lg:text-lg transition-colors font-medium hover:bg-[#1678a1] border"
            onClick={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center px-6 md:px-16 xl:px-[90px] pt-[70.61px] pb-[99.9px] gap-[55.36px]">
        <div className="text-center">
          <p className="text-gray-500">No projects available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center px-6 md:px-16 xl:px-[90px] pt-[70.61px] pb-[99.9px] gap-[55.36px]">
      <div className="gap-[21px] grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 justify-center items-center">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
      {hasMore && (
        <div>
          <Button
            type="button"
            title={isFetching ? "Loading..." : "Load More"}
            variant="xl:py-3 py-2 xl:px-6 px-4 flex bg-[#1D9ED9] rounded-full py-2 sm:py-3 sm:px-4 w-[196px] items-center justify-center text-md lg:text-lg transition-colors font-medium hover:bg-[#1678a1] border"
            onClick={handleLoadMore}
            disabled={isFetching}
          />
        </div>
      )}
    </div>
  );
};

export default Projects;
