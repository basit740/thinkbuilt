import Image from "next/image";
import React from "react";
import Hero from "./components/Hero";
import Projects from "./components/Projects";

const page = () => {
  return (
    <>
      <div className="relative h-[655px] flex justify-center items-center">
        <Image
          src="/images/case_study_hero_bg.webp"
          alt="hero-background"
          fill
          priority
          sizes="100vw"
          className=""
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <Hero />
        </div>
      </div>
      <Projects />
    </>
  );
};

export default page;
