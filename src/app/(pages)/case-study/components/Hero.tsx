// components/Hero.js
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

const Hero = () => {
  const [showFirstLine, setShowFirstLine] = useState(false);
  const [showSecondLine, setShowSecondLine] = useState(false);

  useEffect(() => {
    const firstTimer = setTimeout(() => {
      setShowFirstLine(true);
    }, 500);

    const secondTimer = setTimeout(() => {
      setShowSecondLine(true);
    }, 3000);

    const resetTimer = setTimeout(() => {
      setShowFirstLine(false);
      setShowSecondLine(false);
    }, 5500);

    const restartTimer = setTimeout(() => {
      setShowFirstLine(true);
    }, 6000);

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(secondTimer);
      clearTimeout(resetTimer);
      clearTimeout(restartTimer);
    };
  }, [showFirstLine, showSecondLine]);

  return (
    <section
      id="top"
      className="flex flex-col items-center relative px-4 md:px-0 justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-full flex flex-col items-center"
      >
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

        <div className="text-white/[0.86] text-base md:text-xl font-normal leading-[150%] text-center mt-[25] overflow-hidden px-4 md:px-0 w-full md:max-w-[ 575.932px] h-16">
          <p className="inline-block md:hidden">
            <span className="md:typewriter-first break-all">
              Discover how we&apos;ve helped non-tech business owners transform
              their ideas into powerful digital solutions.
            </span>
          </p>

          <p className="hidden md:inline-block">
            {showFirstLine && (
              <span className="typewriter-first">
                Discover how we&apos;ve helped non-tech business owners
                transform their
              </span>
            )}
          </p>
          <br />
          <p className="hidden md:inline-block">
            {showSecondLine && (
              <span className="typewriter-second">
                ideas into powerful digital solutions.
              </span>
            )}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
