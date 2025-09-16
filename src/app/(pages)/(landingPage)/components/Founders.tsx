"use client";
import Image from "next/image";
import { statsData } from "../../../constants";
import { featureItems } from "../../../constants";
import { featureCards } from "../../../constants";
import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "motion/react";

const Founders = () => {
  const foundersRef = useRef(null);
  const FounderRefInView = useInView(foundersRef, { once: true, amount: 0.4 });

  const [displayStats, setDisplayStats] = useState(statsData);
  const [allAnimationsDone, setAllAnimationsDone] = useState(false);

  useEffect(() => {
    if (FounderRefInView) {
      const countDelay = setTimeout(() => {
        const randomCountInterval = setInterval(() => {
          setDisplayStats(
            statsData.map((stat) => ({
              ...stat,
              value: `${Math.floor(Math.random() * 200) + 1}+`,
            }))
          );
        }, 100);

        const stopCountTimeout = setTimeout(() => {
          clearInterval(randomCountInterval);
          setDisplayStats(statsData);
        }, 1500);

        return () => clearTimeout(stopCountTimeout);
      }, 1000);

      // Total time for other animations (stats, heading, feature cards)
      // The longest animation is 0.6s duration + 0.6s delay = 1.2s.
      // We'll add a slight buffer.
      const animationEndDelay = setTimeout(() => {
        setAllAnimationsDone(true);
      }, 1500);

      return () => {
        clearTimeout(countDelay);
        clearTimeout(animationEndDelay);
      };
    }
  }, [FounderRefInView]);

  return (
    <section
      id="why-us"
      ref={foundersRef}
      className="flex flex-col items-center justify-center min-h-screen p-4"
    >
      <div className="grid md:grid-cols-4 grid-cols-2 gap-2 pt-2 ">
        {displayStats.map((stat) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              FounderRefInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0 }
            }
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              // delay: 0.1 * index,
            }}
            className="flex flex-col items-center justify-center rounded-full bg-[rgba(255,255,255,0.10)] w-[130px] h-[130px] sm:w-[170px] sm:h-[170px] text-white transition-all duration-500 hover-animation gap-[7px]"
          >
            <h1 className="text-2xl md:text-[40px] font-normal leading-8 tracking-[-2x]">
              {stat.value}
            </h1>
            <span className="text-xs md:text-base font-normal leading-6 text-white/80">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -80 }}
        animate={
          FounderRefInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -80 }
        }
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.6 }}
        className="text-3xl md:text-[44px] text-white/80 font-normal leading-[130%] capitalize mt-[50px] lg:mt-[150px]  h-[100] flex flex-col items-center justify-center text-center"
      >
        Why Non-Tech Founders Choose
        <br />
        <span className="flex items-center justify-center mt-[10px] text-white font-medium">
          <span className="text-[#1D9ED9]">&#123;</span>ThinkBuilt
          <span className="text-[#1D9ED9]">&#125;</span>
        </span>
      </motion.h1>

      <div className="flex flex-col flex-wrap md:flex-row gap-3 items-center justify-center mt-[50px] w-full">
        {featureCards.map((card) => (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={
              FounderRefInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }
            }
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.6 }}
            key={card.id}
            className="text-white flex-1 w-full flex flex-col items-center h-[220px] max-w-[473px] rounded-[20px] transition-all duration-500 hover-animation py-[20px] border border-[#FFFFFF0D] bg-[rgba(13,13,13,0.2)] md:bg-[rgba(13,13,13,0.1)] backdrop-blur-[5px]"
          >
            <Image
              src={card.borderImage}
              alt="Border"
              width={60}
              height={60}
              className="rounded-[20px]"
            />
            <Image
              src={card.iconImage}
              alt={card.iconAlt}
              width={42}
              height={42}
              className="mt-[-50px] mb-[25px]"
            />
            <p className="text-base md:text-xl font-bold leading-[26px] -leading-[0.1px]">
              {card.title}
            </p>
            <span className="max-w-[314.826px] flex justify-center text-center text-sm md:text-base font-normal leading-[26px] opacity-[0.6] mt-[15px]">
              {card.description}
            </span>
          </motion.div>
        ))}
      </div>

      <div
        className={`relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-2 mb-[20px] mt-[23px]`}
      >
        {featureItems.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={
              FounderRefInView && allAnimationsDone
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 80 }
            }
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              delay: 0.1 * index,
            }}
            key={item.id}
            className={`text-black ${item.bgColor} flex gap-1 items-center justify-center rounded-full py-2 px-2 mt-[10px] lg:mt-[0px] transition-all duration-500 hover-animation z-20 text-base font-normal leading-6`}
          >
            <Image
              src={item.icon}
              alt="Vector"
              width={20}
              height={20}
              className="w-[20px] h-[20px]"
            />
            {item.text}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Founders;
