import React from "react";
import ProjectOverview from "./components/ProjectOverview";
import ProjectSummary from "./components/ProjectSummary";
import ProjectConcept from "./components/ProjectConcept";
import Approach from "./components/Approach";
import KeyFeature from "./components/KeyFeature";
import Results from "./components/Results";
import CaseStudy from "./components/CaseStudy";

const page = () => {
  return (
    <div className="pb-[76px] pt-[179.7px]">
      <ProjectSummary />
      <ProjectOverview />
      <ProjectConcept />
      <Approach />
      <KeyFeature />
      <Results />
      <CaseStudy />
    </div>
  );
};

export default page;
