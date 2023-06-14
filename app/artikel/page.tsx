import { getCMSData, allArticlesQuery } from "@/lib/cms";
import { AllArticlesCMS } from "@/types/cms";
import ArticlePageContent from "@/components/ArticlePageContent";

export const metadata = {
  title: "Artikel | TOASTI",
  description: "Halaman Artikel Website TOASTI",
};

const Artikel = async () => {
  // Query data from CMS
  const { allArticles } = await getCMSData<AllArticlesCMS>(allArticlesQuery);
  return <ArticlePageContent allArticles={allArticles} />;
};

export default Artikel;
