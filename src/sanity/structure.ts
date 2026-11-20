import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Bilder & Berättelser")
        .child(
          S.list().title("Bilder & Berättelser språk").items(
            [{ id: "sv", title: "Svenska" }, { id: "en", title: "English" }].map((language) =>
              S.listItem().id(`stories-${language.id}`).title(language.title).child(
                S.list().title(`Bilder & Berättelser – ${language.title}`).items([
                  S.listItem().title("Introduktion").child(
                    S.document().schemaType("storiesPage").documentId(`storiesPage_${language.id}`)
                      .initialValueTemplate("stories-page", { language: language.id }),
                  ),
                  S.listItem().title("Kategorier").child(
                    S.documentTypeList("storyCategory").title("Kategorier")
                      .apiVersion("2025-12-15")
                      .filter('_type == "storyCategory" && coalesce(language, "sv") == $language')
                      .params({ language: language.id })
                      .initialValueTemplates([S.initialValueTemplateItem("story-category", { language: language.id })])
                      .child((id) => {
                        const categoryId = id.replace(/^drafts\./, "");
                        return S.list().title("Kategori").items([
                          S.listItem().title("Kategoriinställningar").child(
                            S.document().schemaType("storyCategory").documentId(categoryId),
                          ),
                          S.listItem().title("Berättelser").child(
                            S.documentTypeList("story").title("Berättelser i kategorin")
                              .apiVersion("2025-12-15")
                              .filter('_type == "story" && category._ref == $categoryId && coalesce(language, "sv") == $language')
                              .params({ categoryId, language: language.id })
                              .initialValueTemplates([
                                S.initialValueTemplateItem("story-with-category", { categoryId, language: language.id }),
                              ]),
                          ),
                        ]);
                      }),
                  ),
                  S.listItem().title("Alla berättelser").child(
                    S.documentTypeList("story").title("Alla berättelser")
                      .apiVersion("2025-12-15")
                      .filter('_type == "story" && coalesce(language, "sv") == $language')
                      .params({ language: language.id })
                      .initialValueTemplates([S.initialValueTemplateItem("story-language", { language: language.id })]),
                  ),
                ]),
              ),
            ),
          ),
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
