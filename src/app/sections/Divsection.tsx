import Image from "next/image";
import { cardData } from "../constants";

const Divsection = () => {
  return (
    <section className="flex flex-col  bg-[#0E0805] items-center justify-center ">
      <h1 className="text-white text-2xl sm:text-4xl mt-[20px]">
        What We Help You <span className="text-[#1D9ED9]">&#123;</span>Build
        <span className="text-[#1D9ED9]">&#125;</span>
      </h1>

      <p className="mt-[20.62] text-white  text-xs  sm:text-xl  flex flex-col justify-center  md:text-md lg:text-lg px-3 text-center">
        From strategy to execution — get the technical clarity and engineering
        <br className="hidden sm:inline"/>
          support you need.
        
      </p>

      <div className="grid lg:grid-cols-2 gap-6 my-[40px] mx-4">
        {cardData.map((card) => (
          <div
            key={card.id}
            className={`${card.bgColor} p-4 sm:p-6 rounded-xl max-w-[550px] xl:max:w-[613px] h-[213px]`}>
            <div className="flex bg-gray-600 justify-center rounded-xl sm:w-[58px] w-[50] py-[13px]">
              <Image src={card.icon} alt={card.alt} width={31} height={31} className="sm:w-[31px] sm:h-[31px] w-[25px] h-[25px]" />
            </div>
            <h2 className="text-black text-xl sm:text-2xl my-4">{card.title}</h2>
            <p className="text-black text-sm sm:text-lg ">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Divsection;
