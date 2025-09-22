import ProjectCard from "@/app/components/common/ProjectCard";
import Image from "next/image";
import React from "react";
import { useParams } from "next/navigation";
import { useGetProjectsQuery } from "@/store/api/projectsApi";
import { motion } from "motion/react";

const CaseStudy = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: projectsData } = useGetProjectsQuery({ page: 1, limit: 100 });
  const projects = projectsData?.projects || [];
  const filteredProjects = projects.filter(project => project._id !== id);
  const randomProjects = filteredProjects.sort(() => 0.5 - Math.random()).slice(0, 2);

  return (
    <section className="px-4 md:px-16 xl:px-[90px] pb-[76px] flex flex-col gap-10">
      <div className="w-full flex flex-col items-center">
        <motion.span
          className="text-white text-lg font-normal leading-[150%] italic"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="text-[#1D9ED9]">&#123;</span> ThinkBuilt Solutions{" "}
          <span className="text-[#1D9ED9]">&#125;</span>
        </motion.span>

        <motion.h1
          className="text-white mt-[25.82px] text-4xl md:text-[82px] font-normal leading-[120%] capitalize sm:px-4 md:px-8 lg:px-12 flex justify-center flex-wrap lg:flex-nowrap"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
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
        </motion.h1>

        <motion.div
          className="text-white/[0.86] text-base md:text-xl font-normal leading-[150%] text-center mt-[25] overflow-hidden px-4 md:px-0 h-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="max-w-[613px]">
            Discover how we&apos;ve helped non-tech business owners transform
            their ideas into powerful digital solutions.
          </p>
        </motion.div>
      </div>

      {/* Project Cards */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-[21px] justify-items-center max-w-[1280px] mx-auto"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {randomProjects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ x: index === 0 ? -50 : 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.8 + (index * 0.2)
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CaseStudy;
