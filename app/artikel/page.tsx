import { getCMSData } from "@/lib/cms";
import { AllArticlesCMS } from "@/types/cms";
import ArticlePageContent from "@/components/ArticlePageContent";

export const metadata = {
  title: "Artikel | TOASTI",
  description: "Halaman Artikel Website TOASTI",
};

const Home = async () => {
  // Query data from CMS
  const { allArticles } = await getCMSData<AllArticlesCMS>(query);
  return <ArticlePageContent allArticles={allArticles} />;
};

export default Home;

const query = `{
  allArticles(orderBy: _firstPublishedAt_ASC) {
    id
    _firstPublishedAt
    title
    author
    tags
    image {
      id
      width
      height
      alt
      url
    }
    introduction {
      blocks
      links
      value
    }
    sections {
      sectionTitle
      sectionContent {
        blocks
        links
        value
      }
    }
  }
}`;
