"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGetProjectQuery } from "@/store/api/projectsApi";
import ProjectOverview from "./components/ProjectOverview";
import ProjectSummary from "./components/ProjectSummary";
import ProjectConcept from "./components/ProjectConcept";
import Approach from "./components/Approach";
import KeyFeature from "./components/KeyFeature";
import Results from "./components/Results";
import CaseStudy from "./components/CaseStudy";

const ProjectDetailsPage = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: projectData, isLoading, error } = useGetProjectQuery(id);
  const project = projectData?.project;

  if (isLoading) {
    return (
      <div className="pb-[76px] pt-[179.7px]">
        <ProjectSummarySkeleton />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pb-[76px] pt-[179.7px] flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Project Not Found
          </h2>
          <p className="text-gray-400">
            The project you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-[76px] pt-[179.7px]">
      <ProjectSummary project={project} />
      <ProjectOverview project={project} />
      <ProjectConcept project={project} />
      <Approach />
      <KeyFeature project={project} />
      <Results project={project} />
      <CaseStudy />
    </div>
  );
};

export default ProjectDetailsPage;

// Skeleton Components
const ProjectSummarySkeleton = () => (
  <section className="flex flex-col gap-[45px] px-4 md:px-16 xl:px-[90px]">
    <div className="w-full flex justify-between text-white">
      <div className="flex flex-col gap-2.5">
        <div className="h-12 bg-gray-700 rounded animate-pulse w-64"></div>
        <div className="h-6 bg-gray-700 rounded animate-pulse w-96"></div>
      </div>
      <div className="flex flex-col gap-4 w-[344px] text-base">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-16"></div>
          <div className="h-4 bg-gray-700 rounded animate-pulse w-32"></div>
        </div>
        <hr />
        <div className="flex justify-between">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-12"></div>
          <div className="h-4 bg-gray-700 rounded animate-pulse w-24"></div>
        </div>
      </div>
    </div>
    <div className="w-full h-[713px] bg-gray-700 rounded-[25px] animate-pulse"></div>
  </section>
);
