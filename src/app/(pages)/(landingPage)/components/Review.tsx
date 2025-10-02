"use client";
import { useInView, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useGetReviewsQuery } from "@/store/api/reviewsApi";

const Review = () => {
  const { data: reviewsData, isLoading } = useGetReviewsQuery({});
  const ApiReviews = reviewsData?.reviews || [];

  const isMediumUp = useMediaQuery({ minWidth: 1024 });
  const reviewsImageRef = useRef(null);
  const reviewsImageRefInView = useInView(reviewsImageRef, {
    once: true,
    amount: 0.4,
  });
  const [clipOpen, setClipOpen] = useState(false);
  const CLIP_TRANSITION_MS = 600;
  const clipTimerRef = useRef<number | null>(null);

  const reviewsRef = useRef(null);
  const reviewsRefInView = useInView(reviewsRef, { once: true, amount: 0.4 });
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const [containerHeight, setContainerHeight] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const activeCardNode = cardRefs.current[currentReviewIndex];
    if (activeCardNode) {
      setTimeout(() => {
        setContainerHeight(activeCardNode?.scrollHeight);
      }, 100);
    }
  }, [currentReviewIndex, reviewsData]);

  const openClipWindow = () => {
    setClipOpen(true);
    if (clipTimerRef.current) window.clearTimeout(clipTimerRef.current);
    clipTimerRef.current = window.setTimeout(() => {
      setClipOpen(false);
    }, CLIP_TRANSITION_MS);
  };

  useEffect(() => {
    return () => {
      if (clipTimerRef.current) window.clearTimeout(clipTimerRef.current);
    };
  }, []);

  const handleNext = () => {
    openClipWindow();
    setCurrentReviewIndex((prev) => (prev + 1) % ApiReviews.length);
  };

  const handlePrev = () => {
    openClipWindow();
    setCurrentReviewIndex((prev) =>
      prev === 0 ? ApiReviews.length - 1 : prev - 1
    );
  };

  return (
    <section
      id="testimonials"
      ref={reviewsRef}
      className="relative flex flex-col bg-[#0E0805] items-center justify-center px-4 md:px-8 lg:px-[154px] py-16 lg:py-[120px]"
    >
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        animate={
          reviewsRefInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -80 }
        }
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <h1 className="text-white text-4xl md:text-[48px] font-normal leading-[140%] capitalize text-center max-w-4xl mx-auto mb-6 sm:mb-8 lg:mb-12 mt-[20px]">
          <span className="text-white/80">
            What Founders Say After Working With
          </span>{" "}
          <br />
          <span className="flex items-center justify-center mt-2 sm:mt-3 font-medium">
            <span className="text-[#1D9ED9] mr-1">{"{"}</span>
            ThinkBuilt
            <span className="text-[#1D9ED9] ml-1">{"}"}</span>
          </span>
        </h1>
      </motion.div>

      <div className="relative flex flex-row justify-center items-stretch w-full">
        {/* Review Cards Section - Second Column */}
        <div
          ref={reviewsImageRef}
          style={{
            height: containerHeight > 0 ? `${containerHeight}px` : "auto",
          }}
          className={`relative w-full h-auto overflow-hidden lg:overflow-visible rounded-[23px] transition-all duration-500
            ${
              clipOpen
                ? "lg:[clip-path:inset(-9999px_-9999px_-9999px_-9999px)]"
                : "lg:[clip-path:inset(0_-9999px_0_0)]"
            }`}
        >
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className={`absolute top-0 left-0 right-0 w-full bg-gray-700 rounded-[25.27px] transform-gpu transition-all duration-500 origin-bottom-center ${
                  index > 0 ? "hidden sm:block -top-[32px] left-[-28px]" : ""
                }`}
              >
                <div className="grid grid-cols-3 w-full gap-2 items-stretch border-y-2 border-gray-500 rounded-[25.71px]">
                  <div className="col-span-1 h-full border border-gray-400 rounded-l-[25px] rounded-r-2xl bg-gray-600 animate-pulse"></div>
                  <div className="col-span-2 flex flex-col justify-center p-4 md:p-11 gap-6 h-[500px] bg-gray-600 animate-pulse">
                    <div className="h-10 bg-gray-500 rounded"></div>
                    <div className="h-20 bg-gray-500 rounded"></div>
                    <div className="h-6 bg-gray-500 rounded"></div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : ApiReviews.length > 0 ? (
            // Dynamically render cards based on available reviews
            (() => {
              const numToShow = Math.min(ApiReviews.length, 3);
              const positions = ["active", "behindOne", "behindTwo"].slice(
                0,
                numToShow
              );
              return positions.map((position, posIndex) => {
                const index =
                  (currentReviewIndex + posIndex) % ApiReviews.length;
                return { index, position };
              });
            })().map(({ index, position }) => {
              const review = ApiReviews[index];
              const isActive = position === "active";
              const isBehindOne = position === "behindOne";
              const isBehindTwo = position === "behindTwo";

              let zIndex = 0;

              if (isActive) {
                zIndex = 20;
              } else if (isBehindOne) {
                zIndex = 15;
              } else if (isBehindTwo) {
                zIndex = 10;
              }

              return (
                <motion.div
                  key={`${index}`}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  initial={{
                    opacity: 0,
                    x: isMediumUp ? 0 : 0,
                    y: isMediumUp ? 0 : 0,
                  }}
                  animate={
                    reviewsImageRefInView && {
                      opacity: isActive ? 1 : 1.2,
                      scale: isActive ? 1 : 1,
                      rotate: isActive
                        ? 0
                        : isBehindOne
                        ? 5.5
                        : isBehindTwo
                        ? 8
                        : 0,
                      // y: isActive ? 0 : isBehindOne ? 8 : isBehindTwo ? 20 : 36,
                      x: isMediumUp
                        ? isActive
                          ? 0
                          : isBehindOne
                          ? 8
                          : isBehindTwo
                          ? 8
                          : 0
                        : 0,
                      y: !isMediumUp
                        ? isActive
                          ? 0
                          : isBehindOne
                          ? 8
                          : isBehindTwo
                          ? 8
                          : 0
                        : 0,
                      zIndex: zIndex,
                    }
                  }
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{
                    transformOrigin: "bottom center",
                    backgroundImage: "url('/images/review_card_bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className={`absolute top-0 left-0 right-0 w-full bg-[#1F1D1D] rounded-[25.27px] transform-gpu transition-all duration-500 origin-bottom-center border-r border-gray-400 ${
                    isBehindOne
                      ? "-top-[32px]! left-[-28px] border border-gray-400"
                      : ""
                  } ${
                    isBehindTwo
                      ? "-top-[32px]! left-[-28px] border border-gray-400"
                      : ""
                  }`}
                >
                  <div className="grid grid-cols-3 w-full gap-2 items-stretch border-y-2 border-gray-500 rounded-[25.71px]">
                    {/*Left Side*/}
                    <motion.div
                      ref={reviewsImageRef}
                      initial={{
                        opacity: 0,
                        x: isMediumUp ? -80 : 0,
                        y: isMediumUp ? 0 : -80,
                      }}
                      animate={
                        reviewsImageRefInView
                          ? { opacity: 1, x: 0, y: 0 }
                          : {
                              opacity: 0,
                              x: isMediumUp ? -80 : 0,
                              y: isMediumUp ? 0 : -80,
                            }
                      }
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="col-span-1 h-full border border-gray-400 rounded-l-[25px] rounded-r-2xl overflow-hidden"
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-l-[25px]">
                        <Image
                          src={review?.founderImageUrl || ""}
                          alt={review?.founderName || "Founder"}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                    </motion.div>

                    {/*Right Side*/}
                    <motion.div
                      ref={reviewsImageRef}
                      initial={{
                        opacity: 0,
                        x: isMediumUp ? 80 : 0,
                        y: isMediumUp ? 0 : 80,
                      }}
                      animate={
                        reviewsImageRefInView
                          ? { opacity: 1, x: 0, y: 0 }
                          : {
                              opacity: 0,
                              x: isMediumUp ? 80 : 0,
                              y: isMediumUp ? 0 : 80,
                            }
                      }
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="col-span-2 flex flex-col justify-center p-4 md:p-11 gap-6 h-[500px]"
                    >
                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src={review?.companyLogoUrl || ""}
                          alt={review?.companyName || "Company"}
                          width={129.28}
                          height={36}
                          className="h-9 w-32 md:h-[50px] md:w-[200px] object-contain"
                        />
                        {/* <h1 className="text-white text-lg md:text-3xl font-semibold">
                          {review?.companyName || ""}
                        </h1> */}
                      </div>

                      <p className="text-white text-sm md:text-base lg:text-lg mb-4 sm:mb-6 text-wrap">
                        {review?.review || "No review available"}
                      </p>

                      <div>
                        <span className="text-white text-sm sm:text-base md:text-lg font-medium">
                          {review?.founderName || "Founder"},
                        </span>
                        <span className="text-white text-xs sm:text-sm md:text-base block xl:pb-[20px]">
                          CEO of {review?.companyName || "Company"}
                        </span>
                      </div>

                      {isActive && (
                        <div className="flex mt-4 sm:mt-6 gap-3 sm:gap-4">
                          <div
                            className="rounded-full w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] bg-blue-300 flex items-center justify-center border-2 border-white cursor-pointer"
                            onClick={handlePrev}
                          >
                            <Image
                              src="/icons/Vector 3.svg"
                              alt="Previous"
                              width={25}
                              height={25}
                              className="w-4 h-4 sm:w-5 sm:h-5 transform rotate-180"
                            />
                          </div>
                          <div
                            className="rounded-full w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] bg-blue-300 flex items-center justify-center border-2 border-white cursor-pointer"
                            onClick={handleNext}
                          >
                            <Image
                              src="/icons/Vector 3.svg"
                              alt="Next"
                              width={25}
                              height={25}
                              className="w-[17px] h-[17px] sm:w-[25px] sm:h-[25px]"
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-white text-center py-8">
              No reviews available
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex justify-end mt-3">
        <p className="text-white font-semibold">
          {currentReviewIndex + 1} of {ApiReviews.length} (Testimonials)
        </p>
      </div>
    </section>
  );
};

export default Review;
