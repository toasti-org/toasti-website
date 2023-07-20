"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { AllArticlesCMS } from "@/types/cms";
import { StructuredText } from "react-datocms/structured-text";
import CarouselButton from "./CarouselButton";
import { Article } from "@/types/component";
import { motion, AnimatePresence } from "framer-motion";
import { variants } from "@/lib/framer";
import { useSwipeable } from "react-swipeable";

const CarouselCards = ({ allArticles }: AllArticlesCMS) => {
  // Displayed article state
  const fiveLatestArticle = allArticles.slice(0, 5);
  const [displayIdx, setDisplayIdx] = useState(0);
  const article = fiveLatestArticle[displayIdx];

  // Direction & pause
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);

  // Next & Prev value
  const nextIndex = (displayIdx + 1) % 5;
  const prevIndex = (displayIdx - 1 + 5) % 5;

  // Previous and Next function
  const handlePrevious = () => {
    setDisplayIdx(prevIndex);
    setDirection(-1);
  };

  const handleNext = () => {
    setDisplayIdx(nextIndex);
    setDirection(+1);
  };

  // Swipeable effect
  const swipeableHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    onTouchStartOrOnMouseDown: () => setPaused(true),
    onTouchEndOrOnMouseUp: () => setPaused(false),
    swipeDuration: 500,
    delta: 60,
  });

  // Autoplay and paused effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setDisplayIdx(nextIndex);
        setDirection(+1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [paused, nextIndex]);

  return (
    <div className="flex flex-col items-center gap-3 xl:gap-5">
      {/* Article Carousel */}
      <div className="flex flex-row items-center sm:gap-2 md:gap-4 lg:gap-6">
        {/* Previous Button */}
        <CarouselButton
          onClick={handlePrevious}
          type="previous"
          disabled={false}
        />

        {/* Article */}
        <div
          {...swipeableHandlers}
          className="relative h-[480px] w-[75vw] overflow-hidden sm:h-[290px] lg:w-[65vw] xl:h-[370px] 2xl:w-[60vw]"
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              variants={variants}
              animate="animate"
              initial="initial"
              exit="exit"
              className="absolute inset-0"
              key={article.id}
              custom={direction}
            >
              <Link href={`/artikel/${article.id}`}>
                <article className="flex h-[480px] w-[75vw] flex-col gap-2 bg-custom-blue p-2 sm:h-[290px] sm:flex-row sm:gap-6 lg:w-[65vw] xl:h-[370px] xl:gap-8 2xl:w-[60vw]">
                  {/* Tags & Image */}
                  <div className="flex flex-col-reverse gap-3 sm:w-[50%] sm:flex-col sm:items-end sm:gap-4 sm:pt-3">
                    {/* Tags */}
                    <ul className="flex flex-row flex-wrap items-center gap-2">
                      {article.tags.map((item, index) => {
                        return (
                          <>
                            <li
                              className="font-poppins-bold text-xs text-white xl:text-base"
                              key={index}
                            >
                              {item.toUpperCase()}
                            </li>
                            {index !== article.tags.length - 1 && (
                              <div className="h-4 w-1 bg-custom-pink" />
                            )}
                          </>
                        );
                      })}
                    </ul>

                    {/* Image */}
                    <Image
                      className="h-[150px] w-full rounded-xl object-cover sm:flex-auto"
                      src={article.image.url}
                      width={article.image.width}
                      height={article.image.height}
                      alt={article.image.alt}
                    />
                  </div>

                  {/* Texts */}
                  <div className="flex h-fit flex-col gap-3 sm:w-[50%] xl:gap-4">
                    {/* Title */}
                    <h3 className="line-clamp-3 font-poppins-bold text-2xl text-custom-white xl:text-4xl xl:leading-tight">
                      {article.title}
                    </h3>

                    {/* Horizontal Bar */}
                    <div className="h-1 w-full bg-custom-pink" />

                    {/* Date & Author */}
                    <div className="flex flex-row items-center gap-2 font-poppins-bold text-xs text-custom-white xl:text-base">
                      <span>
                        {new Date(article._firstPublishedAt).toLocaleDateString(
                          "id-ID",
                          {
                            dateStyle: "long",
                          }
                        )}
                      </span>
                      <div className="h-4 w-1 bg-custom-pink" />
                      <span>{article.author}</span>
                    </div>

                    {/* Introduction */}
                    <p className="line-clamp-5 text-justify font-inter-medium text-base text-custom-white xl:text-xl">
                      <StructuredText data={article.introduction} />
                    </p>
                  </div>
                </article>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Button */}
        <CarouselButton onClick={handleNext} type="next" disabled={false} />
      </div>

      {/* Carousel Status */}
      <div className="flex flex-row items-center gap-2">
        {Array.from({ length: 5 }, (_, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setDisplayIdx(index);
                if (index > displayIdx) {
                  setDirection(+1);
                }
                if (index < displayIdx) {
                  setDirection(-1);
                }
              }}
              className={`cursor-pointer rounded-full bg-custom-pink ${
                index === displayIdx
                  ? "h-4 w-4 bg-opacity-100"
                  : "h-3 w-3 bg-opacity-50 xl:hover:bg-custom-dark-pink"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CarouselCards;
