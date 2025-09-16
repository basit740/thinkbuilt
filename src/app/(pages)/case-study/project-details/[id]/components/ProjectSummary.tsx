import Image from "next/image";
import React from "react";

const ProjectSummary = () => {
  return (
    <section className="flex flex-col gap-[45px] px-4 md:px-16 xl:px-[90px] ">
      <div className="w-full flex justify-between text-white">
        {/* Left Side */}
        <div className="flex flex-col gap-2.5">
          <h2 className="text-5xl font-bold">SEINNA</h2>
          <p className="max-w-xl text-lg font-normal leading-[23.04px] -tracking-[0.72px]">
            A cozy digital home for a neighborhood café, featuring seasonal
            menus, event updates, and warm visual storytelling
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-4 w-[344px] text-base font-normal leading-[20.8px] -tracking-[0.64px] justify-center">
          <div className="flex justify-between">
            <p>Client</p>
            <p>Noto Café & Bakery</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p>Date</p>
            <p>Apr 29, 2025</p>
          </div>
        </div>
      </div>

      {/* Thumbnail Image */}
      <div>
        <Image
          src="/images/project_thumbnail.png"
          alt="project-thumbnail"
          height={717}
          width={1260}
          className="w-full h-[713.17px] object-cover rounded-[25px]"
        />
      </div>
    </section>
  );
};

export default ProjectSummary;
