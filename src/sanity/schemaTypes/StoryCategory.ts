import { defineField, defineType } from "sanity";
import { validateWebImage, webImageOptions } from "./webImage";

export default defineType({
  name: "storyCategory",
  title: "Kategori för Bilder & Berättelser",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Namn",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Sidans adress",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Beskrivning",
      type: "text",
      rows: 3,
      description: "Valfri beskrivning av kategorin för översikten i Bilder & Berättelser.",
    }),
    defineField({
      name: "image",
      title: "Kategoribild",
      type: "customImage",
      options: webImageOptions,
      description: "Valfri bild för kategorivalet i översikten. JPEG, PNG, WebP, AVIF eller GIF.",
      validation: (Rule) => Rule.custom(validateWebImage),
    }),
    defineField({
      name: "isActive",
      title: "Visa kategorin",
      description: "Aktivera när kategorin är redo att visas i Bilder & Berättelser. Innehåll kan förberedas medan kategorin är dold.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", isActive: "isActive", media: "image" },
    prepare: ({ title, isActive, media }) => ({
      title,
      media,
      subtitle: isActive ? "Aktiv" : "Dold",
    }),
  },
});
