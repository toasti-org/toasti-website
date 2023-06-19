import { getCMSData, allArticlesQuery } from "@/lib/cms";
import { AllArticlesCMS } from "@/types/cms";
import ArticlePageContent from "@/components/ArticlePageContent";
import type { Metadata } from "next";

const Artikel = async () => {
  // Query data from CMS
  const { allArticles } = await getCMSData<AllArticlesCMS>(allArticlesQuery);
  return <ArticlePageContent allArticles={allArticles} />;
};

export default Artikel;

export const metadata: Metadata = {
  title: "Artikel | TOASTI",
  description:
    "Artikel berkaitan dengan olimpiade atau astronomi yang dikelola oleh Tim Olimpiade Astronomi Indonesia.",
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
    "Artikel Astronomi",
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
    title: "Artikel | TOASTI",
    description:
      "Artikel berkaitan dengan olimpiade atau astronomi yang dikelola oleh Tim Olimpiade Astronomi Indonesia.",
    url: "https://toasti.id",
    siteName: "Website TOASTI",
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
    title: "Artikel | TOASTI",
    description:
      "Artikel berkaitan dengan olimpiade atau astronomi yang dikelola oleh Tim Olimpiade Astronomi Indonesia.",
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
