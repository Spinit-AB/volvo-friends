import { type SchemaTypeDefinition } from "sanity";

import post from "./Post";
import customImage from "./CustomImage";
import footer from "./Footer";
import aboutPage from "./AboutPage";
import becomeMemberPage from "./BecomeMemberPage";
import blockContent from "./blockContent";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, customImage, footer, blockContent, aboutPage, becomeMemberPage],
};
