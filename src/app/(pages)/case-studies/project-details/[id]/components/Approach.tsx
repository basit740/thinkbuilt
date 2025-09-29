import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

const Approach = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 500);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const approachData = [
    {
      id: 0,
      title: "Analysis",
      desc: "Current workflow analysis and pain point identification",
      icon: "/icons/analysis.svg",
    },
    {
      id: 1,
      title: "Architecture",
      desc: "System design and database structure planning",
      icon: "/icons/architecture.svg",
    },
    {
      id: 2,
      title: "Development",
      desc: "Phased development with continuous user feedback",
      icon: "/icons/development.svg",
    },
    {
      id: 3,
      title: "Integration",
      desc: "Third-party integrations and data migration",
      icon: "/icons/integration.svg",
    },
  ];
  return (
    <section className="px-4 md:px-16 xl:px-[90px] py-16 lg:py-[120px] flex flex-col gap-8 lg:gap-[55px]">
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
          Our <span className="text-[#1D9ED9]">Approach</span>
        </h4>
      </motion.div>

      <div className={`flex flex-row gap-3 flex-wrap items-center justify-center`}>
        {approachData.map((item, index) => {
          return (
            <motion.div
              key={index}
              className={`${
                isMobile ? "w-full" : "w-[295.199px]"
              } relative rounded-[18px] overflow-hidden`}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.2,
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Image
                src="/images/approach_card_bg.png"
                alt="background"
                width={295.199}
                height={403.03}
                className="w-full :w-[295.199px] h-auto rounded-[18px]"
              />
              <div className="absolute inset-0 flex justify-center items-center flex-col">
                <Image
                  src={`${item.icon}`}
                  alt={`${item.title}`}
                  height={104.68}
                  width={107.55}
                  className="h-[104.68px] w-full"
                />

                <h6 className="text-[32px] font-medium leading-normal tracking-[-0.64px] text-[#1D9ED9]">
                  {item.title}
                </h6>

                <Image
                  src="/icons/Line.svg"
                  alt="line"
                  height={1}
                  width={93.441}
                  className="mt-[8.11px] mb-[17.49px]"
                />

                <p className="text-lg font-normal leading-[26px] max-w-[280px] md:max-w-48 text-center">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Approach;
