import { generalPageFields } from "./GeneralPageSections";
import { defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  type: "document",
  title: "Om oss",
  fields: [
    ...generalPageFields,
    {
      name: "boardTitle",
      type: "string",
      title: "Styrelseblockets rubrik",
    },
    {
      name: "boardMembers",
      type: "array",
      title: "Styrelsemedlemmar",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              type: "string",
              title: "Namn",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "role",
              type: "string",
              title: "Roll",
              description:
                "Valfritt. Ange styrelsemedlemmens roll om tillämpligt.",
            },
            // Framtid: bild, bio, kontaktinfo
          ],
        },
      ],
    },
  ],
});
