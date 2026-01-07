import { TSanityImageWithAlt } from "./SanityImageWithAlt";
import { TypedObject } from "sanity";

export type TColor = "blue" | "teal" | "green" | "orange" | "red";

export type TUpcomingEvent = {
  _id: string;
  title: string;
  slug: { current: string };
  heroImage: TSanityImageWithAlt;
  prioritized?: boolean;
  color?: TColor;
  date: string;
  time: string;
  place: string;
};

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
  color?: TColor;
};

export type TPostPreview = Omit<TPost, "body" | "gallery">;
