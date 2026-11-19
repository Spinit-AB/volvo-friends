import { defineArrayMember, defineField } from "sanity";

// Shared rich text configuration for reuse in multiple schemas
export const richText = [
  defineArrayMember({
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      { title: "Citat", value: "blockquote" },
    ],
    lists: [
      { title: "Punktlista", value: "bullet" },
      { title: "Numrerad lista", value: "number" },
    ],
    marks: {
      annotations: [
        defineArrayMember({
          name: "link",
          title: "Länk",
          type: "object",
          fields: [
            defineField({
              name: "href",
              title: "Adress",
              description: "För e-postlänkar: mailto:namn@exempel.se",
              type: "url",
              validation: (Rule) => Rule.required().uri({ scheme: ["http", "https", "mailto", "tel"] }),
            }),
          ],
        }),
      ],
    },
  }),
  defineArrayMember({ type: "customImage" }),
];
