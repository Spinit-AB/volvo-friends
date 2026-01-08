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
      name: "documents",
      title: "Dokument",
      description:
        "Lägg till PDF-dokument som ska visas i sidfoten. Max 5 dokument. Klicka på 'Lägg till' för att välja en PDF och ge den ett namn.",
      type: "array",
      of: [
        defineArrayMember({
          type: "file",
          title: "PDF-dokument",
          options: {
            accept: "application/pdf",
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
