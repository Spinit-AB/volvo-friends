import { defineField, defineArrayMember } from "sanity";
import { richText } from "./richText";

export const generalPageFields = [
  defineField({
    name: "language",
    type: "string",
    title: "Språk",
    readOnly: true,
    hidden: true,
    initialValue: (params) => {
      // Lock language based on document ID
      if (params?.document?._id?.endsWith("_sv")) return "sv";
      if (params?.document?._id?.endsWith("_en")) return "en";
      return "sv";
    },
    validation: (Rule) =>
      Rule.custom((lang, context) => {
        const id = context?.document?._id || "";
        if (id.endsWith("_sv") && lang !== "sv")
          return "Språk måste vara sv för denna sida";
        if (id.endsWith("_en") && lang !== "en")
          return "Språk måste vara en för denna sida";
        return true;
      }),
  }),
  defineField({
    name: "preamble",
    type: "text",
    title: "Ingress",
    description: "Valfri introduktionstext",
  }),
  defineField({
    name: "sections",
    type: "array",
    title: "Block",
    of: [
      defineArrayMember({
        type: "object",
        fields: [
          defineField({
            name: "title",
            type: "string",
            title: "Blockrubrik",
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            name: "content",
            type: "array",
            title: "Blockinnehåll",
            of: richText,
          }),
        ],
      }),
    ],
  }),
];
