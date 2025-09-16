import React from "react";
import Image from "next/image";

const ProjectCard = () => {
  return (
    <div className="py-[15.26px] px-[14.3px] rounded-[18.91px] flex justify-center items-center bg-[#26201E] w-full max-w-[622px] mx-auto">
      <div
        className="rounded-[20px] flex justify-center items-end h-[434.12px] w-full max-w-[591.4px] p-[10px]"
        style={{
          backgroundImage: " url('/images/project_card_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col rounded-[59px] md:flex-row gap-[22.29px] py-[5.81px] pl-[5.79px] pr-[10.71px] justify-center items-center bg-black/83">
          {/* Left Side */}
          <div className="flex flex-col sm:flex-row gap-[10.83px] justify-center items-center">
            <Image
              src="/images/ellipse.png"
              alt=""
              height={94}
              width={94}
              className="rounded-full w-[47px] lg:w-[94px] h-[47] lg:h-[94px]"
            />
            <div className="flex flex-col justify-center items-center sm:items-start gap-[11px]">
              <p className="font-bold text-[22px] leading-[24px] tracking-[0.4px]">
                Growly
              </p>
              <p className="font-normal text-base leading-[24px] tracking-[0px] text-white/[0.77] text-center sm:text-start max-w-xs">
                Empower Your Vision with a Modern, Streamlined Design
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex justify-center items-center py-[7px] lg:py-[14px] px-[12px] lg:px-[24px] rounded-[30px] bg-[#1D9ED9] w-full max-w-[164px] cursor-pointer border border-white/[0.60] hover:bg-[#1678a1]">
            <div className="flex flex-row items-center gap-[7px]">
              <p className="font-medium text-base leading-[30px] text-white">
                Case Study
              </p>
              <Image
                src="/icons/right_arrow.svg"
                alt="arrow"
                width={14.655}
                height={11.717}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
