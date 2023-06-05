import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/types/component";

const HeadlineCards = ({ article }: { article: Article }) => {
  return (
    <Link href={`/artikel/${article.id}`}>
      <article className="flex h-fit w-fit flex-row gap-6 bg-custom-blue p-4">
        {/* Tags & Image */}
        <div className="flex flex-col items-end gap-4">
          {/* Tags */}
          <ul className="flex flex-row items-center gap-2">
            {article.tags.map((item, index) => {
              return (
                <>
                  <li
                    className="font-poppins-bold text-sm text-white xl:text-base"
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
            className="h-[290px] w-[350px] rounded-xl object-cover lg:h-[320px] lg:w-[450px]"
            src={article.image.link}
            width={article.image.width}
            height={article.image.height}
            alt={article.image.alt}
          />
        </div>

        {/* Texts */}
        <div className="flex max-w-[330px] flex-col gap-4 xl:max-w-[460px]">
          {/* Title */}
          <h3 className="line-clamp-3 font-poppins-bold text-4xl text-custom-white xl:text-5xl">
            {article.title}
          </h3>

          {/* Horizontal Bar */}
          <div className="h-1 w-full bg-custom-pink" />

          {/* Date & Author */}
          <div className="flex flex-row items-center gap-2 font-poppins-bold text-sm text-custom-white xl:text-base">
            <span>
              {new Date(article.date).toLocaleDateString("id-ID", {
                dateStyle: "long",
              })}
            </span>
            <div className="h-4 w-1 bg-custom-pink" />
            <span>{article.author}</span>
          </div>

          {/* Introduction */}
          <p className="line-clamp-5 font-inter-medium text-lg text-custom-white xl:text-xl">
            {article.intro}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default HeadlineCards;
