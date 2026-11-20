import { defineField, defineType } from "sanity";

export default defineType({
  name: "storiesPage",
  title: "Bilder & Berättelser – introduktion",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Rubrik",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introduction",
      title: "Introduktion",
      type: "text",
      rows: 6,
    }),
  ],
});
