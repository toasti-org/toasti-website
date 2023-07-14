import type { Dispatch, SetStateAction } from "react";
import type { StructuredText as StructuredTextType } from "datocms-structured-text-utils";

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

export interface Section {
  id: string;
  title: string;
  description: StructuredTextType;
}

export interface Article {
  id: string;
  _firstPublishedAt: string;
  title: string;
  author: string;
  tags: Array<string>;
  image: Image;
  introduction: StructuredTextType;
  sections: Array<Section>;
}

export interface Event {
  id: string;
  title: string;
  description: StructuredTextType;
  date: string;
  image: Image;
}
