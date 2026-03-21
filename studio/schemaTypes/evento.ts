import {defineField, defineType} from 'sanity'

export const eventoType = defineType({
  name: 'evento',
  title: 'Eventos do Cronograma',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Evento',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Ex: Luau de Boas Vindas, Devocional Mundial, etc.',
    }),
    defineField({
      name: 'eventDate',
      title: 'Data do Evento',
      type: 'date',
      description: 'Data exata do evento. Determina o mês e a ordenação automaticamente.',
      validation: (rule) => rule.required(),
      options: {
        dateFormat: 'DD/MM/YYYY',
      },
    }),
    defineField({
      name: 'tagLabel',
      title: 'Etiqueta Visual (Tag)',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Ex: Atividade, Devocional, Caravana',
    }),

    defineField({
      name: 'detailsText',
      title: 'Texto de Detalhes',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Local e Horário. Ex: Capela Central • 19:30 às 22:30',
    }),
    defineField({
      name: 'price',
      title: 'Preço Custas (Opcional)',
      type: 'string',
      description: 'Ex: R$ 15,00 (Deixe em branco para gratuito)',
      validation: (rule) => rule.custom((price) => {
        if (!price) return true
        return /^R\$ \d+,\d{2}$/.test(price) ? true : 'Formato incorreto. Use: R$ 15,00 (com espaço e vírgula)'
      })
    }),
    defineField({
      name: 'buttonText',
      title: 'Texto do Botão',
      type: 'string',
      hidden: ({document}) => !document?.buttonUrl,
      initialValue: 'Saiba Mais',
    }),
    defineField({
      name: 'buttonUrl',
      title: 'Link de Direcionamento do Botão',
      type: 'url',
      description: 'Link do zap, formulário ou mural. (Deixe vazio caso não precise clicar).',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'eventDate',
    },
    prepare(selection) {
      const {title, date} = selection
      let subtitle = 'Sem data definida'
      if (date) {
        const d = new Date(date + 'T12:00:00') // Evita erro de timezone
        subtitle = d.toLocaleDateString('pt-BR', {day: '2-digit', month: 'long', year: 'numeric'})
      }
      return {
        title: title,
        subtitle: subtitle,
        media: '📅',
      }
    },
  },
})
