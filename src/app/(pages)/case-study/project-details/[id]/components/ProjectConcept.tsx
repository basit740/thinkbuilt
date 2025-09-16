import Image from "next/image";
import React from "react";

const ProjectConcept = () => {
  return (
    <section
      className="px-4 md:px-16 xl:px-[90px] py-[38px] w-full flex flex-col gap-[50px] "
      style={{
        backgroundImage: " url('/images/project_concept_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex gap-1.5">
        <Image
          src="/icons/flower_icon.svg"
          alt="flower-icon"
          width={20}
          height={20}
        />
        <h4 className="text-[34px] font-bold leading-[56px]">
          Problem & <span className="text-[#1D9ED9]">Solution</span>
        </h4>
      </div>

      <div className="mt-[50px]">
        {[1, 2, 3].map((index) => {
          return (
            <div key={index} className="flex gap-2">
              {/* Left */}
              <div className="flex h-auto">
                <div className="flex flex-col justify-start -mt-[54px]">
                  <h6 className="text-3xl font-bold text-[#1D9ED9] leading-[38.955px]">
                    Slow Loading
                  </h6>
                  <p className="max-w-sm 2xl:max-w-lg text-xl font-normal leading-[33.6px] text-white">
                    High-res galleries risk sluggish performance, which can
                    frustrate visitors or break the immersive experience.
                  </p>
                </div>
              </div>

              {/* Cenetr */}
              <div className="flex gap-[10px]">
                <div className="flex flex-col h-auto">
                  <Image
                    src="/icons/think_icon.svg"
                    alt="idea-icon"
                    height={80}
                    width={80}
                    className="h-20 min-w-20 w-20 min-h-20 mt-[-36px]"
                  />
                </div>
                <Image
                  src="/icons/wave_icon.svg"
                  alt="wave-icon"
                  height={108}
                  width={300}
                  className="w-[300px] h-[108px]"
                />
                <div className="flex flex-col h-auto justify-center">
                  <Image
                    src="/icons/mark_done_icon.svg"
                    alt="mark-done"
                    height={69}
                    width={69}
                    className="h-[69px] min-w-[69px] w-[69px] min-h-[69px] mt-6"
                  />
                </div>
              </div>

              {/* Right */}
              <div className="flex h-auto">
                <div className="flex flex-col justify-end ml-2.5 mt-20">
                  <h6 className="text-3xl font-bold text-[#1D9ED9] leading-[38.955px]">
                    Fast-Loading Visuals
                  </h6>
                  <p className="max-w-sm 2xl:max-w-lg text-xl font-normal leading-[33.6px] text-white">
                    Galleries appear fluidly, ensuring quick image load times
                    and seamless browsing
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectConcept;
