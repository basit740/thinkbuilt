"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

const Carousel = ({ images }: { images: string[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 2,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-[25px]">
          {images.map((src, index) => (
            <div
              className="relative flex-[0_0_calc(50%-12.5px)] min-w-0"
              key={index}
            >
              <Image
                src={src}
                alt={`Carousel image ${index + 1}`}
                width={617.743}
                height={713.17}
                className="w-full h-[300px] md:h-[500px] xl:h-[713px] object-cover rounded-[25px] object-top"
              />
            </div>
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
