"use client";
import { cardData } from "../../../constants";
import { Card } from "../../../components/ui/Card";
import { useRef } from "react";
import { useInView, motion } from "motion/react";
import { useMediaQuery } from "react-responsive";

const Divsection = () => {
  const isMediumUp = useMediaQuery({ minWidth: 1024 });
  const helpYouRef = useRef(null);
  const helpYouInView = useInView(helpYouRef, { once: true, amount: 0.4 });

  return (
    <section
      ref={helpYouRef}
      className="flex flex-col bg-[#0E0805] items-center justify-center px-4"
    >
      <motion.div
        ref={helpYouRef}
        initial={{ opacity: 0, y: -80 }}
        animate={helpYouInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -80 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <h1 className="text-white text-3xl  md:text-[44px] font-medium leading-[130%] capitalize mt-[20px] text-center">
          <span className="text-white/80 font-normal">
            What We Help <span className="text-white">You</span>
          </span>{" "}
          <span className="text-[#1D9ED9]">&#123;</span>Build
          <span className="text-[#1D9ED9]">&#125;</span>
        </h1>

        <p className="text-white mt-[20.62] text-base md:text-xl font-normal leading-[150%] flex flex-col justify-center px-3 text-center">
          From strategy to execution — get the technical clarity and engineering
          <br className="hidden sm:inline" />
          support you need.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-2 md:gap-[22px] my-[40px] md:mx-4">
        {cardData.map((card, index) => (
          <motion.div
            key={card.id}
            className="hover-animation "
            initial={{
              opacity: 0,
              y: !isMediumUp ? (index % 2 === 0 ? 80 : -80) : 0,
              x: isMediumUp ? (index % 2 === 0 ? -80 : 80) : 0,
            }}
            animate={helpYouInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              delay: index * 0.15, // Staggered delay for each card
            }}
          >
            <Card {...card} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Divsection;
