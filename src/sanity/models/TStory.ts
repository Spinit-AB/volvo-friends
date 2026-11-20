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
  contentBlocks?: StoryContentBlock[];
  content?: TypedObject[];
};

export type StoryContentBlock =
  | { _type: "storyText"; _key: string; text?: TypedObject[] }
  | { _type: "storyImage"; _key: string; image?: TSanityImageWithAlt & TypedObject; caption?: string }
  | { _type: "storyYoutube"; _key: string; title?: string; url?: string };
