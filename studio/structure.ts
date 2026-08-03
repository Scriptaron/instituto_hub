import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Painel Instituto Hub')
    .items([
      // Aulas por Dia da Semana
      S.listItem()
        .title('Aulas por Dia da Semana')
        .icon(() => '📅')
        .child(
          S.list()
            .title('Selecione o Dia')
            .items([
              S.listItem()
                .title('Terça-feira')
                .icon(() => '📌')
                .child(
                  S.documentList()
                    .title('Aulas de Terça-feira')
                    .filter('_type == "aula" && ("terca" in schedules[].weekday || weekday == "terca")')
                ),
              S.listItem()
                .title('Quarta-feira')
                .icon(() => '📌')
                .child(
                  S.documentList()
                    .title('Aulas de Quarta-feira')
                    .filter('_type == "aula" && ("quarta" in schedules[].weekday || weekday == "quarta")')
                ),
              S.listItem()
                .title('Quinta-feira')
                .icon(() => '📌')
                .child(
                  S.documentList()
                    .title('Aulas de Quinta-feira')
                    .filter('_type == "aula" && ("quinta" in schedules[].weekday || weekday == "quinta")')
                ),
              S.listItem()
                .title('Sexta-feira')
                .icon(() => '📌')
                .child(
                  S.documentList()
                    .title('Aulas de Sexta-feira')
                    .filter('_type == "aula" && ("sexta" in schedules[].weekday || weekday == "sexta")')
                ),
              S.listItem()
                .title('Sábado')
                .icon(() => '📌')
                .child(
                  S.documentList()
                    .title('Aulas de Sábado')
                    .filter('_type == "aula" && ("sabado" in schedules[].weekday || weekday == "sabado")')
                ),
            ])
        ),

      // Aulas por Tipo
      S.listItem()
        .title('Aulas por Tipo de Curso')
        .icon(() => '📚')
        .child(
          S.list()
            .title('Tipo de Curso')
            .items([
              S.listItem()
                .title('Cursos Fundamentais')
                .icon(() => '⭐')
                .child(
                  S.documentList()
                    .title('Cursos Fundamentais')
                    .filter('_type == "aula" && courseType == "Fundamental"')
                ),
              S.listItem()
                .title('Cursos Eletivos')
                .icon(() => '🎨')
                .child(
                  S.documentList()
                    .title('Cursos Eletivos')
                    .filter('_type == "aula" && courseType == "Eletivo"')
                ),
            ])
        ),

      // Todas as Aulas
      S.documentTypeListItem('aula').title('Todas as Aulas').icon(() => '🎓'),

      S.divider(),

      // Eventos: Próximos vs Passados vs Todos
      S.listItem()
        .title('Eventos do Cronograma')
        .icon(() => '🗓️')
        .child(
          S.list()
            .title('Filtros de Eventos')
            .items([
              S.listItem()
                .title('Próximos Eventos')
                .icon(() => '📌')
                .child(
                  S.documentList()
                    .title('Próximos Eventos (Ativos)')
                    .filter('_type == "evento" && eventDate >= now()[0..9]')
                    .defaultOrdering([{field: 'eventDate', direction: 'asc'}])
                ),
              S.listItem()
                .title('Histórico de Eventos Passados')
                .icon(() => '📜')
                .child(
                  S.documentList()
                    .title('Histórico (Eventos Passados)')
                    .filter('_type == "evento" && eventDate < now()[0..9]')
                    .defaultOrdering([{field: 'eventDate', direction: 'desc'}])
                ),
              S.documentTypeListItem('evento').title('Todos os Eventos').icon(() => '📋'),
            ])
        ),

      S.divider(),

      // Professores
      S.documentTypeListItem('professor').title('Professores').icon(() => '👨‍🏫'),

      // Configurações Globais (Singleton)
      S.listItem()
        .title('Configurações Globais')
        .icon(() => '⚙️')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
    ])
