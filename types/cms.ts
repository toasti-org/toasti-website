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
    description: StructuredTextType;
    buttonText: string;
    buttonUrl: string;
  }>;
}

export interface AllAboutToastisCMS {
  allAboutToastis: Array<{
    id: string;
    title: string;
    description: StructuredTextType;
    image: Image;
  }>;
}

export interface PrivacyPolicyCMS {
  privacyPolicy: {
    title: string;
    introduction: StructuredTextType;
    sections: Array<Section>;
  };
}
