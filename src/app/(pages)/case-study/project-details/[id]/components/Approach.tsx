import Image from "next/image";
import React from "react";

const Approach = () => {
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
    <section className="px-4 md:px-16 xl:px-[90px] py-[120px] flex flex-col gap-[55px]">
      <div className="flex gap-1.5">
        <Image
          src="/icons/flower_icon.svg"
          alt="flower-icon"
          width={20}
          height={20}
        />
        <h4 className="text-[34px] font-bold leading-[56px]">
          Our <span className="text-[#1D9ED9]">Approach</span>
        </h4>
      </div>

      <div className="flex flex-row gap-3 flex-wrap">
        {approachData.map((item, index) => {
          return (
            <div
              key={index}
              className="
      h-[403.03px] w-[295.199px] rounded-[18px] flex justify-center items-center flex-col
      "
              style={{
                backgroundImage: " url('/images/approach_card_bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
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

              <p className="text-lg font-normal leading-[26px] max-w-48 text-center">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Approach;
