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
    // Event toggle (checkbox)
    defineField({
      name: "isEvent",
      type: "boolean",
      title: "Gör detta inlägg till ett evenemang",
      description:
        "Markera om detta inlägg handlar om ett evenemang. Då kan du lägga till datum, tid och plats.",
      initialValue: false,
    }),
    defineField({
      name: "date",
      type: "date",
      title: "Datum",
      description: "Datum för evenemanget",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as Record<string, unknown>;
          if (!doc?.isEvent) return true;
          if (!value) {
            return "Datum måste anges för evenemang.";
          }
          return true;
        }),
      hidden: ({ document }) => !document?.isEvent,
    }),
    defineField({
      name: "startTime",
      type: "string",
      title: "Starttid",
      description: "Starttid för evenemanget (HH:mm)",
      placeholder: "18:00",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as Record<string, unknown>;
          if (!doc?.isEvent) return true;
          if (!value) {
            return "Starttid måste anges för evenemang.";
          }
          if (!/^([01]\d|2[0-3])[:.\s]?([0-5]\d)$/.test(value)) {
            return "Starttiden måste anges i formatet HH:mm, t.ex. 18:00.";
          }
          return true;
        }),
      hidden: ({ document }) => !document?.isEvent,
    }),
    defineField({
      name: "endTime",
      type: "string",
      title: "Sluttid (valfritt)",
      description: "Sluttid för evenemanget (HH:mm, valfritt)",
      placeholder: "20:00",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as Record<string, unknown>;
          if (!doc?.isEvent) return true;
          if (!value) return true;
          if (!/^([01]\d|2[0-3])[:.\s]?([0-5]\d)$/.test(value)) {
            return "Sluttiden måste anges i formatet HH:mm, t.ex. 20:00.";
          }
          return true;
        }),
      hidden: ({ document }) => !document?.isEvent,
    }),
    defineField({
      name: "place",
      type: "string",
      title: "Plats",
      description: "Plats för evenemanget",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as Record<string, unknown>;
          if (!doc?.isEvent) return true;
          if (!value) {
            return "Plats måste anges för evenemang.";
          }
          return true;
        }),
      hidden: ({ document }) => !document?.isEvent,
    }),
    // Optional sign up email link for events
    defineField({
      name: "signUpEmail",
      type: "string",
      title: "Anmälnings-e-post (valfritt)",
      description: "E-postadress för anmälan till evenemanget (valfritt)",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as Record<string, unknown>;
          if (!doc?.isEvent) return true;
          if (!value) return true;
          // Simple email validation
          if (!/^\S+@\S+\.\S+$/.test(value)) {
            return "E-postadressen måste vara giltig.";
          }
          return true;
        }),
      hidden: ({ document }) => !document?.isEvent,
    }),
    // Optional last sign up date for events
    defineField({
      name: "signUpDeadline",
      type: "date",
      title: "Sista anmälningsdag (valfritt)",
      description: "Sista datum för anmälan till evenemanget (valfritt)",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as Record<string, unknown>;
          if (!doc?.isEvent) return true;
          if (!value) return true;
          // Optionally, could check that deadline is before event date, but not required here
          return true;
        }),
      hidden: ({ document }) => !document?.isEvent,
    }),
    //TODO: We need a boolean field to update the event if it has been fully booked / sign up list is full
    defineField({
      name: "eventInfo",
      type: "array",
      title: "Extra information om evenemanget",
      description:
        "Lägg till egna rader för att visa mer information om evenemanget.",
      of: [
        defineField({
          name: "infoItem",
          type: "object",
          fields: [
            defineField({
              name: "key",
              type: "string",
              title: "Rubrik (t.ex. Entré, Fika, Talare)",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              type: "string",
              title: "Beskrivning",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      hidden: ({ document }) => !document?.isEvent,
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
