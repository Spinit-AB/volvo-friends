import { generalPageFields } from "./GeneralPageSections";
import { defineType } from "sanity";

export default defineType({
  name: "becomeMemberPage",
  type: "document",
  title: "Bli medlem",
  fields: [
    ...generalPageFields,
    {
      name: "addressTitle",
      type: "string",
      title: "Adressblockets rubrik",
    },
    {
      name: "address",
      type: "array",
      title: "Adress (med länkstöd)",
      description: "Ange adressen. Endast text och länkar är tillåtna.",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Länk",
                fields: [
                  {
                    name: "href",
                    type: "string",
                    title: "URL eller e-post/telefon",
                    description:
                      "Ange en webbadress, e-postadress eller telefonnummer.",
                    validation: (Rule) => Rule.required(),
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
});
