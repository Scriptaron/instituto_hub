import {defineField, defineType} from 'sanity'

export const professorType = defineType({
  name: 'professor',
  title: 'Professores do Instituto',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do(a) Professor(a)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare({title}) {
      return {
        title: title,
        subtitle: 'Professor(a) do Instituto',
      }
    },
  },
})
