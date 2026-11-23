import { defineArrayMember, defineField, defineType } from "sanity";
import { richText } from "./richText";

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
      description: "Introduktion med stycken, fetstil, kursiv och länkar. För en e-postadress, använd en länk med mailto:namn@exempel.se.",
      type: "array",
      of: [defineArrayMember({
        ...richText[0],
        type: "block",
        styles: [{ title: "Normal", value: "normal" }],
        lists: [],
        marks: {
          ...("marks" in richText[0] ? richText[0].marks : {}),
          decorators: [
            { title: "Fetstil", value: "strong" },
            { title: "Kursiv", value: "em" },
          ],
        },
      })],
    }),
  ],
});
