import { defineArrayMember } from "sanity";

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
  }),
  defineArrayMember({ type: "customImage" }),
];
