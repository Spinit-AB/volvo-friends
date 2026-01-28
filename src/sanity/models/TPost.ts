import { TColor } from "@/utils/types";
import { TSanityImageWithAlt } from "./SanityImageWithAlt";
import { TypedObject } from "sanity";

export type TUpcomingEvent = {
  _id: string;
  title: string;
  slug: { current: string };
  heroImage: TSanityImageWithAlt;
  prioritized?: boolean;
  color?: TColor;
  date: string;
  startTime: string;
  endTime?: string;
  place: string;
  signUpEmail?: string;
  signUpDeadline?: string;
  eventInfo?: Array<{
    key: string;
    value: string;
    _key: string;
  }>;
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
  event?: TEvent;
  prioritized?: boolean;
  color?: TColor;
};

export type TPostPreview = Omit<TPost, "body" | "gallery">;

export type TEvent = {
  date: string;
  startTime: string;
  endTime?: string;
  place: string;
  signUpEmail?: string;
  signUpDeadline?: string;
  eventInfo?: Array<{
    key: string;
    value: string;
    _key: string;
  }>;
};
