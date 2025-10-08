import React, { useEffect, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return (
    <section className="text-white px-4  xl:px-[69px]">
      <motion.div
        className="flex w-full h-[600px] lg:h-[848.87px] rounded-[9px] justify-end items-end"
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
          key={`keyfeature-inner-${isMobile ? 'mobile' : 'desktop'}`}
          className="lg:h-[386px] w-full md:w-[538px] lg:w-[638px] border-8 lg:border-y-[14px] lg:border-l-[14px] border-black rounded-[18.47px] flex justify-center items-center"
          style={{
            backgroundImage: " url('/images/key_feature_bg_2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          initial={isMobile ? { y: -50, opacity: 0 } : { x: -50, opacity: 0 }}
          whileInView={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex flex-col gap-[31px] items-center justify-center px-4 py-9 lg:px-0 lg:py-0">
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
