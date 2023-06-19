import type { Article, Event } from "./component";
import type { StructuredText as StructuredTextType } from "datocms-structured-text-utils";
import type { Image } from "./component";
import type { Section } from "./component";

export interface AllArticlesCMS {
  allArticles: Array<Article>;
}

export interface AllAstronomyCalendarsCMS {
  allAstronomyCalendars: Array<Event>;
}

export interface AllStudyMaterialsCMS {
  allStudyMaterials: Array<{
    id: string;
    title: string;
    paragraph: StructuredTextType;
    buttonText: string;
    buttonUrl: string;
  }>;
}

export interface AllAboutToastisCMS {
  allAboutToastis: Array<{
    id: string;
    title: string;
    paragraph: StructuredTextType;
    image: Image;
  }>;
}

export interface PrivacyPolicyCMS {
  privacyPolicy: {
    title: string;
    paragraph: StructuredTextType;
    sections: Array<Section>;
  };
}
