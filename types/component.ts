import { Dispatch, SetStateAction } from "react";
import { StructuredText as StructuredTextType } from "datocms-structured-text-utils";

export type ContentPopUpContextType = Dispatch<
  SetStateAction<React.ReactNode | undefined>
>;

export interface Image {
  id: string;
  width: number;
  height: number;
  alt: string;
  url: string;
}

export interface Article {
  id: string;
  _firstPublishedAt: string;
  title: string;
  author: string;
  tags: Array<string>;
  image: Image;
  introduction: StructuredTextType;
  sections: Array<{
    sectionTitle: string;
    sectionContent: StructuredTextType;
  }>;
}

export interface Event {
  title: string;
  description: string;
  date: string;
  image: Image;
}
