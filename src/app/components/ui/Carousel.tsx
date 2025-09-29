"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";

const Carousel = ({ images }: { images: string[] }) => {
  const [isMobile, setIsMobile] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
    align: "start"
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <motion.div
              className={`relative min-w-0 ${isMobile ? 'flex-[0_0_100%]' : 'flex-[0_0_calc(50%-12.5px)] mr-[25px]'}`}
              key={`carousel-${index}-${isMobile ? 'mobile' : 'desktop'}`}
              initial={isMobile ? { y: index % 2 === 0 ? -50 : 50, opacity: 0 } : { x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              whileInView={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: (index % 2) * 0.2
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Image
                src={src}
                alt={`Carousel image ${index + 1}`}
                width={617.743}
                height={713.17}
                className="w-full h-[300px] md:h-[500px] xl:h-[713px] object-cover rounded-[25px] object-top"
              />
            </motion.div>
          ))}
        </div>
      </div>
      <button
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 p-2 rounded-full cursor-pointer"
        onClick={scrollPrev}
      >
        <Image
          src="/icons/arrow_right.svg"
          alt="Previous"
          width={24}
          height={24}
          className="transform rotate-180"
        />
      </button>
      <button
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 p-2 rounded-full cursor-pointer"
        onClick={scrollNext}
      >
        <Image src="/icons/arrow_right.svg" alt="Next" width={24} height={24} />
      </button>
    </div>
  );
};

export default Carousel;
