import { defineType, defineField } from "sanity";

export default defineType({
  name: "customImage",
  type: "image",
  title: "Bild",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      type: "string",
      title: "Alt text",
      description: "Beskriv bilden för tillgänglighet och SEO",
      validation: (Rule) => Rule.required().error("Alt-text är obligatoriskt för alla bilder."),
    }),
  ],
});
