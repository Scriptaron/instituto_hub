import {defineField, defineType} from 'sanity'

export const aulaType = defineType({
  name: 'aula',
  title: 'Aulas do Instituto',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título da Aula',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'relCode',
      title: 'Tipo de Curso (Grau de Exigência)',
      type: 'string',
      description: 'Classifique se o curso é Fundamental para a formatura ou Eletivo.',
      options: {
        list: [
          {title: 'Curso Fundamental', value: 'Fundamental'},
          {title: 'Curso Eletivo', value: 'Eletivo'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'modality',
      title: 'Modalidade (Presencial, Online, Híbrido)',
      type: 'string',
      options: {
        list: [
          {title: 'Presencial', value: 'Presencial'},
          {title: '100% Online', value: '100% Online'},
          {title: 'Híbrido', value: 'Híbrido'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'instructor',
      title: 'Professor(a)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Horário',
      type: 'string',
      description: 'Digite no formato HH:MM (ex: 19:30).',
      validation: (rule) => 
        rule.required().custom((time) => {
          if (typeof time === 'undefined') return true
          const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
          return regex.test(time) ? true : 'Formato inválido. Use HH:MM, como 19:30, 20:00...'
        })
    }),
    defineField({
      name: 'weekday',
      title: 'Dia da Semana',
      type: 'string',
      options: {
        list: [
          {title: 'Terça-feira', value: 'terca'},
          {title: 'Quarta-feira', value: 'quarta'},
          {title: 'Quinta-feira', value: 'quinta'},
          {title: 'Sábado', value: 'sabado'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição Breve',
      type: 'text',
      validation: (rule) => rule.required().max(200),
    }),

    defineField({
      name: 'image',
      title: 'Imagem de Capa',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'whatsAppUrl',
      title: 'Link do Grupo de WhatsApp',
      type: 'url',
    }),
    defineField({
      name: 'zoomUrl',
      title: 'Link do Zoom',
      type: 'url',
      hidden: ({document}) => document?.modality === 'Presencial',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'relCode',
      media: 'image',
    },
  },
})
