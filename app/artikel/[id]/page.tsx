import Cards from "@/components/Cards";
import { getCMSData, allArticlesQuery } from "@/lib/cms";
import type { AllArticlesCMS } from "@/types/cms";
import Image from "next/image";
import { StructuredText } from "react-datocms/structured-text";
import type { Metadata } from "next";

export const generateStaticParams = async () => {
  const { allArticles } = await getCMSData<AllArticlesCMS>(allArticlesQuery);

  return allArticles.map((article) => {
    return { id: article.id };
  });
};

const ArtikelDetail = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const { allArticles } = await getCMSData<AllArticlesCMS>(allArticlesQuery);
  const article = allArticles.find((article) => {
    return article.id === id;
  });
  return (
    <>
      {typeof article !== "undefined" && (
        <main className="flex flex-auto flex-col gap-12 bg-custom-blue px-5 py-10 sm:px-10 md:px-12 lg:flex-row lg:px-14 lg:py-12 xl:gap-16 xl:px-16 xl:py-14 2xl:px-20 2xl:py-16">
          {/* Article */}
          <article className="flex flex-col gap-8 xl:gap-10">
            {/* Title Div */}
            <div className="flex flex-col gap-4 xl:gap-6">
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

              {/* Title */}
              <h3 className="line-clamp-3 font-poppins-bold text-4xl text-custom-white xl:text-5xl">
                {article.title}
              </h3>

              {/* Horizontal Bar */}
              <div className="h-1 w-full bg-custom-pink" />

              {/* Date and Author */}
              <div className="flex flex-row items-center gap-2 font-poppins-bold text-sm text-custom-white xl:text-base">
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
            </div>

            {/* Image */}
            <Image
              className="aspect-video w-full rounded-xl object-cover"
              src={article.image.url}
              width={article.image.width}
              height={article.image.height}
              alt={article.image.alt}
            />

            {/* Introduction */}
            <section>
              <p className="text-justify font-inter-medium text-base text-custom-white xl:text-lg">
                <StructuredText data={article.introduction} />
              </p>
            </section>

            {/* Section Mapping */}
            {article.sections.map((section, index) => {
              return (
                <section className="flex flex-col gap-2 xl:gap-4" key={index}>
                  <h2 className="font-poppins-bold text-2xl text-custom-pink xl:text-3xl">
                    {section.title}
                  </h2>
                  {section.paragraphs.map((item) => {
                    return (
                      <p
                        key={item.id}
                        className="text-justify font-inter-medium text-base text-custom-white xl:text-lg"
                      >
                        <StructuredText data={item.paragraph} />
                      </p>
                    );
                  })}
                </section>
              );
            })}
          </article>

          {/* Article Recommendation */}
          <aside className="flex flex-col gap-12 sm:flex-row sm:justify-center lg:flex-col">
            {/* Maximum 3 Newest Article In General and not the current article*/}
            <section className="flex flex-col items-center gap-5">
              {/* Title and Horizontal Bar */}
              <div className="flex w-full flex-col gap-2">
                <h3 className="font-poppins-bold text-3xl text-custom-white xl:text-4xl">
                  Artikel Terbaru
                </h3>
                <div className="h-1 w-full bg-custom-pink" />
              </div>
              {/* Articles */}
              {allArticles
                .filter((iterateArticle) => {
                  return iterateArticle.id !== id;
                })
                .slice(0, 3)
                .map((iterateArticle) => {
                  return (
                    <Cards
                      key={iterateArticle.id}
                      size="small"
                      article={iterateArticle}
                    />
                  );
                })}
            </section>

            {/* Maximum 3 newest article with the same tags and not the current article*/}
            {/*  Check if any tags in iterateArticle is a member or current article tags and the iterated article is not the current article */}
            <section className="flex flex-col items-center gap-6">
              {/* Title and Horizontal Bar */}
              <div className="flex w-full flex-col gap-2">
                <h3 className="font-poppins-bold text-3xl text-custom-white xl:text-4xl">
                  Artikel Terkait
                </h3>
                <div className="h-1 w-full bg-custom-pink" />
              </div>

              {/* Articles */}
              {allArticles
                .filter((iterateArticle) => {
                  return (
                    iterateArticle.id !== id &&
                    iterateArticle.tags.some((tag) =>
                      article.tags.includes(tag)
                    )
                  );
                })
                .slice(0, 3)
                .map((iterateArticle) => {
                  return (
                    <Cards
                      key={iterateArticle.id}
                      size="small"
                      article={iterateArticle}
                    />
                  );
                })}
            </section>
          </aside>
        </main>
      )}
    </>
  );
};

export default ArtikelDetail;

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const id = params.id;
  const { allArticles } = await getCMSData<AllArticlesCMS>(allArticlesQuery);
  const article = allArticles.find((article) => {
    return article.id === id;
  });

  return {
    title: `${article?.title} | Website TOASTI`,
    description: `Artikel ${article?.title} Website TOASTI`,
    generator: "Next.js",
    applicationName: "Website TOASTI",
    keywords: [
      "TOASTI",
      "Tim Olimpiade Astronomi Indonesia",
      "Website TOASTI",
      "Astronomi",
      "OSN Astronomi",
      "OSP Astronomi",
      "OSK Astronomi",
      `${article?.title}`,
    ],
    colorScheme: "dark",
    creator: "Tim Website TOASTI",
    category: "education",
    themeColor: "#1A3072",
    verification: {
      google: "google",
      yandex: "yandex",
      yahoo: "yahoo",
    },
    openGraph: {
      title: `${article?.title} | Website TOASTI`,
      description: `Artikel ${article?.title} Website TOASTI`,
      url: "https://toasti.id",
      siteName: "Website TOASTI",
      images: [
        {
          url: `${article?.image.url}`,
          width: `${article?.image.width}`,
          height: `${article?.image.height}`,
          alt: `${article?.image.alt}`,
        },
        {
          url: "https://toasti.id/toasti-full-light-logo.png.png",
          width: 1022,
          height: 188,
          alt: "TOASTI Logo",
        },
      ],
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${article?.title} | Website TOASTI`,
      description: `Artikel ${article?.title} Website TOASTI`,
      images: [
        {
          url: `${article?.image.url}`,
          width: `${article?.image.width}`,
          height: `${article?.image.height}`,
          alt: `${article?.image.alt}`,
        },
        {
          url: "https://toasti.id/toasti-full-light-logo.png.png",
          width: 1022,
          height: 188,
          alt: "TOASTI Logo",
        },
      ],
    },
  };
};
