import { defineField, defineType } from "sanity";
import { richText } from "./richText";
import { validateWebImage, webImageOptions } from "./webImage";
import { youtubeVideoId } from "@/utils/youtube";

export const storyText = defineType({
  name: "storyText",
  title: "Text",
  type: "object",
  fields: [defineField({
    name: "text", title: "Text", type: "array",
    of: [richText[0]],
    validation: (Rule) => Rule.required().min(1),
  })],
  preview: {
    select: { blocks: "text" },
    prepare({ blocks }) {
      const text = (blocks || []).flatMap((block: { children?: { text?: string }[] }) =>
        (block.children || []).map((span) => span.text || "")).join(" ");
      return { title: text || "Text", subtitle: "Text" };
    },
  },
});

export const storyImage = defineType({
  name: "storyImage",
  title: "Bild",
  type: "object",
  fields: [
    defineField({
      name: "image", title: "Bild", type: "customImage", options: webImageOptions,
      validation: (Rule) => Rule.required().custom((value) => {
        const image = value as { asset?: { _ref?: string } } | undefined;
        if (!image?.asset?._ref) return "Välj en bild.";
        return validateWebImage(value);
      }),
    }),
    defineField({ name: "caption", title: "Bildtext", type: "string", description: "Valfri text som visas under bilden." }),
  ],
  preview: {
    select: { caption: "caption", alt: "image.alt", media: "image" },
    prepare: ({ caption, alt, media }) => ({ title: caption || alt || "Bild", subtitle: "Bild", media }),
  },
});

export const storyYoutube = defineType({
  name: "storyYoutube",
  title: "YouTube-video",
  type: "object",
  fields: [
    defineField({
      name: "title", title: "Videons titel", type: "string",
      description: "Beskriv filmen. Titeln används också av skärmläsare.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url", title: "YouTube-länk", type: "url",
      description: "Klistra in länken till filmen, exempelvis från YouTubes Dela-knapp.",
      validation: (Rule) => Rule.required().custom((value) =>
        !value || youtubeVideoId(value) ? true : "Ange en giltig länk till en YouTube-video."),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: title || "YouTube-video", subtitle: "YouTube-video" }),
  },
});
