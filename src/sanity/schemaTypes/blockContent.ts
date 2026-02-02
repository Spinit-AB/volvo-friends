import { defineType, defineArrayMember } from "sanity";

export default defineType({
  name: "blockContent",
  type: "array",
  title: "Block Content",
  of: [
    defineArrayMember({ type: "block" }),
    // You can add more types here (e.g., images, code) if needed
  ],
});
