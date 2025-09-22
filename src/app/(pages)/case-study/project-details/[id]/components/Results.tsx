import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
interface ProjectResult {
  value: string;
  desc: string;
}

interface Project {
  _id: string;
  the_results: ProjectResult[];
  client_comment: string;
  client_name: string;
  client_company_name: string;
  company_logo_url: string;
}

interface ResultsProps {
  project: Project;
}

const Results = ({ project }: ResultsProps) => {
  const bgColors = ["#CBDEFD", "#FFD3FA", "#B4F8BC"];

  return (
    <section className="px-4 md:px-16 xl:px-[78px]  pb-[140px] pt-[123px] flex flex-col">
      <motion.div
        className="flex gap-1.5 items-center"
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          className="h-5 w-5"
        >
          <Image
            src="/icons/flower_icon.svg"
            alt="flower-icon"
            width={20}
            height={20}
          />
        </motion.div>
        <h4 className="text-[34px] font-bold leading-[56px]">
          Our <span className="text-[#1D9ED9]"> Results</span>
        </h4>
      </motion.div>

      {/* Result Cards */}
      <div className="mt-[47px] mb-8 gap-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {project.the_results.map((result, index) => {
          const bgColor = bgColors[index % bgColors.length];
          return (
            <motion.div
              key={index}
              className="py-16 px-[24px] rounded-[25.71px] flex justify-center items-center"
              style={{ backgroundColor: bgColor }}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.2
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="flex flex-col text-center">
                <p className="text-[64px] font-normal leading-[65.101px] tracking-[-4.069px] text-black">
                  {result.value}
                </p>
                <p className="text-[26px] font-normal leading-[48.826px] text-black/80">
                  {result.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="w-full rounded-[25.71px] border border-white/69 flex flex-col gap-[27px] px-[55px] items-center justify-start py-[38px]"
        style={{
          backgroundImage: " url('/images/comment_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="flex w-full items-start"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Image
            src={project.company_logo_url}
            alt="company-logo"
            width={150}
            height={150}
          />
        </motion.div>

        <div className="flex flex-col gap-[25px]">
          <motion.h5
            className="text-[38px] font-bold leading-[51.3px]"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            &ldquo;{project.client_comment}&rdquo;
          </motion.h5>

          <motion.div
            className="flex flex-col gap-[7px]"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-xl font-bold leading-[22px]">
              {project.client_name}
            </p>
            <p className="text-base font-normal leading-[25.6px]">
              {project.client_company_name}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Results;
