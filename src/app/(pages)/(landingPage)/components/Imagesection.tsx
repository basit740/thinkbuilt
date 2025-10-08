"use client";
import { useEffect, useRef, useState } from "react";
import { Images } from "../../../constants/index";
import Image from "next/image";
import { FEATURES } from "../../../constants/index";
import { tags } from "../../../constants/index";
import { useInView, motion } from "motion/react";
import { useMediaQuery } from "react-responsive";

const Imagesection = () => {
  const isMediumUp = useMediaQuery({ minWidth: 1024 });
  const [animatedTagId, setAnimatedTagId] = useState(0);

  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  const row1InView = useInView(row1Ref, { once: true, amount: 0.4 });
  const row2InView = useInView(row2Ref, { once: true, amount: 0.25 });

  useEffect(() => {
    const animateTag = () => {
      const randomIndex = Math.floor(Math.random() * tags.length);
      const randomTagId = tags[randomIndex].id;
      setAnimatedTagId(randomTagId);
    };

    const intervalId = setInterval(animateTag, 1200);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="about" ref={row1Ref} className="bg-[#0E0805] px-4">
      <motion.div
        ref={row1Ref}
        initial={{ opacity: 0, y: -80 }}
        animate={row1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: -80 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-full flex flex-col items-center"
      >
        <h1 className="mt-[60px] text-center text-3xl md:text-[44px] font-normal leading-[140%] capitalize ">
          <span className="text-white">You’ve Got the Vision.</span>
          <br />
          <span className="font-medium">
            <span className="text-white/80 font-normal">
              We Help You Bring It To Life —{" "}
            </span>
            <span className="text-[#1D9ED9]">&#123;</span>
            <span className="text-white">The Right Way</span>
            <span className="text-[#1D9ED9]">&#125;</span>.
          </span>
        </h1>
        <p className="text-white mt-[20.75] text-base md:text-xl font-normal leading-[150%] justify-center items-center px-3 text-center mb-[40px] sm:mb-[0px]">   
          Whether it&apos;s a SaaS, web app, or marketplace, we guide non-tech
          founders
          <br className="hidden sm:inline" />
          <span className="sm:flex justify-center text-center  mb-[40px] 2xl:mb-[30px]">
            from idea to execution.
          </span>
        </p>
      </motion.div>

      <div className="flex flex-col items-center gap-4 py-[50px]  justify-center md:mx-4">
        <div className="grid 2xl:grid-cols-[820px_441px] xl:grid-cols-[800px_441px] gap-4 items-center justify-center ">
          <motion.div
            initial={{
              opacity: 0,
              x: isMediumUp ? -80 : 0,
              y: isMediumUp ? 0 : -80,
            }}
            animate={
              row1InView
                ? { opacity: 1, x: 0, y: 0 }
                : {
                    opacity: 0,
                    x: isMediumUp ? -80 : 0,
                    y: isMediumUp ? 0 : -80,
                  }
            }
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Image
              src={Images[0].src}
              alt={Images[0].alt}
              width={820}
              height={409}
              className="flex items-center justify-center transition-all duration-500 hover-animation"
            />
          </motion.div>

          <motion.div
            ref={row1Ref}
            initial={{
              opacity: 0,
              x: isMediumUp ? 80 : 0,
              y: isMediumUp ? 0 : 80,
            }}
            animate={
              row1InView
                ? { opacity: 1, x: 0, y: 0 }
                : { opacity: 0, x: isMediumUp ? 80 : 0, y: isMediumUp ? 0 : 80 }
            }
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="flex flex-col bg-[#AAE3FE] p-4 rounded-3xl 2xl:h-[409] transition-all duration-500 hover-animation text-black">
              {FEATURES.map((stat, index) => (
                <div key={index} className="">
                  <h1 className="text-5xl md:text-[85.409px] font-normal leading-[102.491px] mt-[10px]">
                    {stat.title}
                  </h1>
                  <span className="text-base md:text-[17.794px] font-normal leading-[23.132px] tracing-[-0.356px] uppercase ">
                    {stat.heading}
                  </span>
                  <p className="text-xs md:text-lg font-normal leading-[21.352px] pt-[80px] md:pt-[220px] text-black/[0.8]">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="w-full flex flex-col xl:flex-row gap-4 items-center justify-center">
          <motion.div
            ref={row2Ref}
            initial={{
              opacity: 0,
              x: isMediumUp ? -80 : 0,
              y: isMediumUp ? 0 : 80,
            }}
            animate={
              row2InView
                ? { opacity: 1, x: 0, y: 0 }
                : {
                    opacity: 0,
                    x: isMediumUp ? -80 : 0,
                    y: isMediumUp ? 0 : 80,
                  }
            }
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full lg:w-auto"
          >
            <div className="w-full xl:w-[600px] sm:h-[409px] relative flex justify-center items-center transition-all duration-500 hover-animation">
              <div className="w-full xl:w-[662px]  transition-all duration-500 hover-animation sm:hidden">
                <Image
                  src={Images[2].src}
                  alt={Images[2].alt}
                  width={662}
                  height={409}
                />
              </div>

              <div className="absolute inset-0 w-full h-full hidden sm:block">
                <Image
                  src="/images/vision_img_3.webp"
                  alt="Background Image"
                  width={660}
                  height={409}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* Tag Circle - centered over image */}
              <div className="relative z-10 w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] rounded-full border-2 border-white overflow-hidden hidden sm:block">
                {tags.map((tag) => {
                  return (
                    <div
                      key={tag.id}
                      className={`flex gap-1 items-center ${
                        tag.bgColor
                      } rounded-full py-2 px-5 ${tag.rotation} ${
                        tag.zIndex
                      } absolute ${
                        tag.position
                      } transform -translate-x-1/2 hover:scale-105 hover:shadow-lg shadow-red-50/60 transition-all duration-400
            ${
              animatedTagId === tag.id
                ? "scale-110 shadow-[0_0_15px_10px_rgba(34,211,238,1)]"
                : "shadow-none"
            } `}
                    >
                      <Image
                        src={tag.icon}
                        alt={tag.text}
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                      <span className="text-black text-base font-medium whitespace-nowrap">
                        {tag.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={row2Ref}
            initial={{
              opacity: 0,
              x: isMediumUp ? 80 : 0,
              y: isMediumUp ? 0 : 80,
            }}
            animate={
              row2InView
                ? { opacity: 1, x: 0, y: 0 }
                : { opacity: 0, x: isMediumUp ? 80 : 0, y: isMediumUp ? 0 : 80 }
            }
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className=" 2xl:w-[662px]  sm:h-[409px] transition-all duration-500 hover-animation">
              <Image
                src={Images[3]?.src}
                alt={Images[3]?.alt}
                width={662}
                height={409}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Imagesection;
