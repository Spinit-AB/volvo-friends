import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Sidfot")
        .child(
          S.list()
            .title("Sidfot språk")
            .items([
              S.listItem()
                .title("Svenska")
                .child(S.document().schemaType("footer").documentId("footer")),
              // S.listItem()
              //   .title("English")
              //   .child(
              //     S.document()
              //       .schemaType("footer")
              //       .documentId("footer_en"),
              //   ),
            ]),
        ),
      S.listItem()
        .title("Kontaktformulär")
        .child(
          S.list()
            .title("Kontaktformulär språk")
            .items([
              S.listItem()
                .title("Svenska")
                .child(
                  S.document()
                    .schemaType("contactForm")
                    .documentId("contactForm_sv"),
                ),
              // S.listItem()
              //   .title("English")
              //   .child(
              //     S.document()
              //       .schemaType("contactForm")
              //       .documentId("contactForm_en"),
              //   ),
            ]),
        ),
      S.listItem()
        .title("Om oss")
        .child(
          S.list()
            .title("Om oss språk")
            .items([
              S.listItem()
                .title("Svenska")
                .child(
                  S.document()
                    .schemaType("aboutPage")
                    .documentId("aboutPage_sv"),
                ),
              // S.listItem()
              //   .title("English")
              //   .child(
              //     S.document()
              //       .schemaType("aboutPage")
              //       .documentId("aboutPage_en"),
              //   ),
            ]),
        ),
      S.listItem()
        .title("Bli medlem")
        .child(
          S.list()
            .title("Bli medlem språk")
            .items([
              S.listItem()
                .title("Svenska")
                .child(
                  S.document()
                    .schemaType("becomeMemberPage")
                    .documentId("becomeMemberPage_sv"),
                ),
              // S.listItem()
              //   .title("English")
              //   .child(
              //     S.document()
              //       .schemaType("becomeMemberPage")
              //       .documentId("becomeMemberPage_en"),
              //   ),
            ]),
        ),
      // Add all other document types except 'footer', 'aboutPage', 'becomeMemberPage', 'contactForm', 'contactFormConfig'
      ...S.documentTypeListItems().filter(
        (item) =>
          !["footer", "aboutPage", "becomeMemberPage", "contactForm"].includes(
            item.getId() || "",
          ),
      ),
    ]);
