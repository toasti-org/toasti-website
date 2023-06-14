import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/component";
import { StructuredText } from "react-datocms/structured-text";

const Cards = ({
  size,
  article,
}: {
  size: "small" | "medium" | "large";
  article: Article;
}) => {
  return (
    <Link href={`/artikel/${article.id}`}>
      <article
        className={`flex h-fit bg-custom-blue p-2 ${
          size === "large"
            ? "w-[600px] flex-row gap-6 md:w-[728px] lg:w-[645px] xl:w-[810px]"
            : "w-[300px] flex-col gap-3 sm:w-[292px] md:w-[352px] lg:w-[306px] xl:w-[380px]"
        }`}
      >
        {/* Tags & Image */}
        <div
          className={`flex  ${
            size === "large"
              ? "flex-col items-end gap-4"
              : "flex-col-reverse gap-3"
          }`}
        >
          {/* Tags */}
          <ul className="flex flex-row items-center gap-2">
            {article.tags.map((item, index) => {
              return (
                <>
                  <li
                    className={`font-poppins-bold text-white ${
                      size === "large"
                        ? "text-sm xl:text-base"
                        : "text-xs xl:text-sm"
                    }`}
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
            className={`rounded-xl object-cover ${
              size === "large"
                ? "h-[290px] w-[350px] lg:h-[320px] lg:w-[450px]"
                : "aspect-video w-full"
            }`}
            src={article.image.url}
            width={article.image.width}
            height={article.image.height}
            alt={article.image.alt}
          />
        </div>

        {/* Texts */}
        <div
          className={`flex flex-col  ${
            size === "large" ? "max-w-[330px] gap-4  xl:max-w-[390px]" : "gap-3"
          }`}
        >
          {/* Title */}
          <h3
            className={`line-clamp-3 font-poppins-bold text-custom-white ${
              size === "large" ? "text-4xl xl:text-5xl" : "text-2xl xl:text-3xl"
            }`}
          >
            {article.title}
          </h3>

          {/* Horizontal Bar */}
          <div className="h-1 w-full bg-custom-pink" />

          {/* Date & Author */}
          <div
            className={`flex flex-row items-center gap-2 font-poppins-bold text-custom-white ${
              size === "large" ? "text-sm xl:text-base" : "text-xs xl:text-sm"
            }`}
          >
            <span>
              {new Date(article._firstPublishedAt).toLocaleDateString("id-ID", {
                dateStyle: "long",
              })}
            </span>
            <div className="h-4 w-1 bg-custom-pink" />
            <span>{article.author}</span>
          </div>

          {/* Introduction */}
          {size !== "small" && (
            <p
              className={`line-clamp-5 text-justify font-inter-medium text-custom-white ${
                size === "large" ? "text-lg xl:text-xl" : "text-base xl:text-lg"
              }`}
            >
              <StructuredText data={article.introduction} />
            </p>
          )}
        </div>
      </article>
    </Link>
  );
};

export default Cards;
