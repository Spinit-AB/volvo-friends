import { defineArrayMember, defineField, defineType } from "sanity";
import { richText } from "./richText";
import { validateWebImage, webImageOptions } from "./webImage";

export default defineType({
  name: "story",
  title: "Berättelse",
  type: "document",
  fields: [
    defineField({
      name: "language",
      title: "Språk",
      type: "string",
      readOnly: true,
      initialValue: "sv",
      description: "Språket väljs i menyn Bilder & Berättelser. Befintligt innehåll utan språk räknas som svenska.",
    }),
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
      options: {
        source: "title",
        isUnique: async (slug, context) => {
          const id = context.document?._id.replace(/^drafts\./, "");
          return context.getClient({ apiVersion: "2025-12-15" }).fetch<boolean>(
            '!defined(*[_type == $type && coalesce(language, "sv") == $language && slug.current == $slug && !(_id in [$id, $draftId])][0]._id)',
            { type: context.document?._type, language: context.document?.language || "sv", slug, id, draftId: `drafts.${id}` },
          );
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "reference",
      to: [{ type: "storyCategory" }],
      options: {
        filter: ({ document }) => ({
          filter: 'coalesce(language, "sv") == $language',
          params: { language: document.language || "sv" },
        }),
      },
      description: "Berättelsen visas under denna kategori. Även dolda kategorier kan användas för att förbereda innehåll.",
      validation: (Rule) => Rule.required().custom(async (value, context) => {
        if (!value?._ref) return true;
        const id = value._ref.replace(/^drafts\./, "");
        const language = await context.getClient({ apiVersion: "2025-12-15" }).fetch<string>(
          'coalesce(*[_id in [$id, $draftId]] | order(_id desc)[0].language, "sv")',
          { id, draftId: `drafts.${id}` },
        );
        return language === (context.document?.language || "sv")
          ? true : "Välj en kategori på samma språk som berättelsen.";
      }),
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
      name: "keywords",
      title: "Sökord",
      description: "Valfria ord, modellnamn och andra benämningar som hjälper besökaren att hitta berättelsen. Sökorden visas inte på webbplatsen.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: "contentBlocks",
      title: "Innehåll",
      description: "Lägg till Text, Bild eller YouTube-video. Dra blocken för att ändra ordning. Bilder och text läggs till som separata block.",
      type: "array",
      of: [
        defineArrayMember({ type: "storyText" }),
        defineArrayMember({ type: "storyImage" }),
        defineArrayMember({ type: "storyYoutube" }),
      ],
      validation: (Rule) => Rule.custom((value, context) => {
        if (value === undefined && Array.isArray(context.document?.content) && context.document.content.length) return true;
        return Array.isArray(value) && value.length > 0 || "Lägg till minst ett innehållsblock.";
      }),
    }),
    defineField({
      name: "content",
      title: "Tidigare innehåll",
      description: "Äldre innehåll bevaras tills berättelsen har konverterats till separata block.",
      type: "array",
      of: richText,
      readOnly: true,
      hidden: ({ document }) => document?.contentBlocks !== undefined || !Array.isArray(document?.content),
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
