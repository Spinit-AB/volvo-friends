import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { TypedObject } from "sanity";

export type TPost = {
  _id: string;
  title: string;
  slug: { current: string };
  heroImage: SanityImageSource;
  summary: string;
  body: TypedObject[];
  gallery?: SanityImageSource[];
  language?: string;
};
