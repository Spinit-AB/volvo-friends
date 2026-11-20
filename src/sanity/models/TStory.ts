import type { TypedObject } from "sanity";
import type { TSanityImageWithAlt } from "./SanityImageWithAlt";

export type TStoryCategory = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  image?: TSanityImageWithAlt;
  isActive: boolean;
};

export type TStoryPreview = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  listImage?: TSanityImageWithAlt;
};

export type TStory = TStoryPreview & {
  category: TStoryCategory;
  content?: TypedObject[];
};
