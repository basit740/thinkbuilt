// import ProjectCard from "@/app/components/common/ProjectCard";
import Image from "next/image";
import React from "react";

const CaseStudy = () => {
  return (
    <section className="px-4 md:px-16 xl:px-[90px] pb-[76px] flex flex-col gap-10">
      <div className="w-full flex flex-col items-center">
        <span className="text-white text-lg font-normal leading-[150%] italic">
          <span className="text-[#1D9ED9]">&#123;</span> ThinkBuilt Solutions{" "}
          <span className="text-[#1D9ED9]">&#125;</span>
        </span>

        <h1 className="text-white mt-[25.82px] text-4xl md:text-[82px] font-normal leading-[120%] capitalize sm:px-4 md:px-8 lg:px-12 flex justify-center flex-wrap lg:flex-nowrap">
          Our Case&nbsp;
          <span className="sm:inline-block font-medium">
            <span className="text-[#1D9ED9]">&#123;</span>
            Studies
            <span className="text-[#1D9ED9]">&#125;</span>.
            <br />
            <Image
              src="/images/Vector 2.png"
              alt="icons"
              width={400}
              height={9.412}
              className="justify-self-end mr-4 sm:mr-8 mt-[7.23px] xl:w-[254px] md:w-[190px] sm:w-[150px] w-[95px] sm:block"
            />
          </span>
        </h1>

        <div className="text-white/[0.86] text-base md:text-xl font-normal leading-[150%] text-center mt-[25] overflow-hidden px-4 md:px-0 h-16">
          <p className="max-w-[613px]">
            Discover how we&apos;ve helped non-tech business owners transform
            their ideas into powerful digital solutions.
          </p>
        </div>
      </div>

      {/* Project Cards */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-[21px] justify-items-center max-w-[1280px] mx-auto">
        {[1, 2].map((index) => (
          <ProjectCard key={i} />
        ))}
      </div> */}
    </section>
  );
};

export default CaseStudy;
