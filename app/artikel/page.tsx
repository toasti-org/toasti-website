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
  title: "Artikel | Tim Olimpiade Astronomi Indonesia (TOASTI)",
  description:
    "Artikel berkaitan dengan olimpiade atau astronomi yang dikelola oleh Tim Olimpiade Astronomi Indonesia (TOASTI).",
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
    "Artikel Astronomi",
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
    title: "Artikel | Tim Olimpiade Astronomi Indonesia (TOASTI)",
    description:
      "Artikel berkaitan dengan olimpiade atau astronomi yang dikelola oleh Tim Olimpiade Astronomi Indonesia (TOASTI).",
    url: "https://toasti.id/artikel",
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
    title: "Artikel | Tim Olimpiade Astronomi Indonesia (TOASTI)",
    description:
      "Artikel berkaitan dengan olimpiade atau astronomi yang dikelola oleh Tim Olimpiade Astronomi Indonesia (TOASTI).",
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
