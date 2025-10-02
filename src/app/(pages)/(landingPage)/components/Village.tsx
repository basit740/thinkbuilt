"use client";
import Image from "next/image";
import { tagItems } from "../../../constants";
import Button from "../../../components/ui/Button";
import { profiles } from "../../../constants";
import { useRef } from "react";
import { useInView, motion } from "motion/react";
import { useMediaQuery } from "react-responsive";

const Village = () => {
  const isMediumUp = useMediaQuery({ minWidth: 1024 });
  const villageRef = useRef(null);
  const villageInView = useInView(villageRef, { once: true, amount: 0.4 });

  return (
    <section id="our-story" className="flex bg-[#0E0805]  justify-center px-4">
      <div
        ref={villageRef}
        className="lg:flex 2xl:mx-[207.17] gap-[50px] lg:gap-[80px] xl:gap-[130.31] md:px-2 py-[60] "
      >
        <div className="flex justify-center mt-[80px] ">
          {profiles.map((profile) => (
            <div key={profile.id} className={profile.container.className}>
              {/* Main Image */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: isMediumUp ? -80 : 0,
                  y: isMediumUp ? 0 : -80,
                }}
                animate={
                  villageInView
                    ? { opacity: 1, x: 0, y: 0 }
                    : {
                        opacity: 0,
                        x: isMediumUp ? -80 : 0,
                        y: isMediumUp ? 0 : -80,
                      }
                }
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative h-[410px] w-[275px] md:h-[500px] md:w-[360px] rounded-[24px] overflow-visible"
              >
                <Image
                  src="/images/basit.webp"
                  alt="Basit Ali"
                  fill
                  className="object-cover object-top translate-y-[-80px]"
                  sizes="(max-width: 640px) 350px, 417px"
                  quality={85}
                />
              </motion.div>

              {/* Overlay Image */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: isMediumUp ? -80 : 0,
                  y: isMediumUp ? 0 : -80,
                }}
                animate={
                  villageInView
                    ? { opacity: 1, x: 0, y: 0 }
                    : {
                        opacity: 0,
                        x: isMediumUp ? -80 : 0,
                        y: isMediumUp ? 0 : -80,
                      }
                }
                transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
              >
                <Image
                  src={profile.overlayImage.src}
                  alt={profile.overlayImage.alt}
                  width={profile.overlayImage.width}
                  height={profile.overlayImage.height}
                  className={profile.overlayImage.className}
                />
              </motion.div>

              {/* Name with Highlighted Part */}
              <motion.h1
                initial={{
                  opacity: 0,
                  x: isMediumUp ? -80 : 0,
                  y: isMediumUp ? 0 : -80,
                }}
                animate={
                  villageInView
                    ? { opacity: 1, x: 0, y: 0 }
                    : {
                        opacity: 0,
                        x: isMediumUp ? -80 : 0,
                        y: isMediumUp ? 0 : -80,
                      }
                }
                transition={{ duration: 0.6, ease: "easeInOut", delay: 0.4 }}
                className={`${profile.name.className} font-Unbounded`}
              >
                <span style={{ color: profile.name.highlight.color }}>
                  {profile.name.highlight.text}
                </span>{" "}
                {profile.name.text.split(" ")[1]}{" "}
              </motion.h1>
            </div>
          ))}
        </div>

        <div className="sm:h-[500px] lg:h-[540px] text-center lg:text-left justify-center items-center lg:items-start flex flex-col">
          <motion.h1
            initial={{
              opacity: 0,
              x: isMediumUp ? 80 : 0,
              y: isMediumUp ? 0 : 80,
            }}
            animate={
              villageInView
                ? { opacity: 1, x: 0, y: 0 }
                : { opacity: 0, x: isMediumUp ? 80 : 0, y: isMediumUp ? 0 : 80 }
            }
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="  text-white text-3xl md:text-[44px] font-normal leading-[140%] capitalize text-center lg:text-left px-2 sm:px-0 mt-[30px]"
          >
            <span className="text-white/80">From a Small Village to</span>{" "}
            <br className="hidden sm:block" />
            <span className="font-medium">
              <span className="text-[#1D9ED9]">&#123;</span>
              Leadlyft & Remember Well
              <span className="text-[#1D9ED9]">&#125;</span>.
            </span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              x: isMediumUp ? 80 : 0,
              y: isMediumUp ? 0 : 80,
            }}
            animate={
              villageInView
                ? { opacity: 1, x: 0, y: 0 }
                : { opacity: 0, x: isMediumUp ? 80 : 0, y: isMediumUp ? 0 : 80 }
            }
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
            className="mt-[22.13] text-base md:text-lg font-normal leading-[150%]  text-center lg:text-left max-w-md"
          >
            I’m Basit Ali — Web Designer, Tutor, and Founder of ThinkBuilt
            Solutions. From humble beginnings to building 7-figure platforms, I
            help ideas grow into impactful digital solutions
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              x: isMediumUp ? 80 : 0,
              y: isMediumUp ? 0 : 80,
            }}
            animate={
              villageInView
                ? { opacity: 1, x: 0, y: 0 }
                : { opacity: 0, x: isMediumUp ? 80 : 0, y: isMediumUp ? 0 : 80 }
            }
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.4 }}
            className="my-[20px] flex flex-wrap items-center gap-[10px] w-full sm:w-[500px] justify-center lg:justify-start"
          >
            {tagItems.map((item, index) => (
              <div
                key={index}
                className="text-white p-2 sm:p-4 rounded-full bg-[#FFFFFF1A]  flex items-center justify-center text-center w-fit gap-2 transition-all duration-500 hover-animation"
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span className="text-base font-normal leading-[24px]">
                  {item.text}
                </span>
              </div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={
              villageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }
            }
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.8 }}
          >
            <Button
              type="button"
              title="Read My Full Story"
              variant="py-2 px-4 mt-[10px] bg-[#1D9ED9] text-white text-sm sm:text-lg lg:text-xl border-x border-y rounded-full transition-colors "
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default Village;
