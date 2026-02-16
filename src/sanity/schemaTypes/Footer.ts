import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "footer",
  title: "Sidfot",
  type: "document",
  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "Namn",
      hidden: true,
      initialValue: "Sidfot",
    }),
    defineField({
      name: "language",
      type: "string",
      title: "Språk",
      description: "Språkkod för sidfoten, t.ex. 'sv' eller 'en'.",
      hidden: true,
      readOnly: true,
      initialValue: (params) => {
        const id = params?.document?._id || "";
        if (id === "footer" || id.endsWith("_sv")) return "sv";
        if (id.endsWith("_en")) return "en";
        return "sv";
      },
      validation: (Rule) =>
        Rule.custom((lang, context) => {
          const id = context?.document?._id || "";
          if ((id === "footer" || id.endsWith("_sv")) && lang !== "sv")
            return "Språk måste vara sv för denna sidfot";
          if (id.endsWith("_en") && lang !== "en")
            return "Språk måste vara en för denna sidfot";
          return true;
        }),
    }),
    defineField({
      name: "documents",
      title: "Dokument",
      description:
        "Lägg till PDF-dokument som ska visas i sidfoten. Max 5 dokument. Klicka på 'Lägg till' för att välja en PDF och ge den ett namn.",
      type: "array",
      of: [
        defineArrayMember({
          type: "file",
          title: "Dokument (PDF, Word, PowerPoint)",
          options: {
            accept: [
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              "application/vnd.ms-powerpoint",
              "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            ].join(","),
          },
          fields: [
            {
              name: "title",
              type: "string",
              title: "Titel",
              description: "Namnet som visas för dokumentet i sidfoten.",
            },
          ],
        }),
      ],
      validation: (Rule) => Rule.max(5).warning("Max 5 dokument i sidfoten."),
    }),
    defineField({
      name: "address",
      title: "Adress",
      description:
        "Skriv in adressen rad för rad. Max 5 rader. Om ni flyttar eller behöver lägga till land, kan ni enkelt ändra här.",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.max(5).warning("Max 5 rader i adressen."),
    }),
    defineField({
      name: "links",
      title: "Länkar",
      description:
        "Lägg till länkar som ska visas i sidfoten. Max 5 länkar. Klicka på 'Lägg till' och fyll i namn och webbadress.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Titel",
              description: "Namnet på länken.",
            },
            {
              name: "url",
              type: "url",
              title: "URL",
              description: "Webbadressen som länken går till.",
            },
          ],
        }),
      ],
      validation: (Rule) => Rule.max(5).warning("Max 5 länkar i sidfoten."),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Sidfot" };
    },
  },
});
