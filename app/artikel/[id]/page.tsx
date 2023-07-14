import Cards from "@/components/Cards";
import { getCMSData, allArticlesQuery } from "@/lib/cms";
import type { AllArticlesCMS } from "@/types/cms";
import Image from "next/image";
import { StructuredText } from "react-datocms/structured-text";
import type { Metadata } from "next";
import { render } from "datocms-structured-text-to-plain-text";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  const { allArticles } = await getCMSData<AllArticlesCMS>(allArticlesQuery);

  return allArticles.map((article) => {
    return { id: article.id };
  });
};

const ArtikelDetail = async ({ params }: { params: { id: string } }) => {
  // Get data from CMS
  const id = params.id;
  const { allArticles } = await getCMSData<AllArticlesCMS>(allArticlesQuery);
  const article = allArticles.find((article) => {
    return article.id === id;
  });

  // If article is not found
  if (!article) {
    return notFound();
  }

  // Get related articles
  const relatedArticles = allArticles.filter((iterateArticle) => {
    return (
      iterateArticle.id !== id &&
      iterateArticle.tags.some((tag) => article.tags.includes(tag))
    );
  });

  return (
    <main className="flex flex-auto flex-col items-center justify-center gap-12 bg-custom-blue px-5 py-10 sm:p-10 lg:flex-row lg:items-start lg:p-14 xl:gap-16 xl:p-16 2xl:p-20">
      {/* Article */}
      <article className="flex w-full max-w-4xl flex-col gap-8 xl:gap-10">
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
          <h3 className="font-poppins-bold text-4xl leading-snug text-custom-white xl:text-5xl xl:leading-tight">
            {article.title}
          </h3>

          {/* Horizontal Bar */}
          <div className="h-1 w-full bg-custom-pink" />

          {/* Date and Author */}
          <div className="flex flex-row items-center gap-2 font-poppins-bold text-sm text-custom-white xl:text-base">
            <span>
              {new Date(article._firstPublishedAt).toLocaleDateString("id-ID", {
                dateStyle: "long",
              })}
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
        <section className="flex flex-col gap-2 text-justify font-inter-medium text-base text-custom-white xl:gap-4 xl:text-lg">
          <StructuredText data={article.introduction} />
        </section>

        {/* Section Mapping */}
        {article.sections.map((section, index) => {
          return (
            <section className="flex flex-col gap-2 xl:gap-4" key={index}>
              <h2 className="font-poppins-bold text-2xl text-custom-pink xl:text-3xl">
                {section.title}
              </h2>
              <div className="flex flex-col gap-2 text-justify font-inter-medium text-base text-custom-white xl:gap-4 xl:text-lg">
                <StructuredText data={section.description} />
              </div>
            </section>
          );
        })}
      </article>

      {/* Article Recommendation */}
      <aside className="flex flex-col gap-12 sm:flex-row sm:justify-center lg:flex-col">
        {/* Maximum 3 Newest Article In General and not the current article*/}
        <section className="flex flex-col items-center gap-5 sm:items-start">
          {/* Title and Horizontal Bar */}
          <h3 className="border-b-4 border-custom-pink pb-2 font-poppins-bold text-3xl text-custom-white xl:pb-3 xl:text-4xl">
            Artikel Terbaru
          </h3>
          {/* Articles */}
          {allArticles
            .filter((iterateArticle) => {
              return iterateArticle.id !== id;
            })
            .slice(0, 3)
            .map((iterateArticle) => {
              return (
                <div key={iterateArticle.id}>
                  <Cards size="small" article={iterateArticle} />
                </div>
              );
            })}
        </section>

        {/* Maximum 3 newest article with the same tags and not the current article*/}
        {/* Check if any tags in iterateArticle is a member or current article tags and the iterated article is not the current article */}
        {relatedArticles.length > 0 && (
          <section className="flex flex-col items-center gap-6 sm:items-start">
            {/* Title and Horizontal Bar */}
            <h3 className="border-b-4 border-custom-pink pb-2 font-poppins-bold text-3xl text-custom-white xl:pb-3 xl:text-4xl">
              Artikel Terkait
            </h3>

            {/* Articles */}
            {relatedArticles.slice(0, 3).map((iterateArticle) => {
              return (
                <div key={iterateArticle.id}>
                  <Cards size="small" article={iterateArticle} />
                </div>
              );
            })}
          </section>
        )}
      </aside>
    </main>
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

  const title = `${
    article ? `${article.title}` : "Error 404"
  } | Tim Olimpiade Astronomi Indonesia (TOASTI)`;
  const description = article
    ? (render(article.introduction) as string)
    : "Halaman Error 404 Website Tim Olimpiade Astronomi Indonesia (TOASTI).";

  return {
    title: title,
    description: description,
    generator: "Next.js",
    applicationName: "Tim Olimpiade Astronomi Indonesia (TOASTI)",
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
    category: "education",
    themeColor: "#1A3072",
    verification: {
      google: "google",
      yandex: "yandex",
      yahoo: "yahoo",
    },
    openGraph: {
      title: title,
      description: description,
      url: `https://toasti.id/artikel/${id}`,
      siteName: "Tim Olimpiade Astronomi Indonesia (TOASTI)",
      images: [
        {
          url: "https://toasti.id/toasti-link-preview.png",
          width: 1200,
          height: 630,
          alt: "TOASTI Logo",
        },
      ],
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [
        {
          url: "https://toasti.id/toasti-link-preview.png",
          width: 1200,
          height: 630,
          alt: "TOASTI Logo",
        },
      ],
    },
  };
};
