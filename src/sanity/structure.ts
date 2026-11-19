import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Bilder & Berättelser")
        .child(
          S.list()
            .title("Bilder & Berättelser")
            .items([
              S.listItem()
                .title("Introduktion")
                .child(S.document().schemaType("storiesPage").documentId("storiesPage_sv")),
              S.documentTypeListItem("storyCategory")
                .title("Kategorier")
                .child(
                  S.documentTypeList("storyCategory")
                    .title("Kategorier")
                    .child((id) => {
                      const categoryId = id.replace(/^drafts\./, "");
                      return S.list()
                        .title("Kategori")
                        .items([
                          S.listItem()
                            .title("Kategoriinställningar")
                            .child(S.document().schemaType("storyCategory").documentId(categoryId)),
                          S.listItem()
                            .title("Berättelser")
                            .child(
                              S.documentTypeList("story")
                                .title("Berättelser i kategorin")
                                .filter('_type == "story" && category._ref == $categoryId')
                                .params({ categoryId })
                                .initialValueTemplates([
                                  S.initialValueTemplateItem("story-with-category", { categoryId }),
                                ]),
                            ),
                        ]);
                    }),
                ),
              S.documentTypeListItem("story").title("Alla berättelser"),
            ]),
        ),
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
        .title("Kontakt")
        .child(
          S.list()
            .title("Kontakt språk")
            .items([
              S.listItem()
                .title("Svenska")
                .child(
                  S.document()
                    .schemaType("contactForm")
                    .documentId("contactForm_sv"),
                ),
              S.listItem()
                .title("English")
                .child(
                  S.document()
                    .schemaType("contactForm")
                    .documentId("contactForm_en"),
                ),
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
          !["footer", "aboutPage", "becomeMemberPage", "contactForm", "storiesPage", "storyCategory", "story"].includes(
            item.getId() || "",
          ),
      ),
    ]);
