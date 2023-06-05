import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/component";

const NormalCards = ({ article }: { article: Article }) => {
  return (
    <Link href={`/artikel/${article.id}`}>
      <article className="flex h-fit w-[300px] flex-col gap-y-3 bg-custom-blue p-4 xl:w-[360px]">
        {/* Image */}
        <Image
          className="h-[165px] w-[300px] rounded-xl object-cover lg:h-[200px] lg:w-[360px]"
          src={article.image.link}
          width={article.image.width}
          height={article.image.height}
          alt={article.image.alt}
        />

        {/* Tags */}
        <ul className="flex flex-row items-center gap-2">
          {article.tags.map((item, index) => {
            return (
              <>
                <li
                  className="font-poppins-bold text-xs text-white xl:text-sm"
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

        {/* Title */}
        <h3 className="line-clamp-3 font-poppins-bold text-2xl text-custom-white xl:text-3xl">
          {article.title}
        </h3>

        {/* Horizontal Bar */}
        <div className="h-1 w-full bg-custom-pink" />

        {/* Date & Author */}
        <div className="flex flex-row items-center gap-2 font-poppins-bold text-xs text-custom-white xl:text-sm">
          <span>
            {new Date(article.date).toLocaleDateString("id-ID", {
              dateStyle: "long",
            })}
          </span>
          <div className="h-4 w-1 bg-custom-pink" />
          <span>{article.author}</span>
        </div>

        {/* Introduction */}
        <p className="line-clamp-5 font-inter-medium text-base text-custom-white xl:text-lg">
          {article.intro}
        </p>
      </article>
    </Link>
  );
};

export default NormalCards;
