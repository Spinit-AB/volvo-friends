import { TSanityImageWithAlt } from "./SanityImageWithAlt";
import { TypedObject } from "sanity";

export type TPost = {
  _id: string;
  title: string;
  slug: { current: string };
  heroImage: TSanityImageWithAlt;
  summary: string;
  body: TypedObject[];
  gallery?: TSanityImageWithAlt[];
  language?: string;
};
