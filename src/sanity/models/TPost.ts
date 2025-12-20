import { TSanityImageWithAlt } from "./SanityImageWithAlt";
import { TypedObject } from "sanity";

export type TPost = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: { current: string };
  heroImage: TSanityImageWithAlt;
  summary: string;
  body: TypedObject[];
  gallery?: TSanityImageWithAlt[];
  language?: string;
  event?: {
    date?: string;
    time?: string;
    place?: string;
    description?: string;
  };
  prioritized?: boolean;
  color?: string;
};

export type TPostPreview = Omit<TPost, 'body' | 'gallery'>;
