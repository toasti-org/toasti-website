"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { AllArticlesCMS } from "@/types/cms";
import { StructuredText } from "react-datocms/structured-text";
import CarouselButton from "./CarouselButton";
import { Article } from "@/types/component";

const CarouselCards = ({ allArticles }: AllArticlesCMS) => {
  // Displayed article state
  const fiveLatestArticle = allArticles.slice(0, 5);
  const iterateArray = [0, 1, 2, 3, 4];
  const [displayIdx, setDisplayIdx] = useState(0);
  const article = fiveLatestArticle.at(displayIdx) as Article;
  const nextIndex = (displayIdx + 1) % 5;
  const prevIndex = (displayIdx - 1) % 5;

  // Autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayIdx(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div className="flex flex-col items-center gap-3 xl:gap-5">
      {/* Article Carousel */}
      <div className="flex flex-row items-center sm:gap-2 md:gap-4 lg:gap-6">
        {/* Previous Button */}
        <CarouselButton
          onClick={() => {
            setDisplayIdx(prevIndex);
          }}
          type="previous"
          disabled={false}
        />

        {/* Article */}
        <Link href={`/artikel/${article.id}`}>
          <article className="flex h-[475px] max-w-[300px] flex-col gap-2 bg-custom-blue p-2 sm:h-[290px] sm:max-w-[700px] sm:flex-row sm:gap-6 xl:h-[370px] xl:max-w-[970px] xl:gap-8">
            {/* Tags & Image */}
            <div className="flex flex-col-reverse gap-3 sm:w-[55%] sm:flex-col sm:items-end sm:gap-4 sm:pt-3">
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
            <div className="flex flex-col gap-3 sm:w-[45%] xl:gap-4">
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

        {/* Next Button */}
        <CarouselButton
          onClick={() => {
            setDisplayIdx(nextIndex);
          }}
          type="next"
          disabled={false}
        />
      </div>

      {/* Carousel Status */}
      <div className="flex flex-row items-center gap-2">
        {iterateArray.map((index) => {
          return (
            <div
              key={index}
              onClick={() => setDisplayIdx(index)}
              className={`cursor-pointer rounded-full bg-custom-pink lg:hover:bg-custom-dark-pink ${
                index === iterateArray.at(displayIdx)
                  ? "h-4 w-4 bg-opacity-100"
                  : "h-3 w-3 bg-opacity-50"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CarouselCards;
