import { defineType, defineField, defineArrayMember } from "sanity";
import { createGeneralPageFields } from "./GeneralPageSections";
import { richText } from "./richText";

export default defineType({
  name: "contactForm",
  title: "Kontakt",
  type: "document",
  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "Namn",
      hidden: true,
      initialValue: "Kontakt",
    }),
    defineField({
      name: "title",
      title: "Rubrik",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    ...createGeneralPageFields([
      defineField({
        name: "link",
        title: "Kontaktlänk",
        type: "object",
        validation: (Rule) => Rule.required(),
        fields: [
          defineField({
            name: "label",
            title: "Länktext",
            type: "string",
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            name: "href",
            title: "Adress",
            description: "För e-postlänkar: mailto:namn@exempel.se",
            type: "url",
            validation: (Rule) => Rule.required().uri({ scheme: ["http", "https", "mailto", "tel"] }),
          }),
        ],
      }),
    ]),
    defineField({
      name: "content",
      title: "Tidigare innehåll",
      type: "array",
      of: richText,
      deprecated: { reason: "Använd Ingress och Block istället." },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
    }),
    defineField({
      name: "topics",
      title: "Ämnen",
      deprecated: { reason: "Kontaktformuläret har ersatts av Ingress och Block." },
      readOnly: true,
      // Keep legacy values until the replacement contact page is deployed.
      hidden: true,
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
});
