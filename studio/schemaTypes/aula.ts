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
      title: 'Código da Classe (Ex: REL 250)',
      type: 'string',
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
          {title: 'Sexta-feira', value: 'sexta'},
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
      name: 'theme',
      title: 'Cor do Card (Tema)',
      type: 'string',
      options: {
        list: [
          {title: 'Amarelo (Primário)', value: 'yellow'},
          {title: 'Azul (Secundário)', value: 'blue'},
        ],
      },
      initialValue: 'yellow',
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
      name: 'enrollLink',
      title: 'Link de Matrícula (MyInstitute)',
      type: 'url',
      initialValue: 'https://myinstitute.churchofjesuschrist.org',
    }),
    defineField({
      name: 'whatsAppUrl',
      title: 'Link do Grupo de WhatsApp',
      type: 'url',
    }),
    defineField({
      name: 'zoomUrl',
      title: 'Link do Zoom (Apenas se tiver online)',
      type: 'url',
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
