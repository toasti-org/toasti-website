import type { Article, Event } from "./component";
import type { StructuredText as StructuredTextType } from "datocms-structured-text-utils";
import type { Image } from "./component";

export interface AllArticlesCMS {
  allArticles: Array<Article>;
}

export interface AllEventsCMS {
  allEvents: Array<Event>;
}

export interface AboutUsPageCMS {
  aboutUsPage: {
    aboutUsSections: Array<{
      id: string;
      sectionTitle: string;
      paragraphSection: StructuredTextType;
      imageSection: Image;
    }>;
  };
}
