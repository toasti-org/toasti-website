export interface Image {
  id: string;
  width: number;
  height: number;
  alt: string;
  link: string;
}

export interface Article {
  id: string;
  image: Image;
  tags: Array<string>;
  title: string;
  date: string; // Check CMS
  author: string;
  intro: string;
}

export interface Event {
  title: string;
  description: string;
  date: string;
}
