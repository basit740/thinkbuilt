import Image from "next/image";
import React from "react";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";


const NotFound = () => {
  const router = useRouter();

  return (
    <div className="h-full w-full p-8 text-center flex flex-col items-center justify-center">
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
      <div className="mt-6">
        <Button
          type="button"
          title="Back to home"
          variant="rounded-[167px] py-[7px] px-[22px] font-semibold text-white bg-[#1D9ED9] dark:bg-[#1D9ED9] dark:text-white border-2 dark:border border-white dark:border-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] dark:shadow-none"
          onClick={() => router.push("/")}
        />
      </div>
    </div>
  );
};

export default NotFound;
