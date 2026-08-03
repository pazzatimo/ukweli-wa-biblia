import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Ukweli Wa Biblia')
    .items([
      S.listItem()
        .title('📄 Maudhui')
        .child(
          S.list()
            .title('Maudhui')
            .items([
              S.documentTypeListItem('article').title('Makala'),
              S.documentTypeListItem('sermon').title('Mahubiri'),
              S.documentTypeListItem('song').title('Nyimbo'),
              S.divider(),
              S.documentTypeListItem('category').title('Kategoria'),
            ])
        ),
      S.listItem()
        .title('📅 Matukio')
        .child(
          S.list()
            .title('Matukio')
            .items([
              S.documentTypeListItem('event').title('Matukio Yote'),
            ])
        ),
      S.listItem()
        .title('📄 Kurasa')
        .child(
          S.list()
            .title('Kurasa')
            .items([
              S.documentTypeListItem('page').title('Kurasa Zote'),
            ])
        ),
      S.listItem()
        .title('👤 Watu')
        .child(
          S.list()
            .title('Watu')
            .items([
              S.documentTypeListItem('person').title('Wahudumu / Wafanyakazi'),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('⚙️ Mipangilio')
        .child(
          S.list()
            .title('Mipangilio')
            .items([
              S.documentTypeListItem('siteSettings').title('Mipangilio ya Tovuti'),
            ])
        ),
    ])