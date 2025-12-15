import { defineType, defineField } from "sanity";
import customImage from "./CustomImage";

export default defineType({
  name: "post",
  title: "Aktuellt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Rubrik",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      description:
        "Slug är den del av sidans adress (URL) som identifierar inlägget, t.ex. 'mitt-inlagg' i 'www.volvofriends.se/aktuellt/mitt-inlagg'. Den skapas automatiskt från rubriken men kan ändras om du vill.",
      options: {
        source: "title",
      },
      validation: (rule) =>
        rule
          .required()
          .error("En slug krävs för att skapa en sida på webbplatsen"),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "customImage",
      validation: (Rule) => Rule.required().error("Hero-bild krävs."),
    }),
    defineField({
      name: "summary",
      title: "Sammanfattning",
      type: "text",
      description: "Kort sammanfattning för listor och SEO.",
      rows: 3,
      validation: (rule) =>
        rule
          .required()
          .max(200)
          .error("Sammanfattning krävs och får vara max 200 tecken."),
    }),
    defineField({
      name: "body",
      title: "Brödtext",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Citat", value: "blockquote" },
          ],
          lists: [
            { title: "Punktlista", value: "bullet" },
            { title: "Numrerad lista", value: "number" },
          ],
        },
        { type: "customImage" },
      ],
      validation: (Rule) => Rule.required().min(1).error("Brödtext krävs."),
    }),
    defineField({
      name: "gallery",
      title: "Bildgalleri",
      type: "array",
      description: "Valfritt galleri med bilder som visas efter brödtexten.",
      of: [{ type: "customImage" }],
    }),
    defineField({
      name: "language",
      title: "Språk",
      type: "string",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      language: "language",
      media: "image",
    },
    prepare(select) {
      const { title, language, media } = select;

      return {
        title,
        subtitle: language.toUpperCase(),
        media,
      };
    },
  },
});
