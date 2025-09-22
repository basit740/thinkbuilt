import React from "react";
import { motion } from "motion/react";

interface Project {
  _id: string;
  key_feature: string;
  second_thumbnail_url?: string;
}

interface KeyFeatureProps {
  project: Project;
}

const KeyFeature = ({ project }: KeyFeatureProps) => {
  return (
    <section className="px-4  xl:px-[69px]">
      <motion.div
        className="flex w-full h-[848.87px] rounded-[9px] justify-end items-end"
        style={{
          backgroundImage: `url(${
            project.second_thumbnail_url || "/images/key_feature_background.png"
          })`,
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
          className="h-[386px] w-[638px] border-y-[14px] border-l-[14px] border-black rounded-[18.47px] flex justify-center items-center"
          style={{
            backgroundImage: " url('/images/key_feature_bg_2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex flex-col gap-[31px] items-center justify-center">
            <motion.h5
              className="bg-[linear-gradient(180deg,#FFFFFF_2.39%,rgba(255,255,255,0.46)_143.39%)]
          bg-clip-text text-transparent
          text-[48.695px] font-bold leading-[53.978px] text-left w-full
         "
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Key Feature
            </motion.h5>
            <motion.p
              className="max-w-sm"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {project.key_feature}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default KeyFeature;
