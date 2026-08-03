import {defineField, defineType} from 'sanity'
import {SANITY_WEEKDAY_OPTIONS} from '../constants/days'
import {validateHHMM} from '../validators/timeValidator'

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
      name: 'courseType',
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
      title: 'Modalidade Principal (Presencial, Online, Híbrido)',
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
      title: 'Professor(a) Principal',
      type: 'reference',
      to: [{type: 'professor'}],
      description: 'Selecione o(a) professor(a) responsável principal da aula.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Horário (Legado / Único)',
      type: 'string',
      description: 'Digite no formato HH:MM (ex: 19:30). Caso utilize o campo Turmas abaixo, este pode ficar em branco.',
      validation: (rule) => rule.custom(validateHHMM),
    }),
    defineField({
      name: 'weekday',
      title: 'Dia da Semana (Legado / Único)',
      type: 'string',
      description: 'Caso utilize o campo Turmas abaixo, este pode ficar em branco.',
      options: {
        list: SANITY_WEEKDAY_OPTIONS,
      },
    }),
    defineField({
      name: 'schedules',
      title: 'Turmas / Horários da Aula',
      type: 'array',
      description: 'Adicione uma ou mais turmas/horários para esta aula.',
      of: [
        {
          type: 'object',
          name: 'schedule',
          title: 'Turma',
          fields: [
            defineField({
              name: 'weekday',
              title: 'Dia da Semana',
              type: 'string',
              options: {
                list: SANITY_WEEKDAY_OPTIONS,
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'time',
              title: 'Horário',
              type: 'string',
              description: 'Digite no formato HH:MM (ex: 19:30).',
              validation: (rule) => rule.required().custom(validateHHMM),
            }),
            defineField({
              name: 'modality',
              title: 'Modalidade Específica da Turma (Opcional)',
              type: 'string',
              description: 'Deixe em branco para utilizar a modalidade principal do curso.',
              options: {
                list: [
                  {title: 'Presencial', value: 'Presencial'},
                  {title: '100% Online', value: '100% Online'},
                  {title: 'Híbrido', value: 'Híbrido'},
                ],
              },
            }),
            defineField({
              name: 'instructor',
              title: 'Professor(a) Específico(a) da Turma (Opcional)',
              type: 'reference',
              to: [{type: 'professor'}],
              description: 'Deixe em branco para usar o(a) professor(a) principal da aula.',
            }),
            defineField({
              name: 'whatsAppUrl',
              title: 'Link do WhatsApp Específico (Opcional)',
              type: 'url',
              description: 'Deixe em branco para usar o link do grupo principal.',
            }),
            defineField({
              name: 'zoomUrl',
              title: 'Link do Zoom Específico (Opcional)',
              type: 'url',
              description: 'Deixe em branco para usar o link principal.',
            }),
          ],
          preview: {
            select: {
              weekday: 'weekday',
              time: 'time',
              modality: 'modality',
              instructorName: 'instructor.name',
            },
            prepare({weekday, time, modality, instructorName}) {
              const dayMap: Record<string, string> = {
                terca: 'Terça-feira',
                quarta: 'Quarta-feira',
                quinta: 'Quinta-feira',
                sexta: 'Sexta-feira',
                sabado: 'Sábado',
              }
              const dayStr = dayMap[weekday as string] || weekday || 'Dia'
              const modStr = modality ? ` • ${modality}` : ''
              const instStr = instructorName ? ` • ${instructorName}` : ''
              return {
                title: `${dayStr} às ${time || 'HH:MM'}`,
                subtitle: `${modStr}${instStr}`.trim() || 'Turma da aula',
              }
            },
          },
        },
      ],
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
      courseType: 'courseType',
      schedules: 'schedules',
      media: 'image',
    },
    prepare({title, courseType, schedules, media}) {
      const scheduleCount = Array.isArray(schedules) ? schedules.length : 0
      const countStr = scheduleCount > 0 ? ` • ${scheduleCount} turma(s)` : ''
      return {
        title: title,
        subtitle: `${courseType || 'Curso'}${countStr}`,
        media: media,
      }
    },
  },
})
