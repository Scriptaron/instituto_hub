import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Configurações Globais do Site',
  type: 'document',
  fields: [
    defineField({
      name: 'enrollmentUrl',
      title: 'Link Global de Matrícula',
      type: 'url',
      description: 'Link do formulário (ex: Microsoft Forms / Google Forms) usado no botão Matricular-se.',
      initialValue: 'https://forms.office.com/Pages/ResponsePage.aspx?id=s-7mYddfqkquPGHo3rCbeeM0om7MfKhBu1hqe0-54JxURUMwSlpUU0ExVzZaNUw1NjQ4REhWWlIxSC4u',
    }),
    defineField({
      name: 'recoveryUrl',
      title: 'Link Global de Recuperação de Aulas',
      type: 'url',
      description: 'Link do formulário para o botão de Recuperação no card das aulas. (Se preenchido, ativa o botão para os alunos).',
    }),
    defineField({
      name: 'semesterTitle',
      title: 'Título / Período do Semestre',
      type: 'string',
      description: 'Ex: 1º Semestre de 2026',
      initialValue: '1º Semestre de 2026',
    }),
    defineField({
      name: 'noticeBannerText',
      title: 'Texto do Banner de Aviso Global (Opcional)',
      type: 'string',
      description: 'Mensagem em destaque exibida no topo do site.',
    }),
    defineField({
      name: 'noticeBannerActive',
      title: 'Exibir Banner de Aviso Global',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Configurações Globais do Site',
        subtitle: 'Matrículas, Recuperação, Banners e Semestre',
      }
    },
  },
})
