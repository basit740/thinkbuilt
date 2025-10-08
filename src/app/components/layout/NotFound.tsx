import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div className="h-full w-full border border-[#1D9ED9] p-8 text-center flex flex-col items-center justify-center bg-[#1D9ED90F]">
      <Image
        src="/images/NotFoundBg.png"
        alt="not_found_bg"
        width={655}
        height={460}
        className="w-full h-[340px] md:w-[580px] md:h-[460px] md:-ml-6.5"
      />
      <div className="-mt-14 md:-mt-28">
        <p className="text-[#1097D4] text-[25px] font-medium mb-1">
          “Oops! Page Not Found”
        </p>
        <p className="text-[#1097D4] text-base font-normal">
          “Sorry, we can’t seem to find the page you’re looking for. Let’s get
          you back home.”
        </p>
      </div>
    </div>
  );
};

export default NotFound;
