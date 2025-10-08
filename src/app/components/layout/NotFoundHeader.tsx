//* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "../../constants/index";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

const NotFoundHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // Only handle scroll behavior for hash links (#)
    if (!href.startsWith("#")) {
      return; // Let Next.js Link handle navigation for non-hash links
    }

    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (!element) return;

    const nav = document.querySelector("nav") as HTMLElement | null;
    const navH = nav?.offsetHeight ?? 0;
    const y = element.getBoundingClientRect().top + window.scrollY - navH;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    };

    checkTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", checkTheme);

    return () => mediaQuery.removeEventListener("change", checkTheme);
  }, []);

  return (
    <>
      <nav
        className={`py-6 fixed top-0 left-0 w-full z-[70] ${
          scrolled ? "bg-black" : "bg-transparent"
        }`}
      >
        <div className="flex justify-between relative items-center xl:px-[10%] px-4">
          <Link href="/" className="block dark:hidden">
            <Image
              src="/images/light_mode_logo.png"
              priority
              alt="logo"
              width={195.63}
              height={44}
              className="w-32 h-8 md:w-[195.63px] md:h-[44px]"
            />
          </Link>

          <Link href="/" className="hidden dark:block">
            <Image
              src="/images/Group.png"
              priority
              alt="logo"
              width={195.63}
              height={44}
              className="w-32 h-8 md:w-[195.63px] md:h-[44px]"
            />
          </Link>

          <ul className="hidden h-full gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.key} className="relative group">
                <Link
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-[17px] font-semibold text-black dark:text-white flexCenter cursor-pointer pb-1.5 transition-all hover:text-blue-400"
                >
                  {link.label}
                </Link>
                <span className="absolute left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full mt-[30px]"></span>
              </li>
            ))}
          </ul>

          <div className="lg:flex text-[#0E0805] rounded-full text-lg bg-white hidden">
            <Button
              type="button"
              title="Get Started"
              variant="rounded-[167px] py-[7px] px-[22px] font-semibold text-white bg-[#1D9ED9] dark:bg-[#1D9ED9] dark:text-white border-2 dark:border border-white dark:border-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] dark:shadow-none"
              onClick={() =>
                window.open(
                  "https://calendly.com/basit-thinkbuiltsol/technical-partner",
                  "_blank"
                )
              }
            />
          </div>
          <Menu
            size={32}
            color={isDark ? "white" : "black"}
            strokeWidth={2}
            className="lg:hidden cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>
        <div className=" border-t-[1.5px] border-black dark:border-white  xl:ml-[12.5%] xl:mr-[12.5%] ml-[5%] mr-[5%] mt-[15.18px]"></div>
      </nav>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        handleScroll={handleScroll}
      />
    </>
  );
};

export default NotFoundHeader;
