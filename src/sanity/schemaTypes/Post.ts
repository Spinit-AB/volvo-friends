import { defineType, defineField } from "sanity";

export default defineType({
  name: "post",
  title: "Aktuellt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Rubrik",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      description:
        "Slug är den del av sidans adress (URL) som identifierar inlägget, t.ex. 'mitt-inlagg' i 'www.volvofriends.se/aktuellt/mitt-inlagg'. Den skapas automatiskt från rubriken men kan ändras om du vill.",
      options: {
        source: "title",
      },
      validation: (rule) =>
        rule
          .required()
          .error("En slug krävs för att skapa en sida på webbplatsen"),
    }),
    // Event toggle (checkbox)
    defineField({
      name: "isEvent",
      type: "boolean",
      title: "Gör detta inlägg till ett evenemang",
      description:
        "Markera om detta inlägg handlar om ett evenemang. Då kan du lägga till datum, tid och plats.",
      initialValue: false,
    }),
    // Prioriterat inlägg (checkbox)
    defineField({
      name: "prioritized",
      type: "boolean",
      title: "Prioriterat inlägg/evenemang",
      description:
        "Markera detta inlägg/evenemang som prioriterat för att visa det överst och med särskild stil.",
      initialValue: false,
    }),
    defineField({
      name: "heroImage",
      title: "Herobild",
      description:
        "Den här bilden visas längst upp i artikeln, och kommer även visas på andra sidor som refererar till den här artikeln.",
      type: "customImage",
      validation: (Rule) => Rule.required().error("Hero-bild krävs."),
    }),
    defineField({
      name: "summary",
      title: "Sammanfattning",
      type: "text",
      description: "Kort sammanfattning för listor och SEO.",
      rows: 3,
      validation: (rule) =>
        rule
          .required()
          .max(200)
          .error("Sammanfattning krävs och får vara max 200 tecken."),
    }),

    // Event block (collapsible, only if isEvent is true)
    defineField({
      name: "event",
      type: "object",
      title: "Evenemangsinfo",
      description: "Fyll i information om evenemanget.",
      hidden: ({ parent }) => !parent?.isEvent,
      fields: [
        defineField({
          name: "date",
          type: "date",
          title: "Datum",
          description: "Datum för evenemanget",
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const parent = context.parent as
                | Record<string, unknown>
                | undefined;
              if (!parent?.isEvent) return true;
              if (!value) {
                return "Datum måste anges för evenemang.";
              }
              return true;
            }),
        }),
        defineField({
          name: "time",
          type: "string",
          title: "Tid",
          description: "Tid för evenemanget",
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const parent = context.parent as
                | Record<string, unknown>
                | undefined;
              if (!parent?.isEvent) return true;
              if (!value) {
                return "Tid måste anges för evenemang.";
              }
              return true;
            }),
        }),
        defineField({
          name: "place",
          type: "string",
          title: "Plats",
          description: "Plats för evenemanget",
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const parent = context.parent as
                | Record<string, unknown>
                | undefined;
              if (!parent?.isEvent) return true;
              if (!value) {
                return "Plats måste anges för evenemang.";
              }
              return true;
            }),
        }),
        defineField({
          name: "description",
          type: "string",
          title: "Kort beskrivning",
          description:
            "En kort beskrivning av evenemanget (valfritt, max 300 tecken)",
          validation: (Rule) =>
            Rule.max(300).warning(
              "Max 300 tecken. Skriv mer i brödtexten om det behövs."
            ),
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Brödtext",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Citat", value: "blockquote" },
          ],
          lists: [
            { title: "Punktlista", value: "bullet" },
            { title: "Numrerad lista", value: "number" },
          ],
        },
        { type: "customImage" },
      ],
      validation: (Rule) => Rule.required().min(1).error("Brödtext krävs."),
    }),
    defineField({
      name: "gallery",
      title: "Bildgalleri",
      type: "array",
      description: "Valfritt galleri med bilder som visas efter brödtexten.",
      of: [{ type: "customImage" }],
    }),
    defineField({
      name: "color",
      type: "string",
      title: "Färg på inlägget",
      description: "Välj en färg för inlägget (valfritt)",
      options: {
        list: [
          { title: "Blå", value: "blue" },
          { title: "Turkos", value: "teal" },
          { title: "Grön", value: "green" },
          { title: "Orange", value: "orange" },
          { title: "Röd", value: "red" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "language",
      title: "Språk",
      type: "string",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      language: "language",
      media: "image",
    },
    prepare(select) {
      const { title, language, media } = select;

      return {
        title,
        subtitle: language.toUpperCase(),
        media,
      };
    },
  },
});
