import { defineField, defineType } from "sanity";
import { richText } from "./richText";
import { validateWebImage, webImageOptions } from "./webImage";

export default defineType({
  name: "story",
  title: "Berättelse",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Rubrik",
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
      name: "category",
      title: "Kategori",
      type: "reference",
      to: [{ type: "storyCategory" }],
      description: "Berättelsen visas under denna kategori. Även dolda kategorier kan användas för att förbereda innehåll.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "listImage",
      title: "Listbild",
      type: "customImage",
      options: webImageOptions,
      description: "Valfri bild i JPEG-, PNG-, WebP-, AVIF- eller GIF-format. Om ingen bild väljs används standardlogotypen som reservbild.",
      validation: (Rule) => Rule.custom(validateWebImage),
    }),
    defineField({
      name: "publishedAt",
      title: "Publiceringsdatum",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Innehåll",
      description: "Lägg till text och bilder i önskad ordning. Berättelsen kan innehålla enbart text, enbart bilder eller båda.",
      type: "array",
      of: richText,
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  orderings: [
    { title: "Nyast först", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
    { title: "Rubrik A–Ö", name: "titleAsc", by: [{ field: "title", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "category.title", media: "listImage" },
  },
});
