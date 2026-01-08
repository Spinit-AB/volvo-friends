import { type SchemaTypeDefinition } from "sanity";

import post from "./Post";
import customImage from "./CustomImage";
import footer from "./Footer";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, customImage, footer],
};
