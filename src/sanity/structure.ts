import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Sidfot')
        .child(
          S.document()
            .schemaType('footer')
            .documentId('footer')
        ),
      // Add all other document types except 'footer'
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'footer'
      ),
    ])
