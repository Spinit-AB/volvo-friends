import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "contactForm",
  title: "Kontaktformulär",
  type: "document",
  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "Namn",
      hidden: true,
      initialValue: "Kontaktformulär",
    }),
    defineField({
      name: "topics",
      title: "Ämnen",
      description:
        "Lista över ämnen som ska visas i kontaktformulärets dropdown. Dessa ämnen skickas tillsammans med formuläret.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("Minst ett ämne måste definieras.")
          .max(10)
          .warning("Mer än 10 ämnen kan göra dropdownen svårnavigerad."),
    }),
  ],
});
