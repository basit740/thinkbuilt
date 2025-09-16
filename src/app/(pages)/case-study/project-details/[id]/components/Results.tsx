import Image from "next/image";
import React from "react";

const Results = () => {
  const ResultsData = [
    {
      id: 0,
      value: "40%",
      desc: "Increase in closed deals",
      bg_color: "#CBDEFD",
    },
    {
      id: 1,
      value: "60%",
      desc: "Time saved on admin tasks",
      bg_color: "#FFD3FA",
    },
    {
      id: 2,
      value: "3x",
      desc: "Improved lead conversion rate",
      bg_color: "#B4F8BC",
    },
  ];
  return (
    <section className="px-4 md:px-16 xl:px-[78px]  pb-[140px] pt-[123px] flex flex-col">
      <div className="flex gap-1.5">
        <Image
          src="/icons/flower_icon.svg"
          alt="flower-icon"
          width={20}
          height={20}
        />
        <h4 className="text-[34px] font-bold leading-[56px]">
          Our <span className="text-[#1D9ED9]"> Results</span>
        </h4>
      </div>

      {/* Result Cards */}
      <div className="mt-[47px] mb-8 gap-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {ResultsData.map((result, index) => {
          return (
            <div
              key={index}
              className={`py-16 px-[24px] rounded-[25.71px] flex justify-center items-center bg-[${result.bg_color}]`}
            >
              <div className="flex flex-col text-center">
                <p className="text-[64px] font-normal leading-[65.101px] tracking-[-4.069px] text-black">
                  {result.value}
                </p>
                <p className="text-[26px] font-normal leading-[48.826px] text-black/80">
                  {result.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="w-full rounded-[25.71px] border border-white/69 flex flex-col gap-[27px] px-[55px] items-center justify-start py-[38px]"
        style={{
          backgroundImage: " url('/images/comment_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex w-full items-start">
          <Image
            src="/icons/comment_logo.svg"
            alt="comment-icon"
            width={252.21}
            height={55.69}
          />
        </div>

        <div className="flex flex-col gap-[25px]">
          <h5 className="text-[38px] font-bold leading-[51.3px]">
            &quot;This CRM has revolutionized our business. We&apos;re closing
            more deals and our team is more organized than ever before.&quot;
          </h5>

          <div className="flex flex-col gap-[7px]">
            <p className="text-xl font-bold leading-[22px]">Mike Rodriguez</p>
            <p className="text-base font-normal leading-[25.6px]">
              Broker Owner, Premium Properties
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
