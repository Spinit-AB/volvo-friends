import { type SchemaTypeDefinition } from "sanity";
import post from "./Post";
import customImage from "./CustomImage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, customImage],
};
