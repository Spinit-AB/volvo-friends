import { type SchemaTypeDefinition } from "sanity";

import post from "./Post";
import customImage from "./CustomImage";
import footer from "./Footer";
import contactForm from "./ContactFormConfig";
import aboutPage from "./AboutPage";
import becomeMemberPage from "./BecomeMemberPage";
import blockContent from "./blockContent";
import storyCategory from "./StoryCategory";
import storiesPage from "./StoriesPage";
import story from "./Story";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, customImage, footer, contactForm, blockContent, aboutPage, becomeMemberPage, storyCategory, storiesPage, story],
};
