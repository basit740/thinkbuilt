import React from "react";

interface Project {
  _id: string;
  key_feature: string;
}

interface KeyFeatureProps {
  project: Project;
}

const KeyFeature = ({ project }: KeyFeatureProps) => {
  return (
    <section className="px-4  xl:px-[69px]">
      <div
        className="flex w-full h-[848.87px] rounded-[9px] justify-end items-end"
        style={{
          backgroundImage: " url('/images/key_feature_background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="h-[386px] w-[638px] border-y-[14px] border-l-[14px] border-black rounded-[18.47px] flex justify-center items-center"
          style={{
            backgroundImage: " url('/images/key_feature_bg_2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex flex-col gap-[31px] items-center justify-center">
            <h5
              className="bg-[linear-gradient(180deg,#FFFFFF_2.39%,rgba(255,255,255,0.46)_143.39%)]
          bg-clip-text text-transparent
          text-[48.695px] font-bold leading-[53.978px] text-left w-full
         "
            >
              Key Feature
            </h5>
            <p className="max-w-sm">
              {project.key_feature}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeature;
