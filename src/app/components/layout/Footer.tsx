import Image from "next/image";
import { footerData } from "../../constants";
import { socialIcons } from "../../constants";

const Footer = () => {
  return (
    <footer className="bg-[#0E0805] text-white min-h-[400px] py-8">
      <div className="px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
          <div className="flex flex-col items-center justify-start mt-6 sm:mt-12 md:mt-14">
            <Image
              src="/images/Group.png"
              alt="ThinkBuilt Solutions Logo"
              width={199}
              height={45}
              priority
              className="hover-animation"
            />
            <p className="w-full max-w-[277px] mt-4 text-center text-sm sm:text-base">
              We work with startups in SaaS, fintech, healthtech, AI, and Web3.
            </p>
            <div className="flex gap-2">
              {socialIcons.map((icon) => (
                <a
                  key={icon.id}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={50}
                    height={50}
                    className="w-[50px]  mt-6"
                  />
                </a>
              ))}
            </div>
          </div>

          {footerData.map((section, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-start mt-6 sm:mt-8 md:mt-10"
            >
              <ul className="mt-4 flex flex-col items-center gap-2.5">
                <li className="text-xl sm:text-2xl mb-2.5 font-semibold">
                  {section.title}
                </li>
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a
                      href={item.href}
                      className="hover:underline text-sm sm:text-base"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              {section.title === "Contact" && (
                <div className="mt-6 w-full max-w-[260px]">
                  <h1 className="text-center text-sm sm:text-base font-semibold">
                    News Letter
                  </h1>
                  <div className="flex gap-2 h-[27px] mt-6 justify-center">
                    <input
                      type="email"
                      placeholder="Enter your Email Address"
                      className="rounded-sm text-white w-[200px] px-2 text-md"
                    />
                    <Image
                      src="/images/Mail icon.png"
                      alt="Subscribe"
                      width={27}
                      height={19}
                      className="w-[20px] sm:w-[27px]"
                    />
                  </div>
                  <div className="h-[1.193px]   border-t mt-4 "></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 px-8">
          <p className="text-sm sm:text-base text-center md:text-start">
            ©ThinkBuiltSolutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
