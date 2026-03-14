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
      name: 'monthId',
      title: 'Mês do Evento (Onde aparecerá na aba)',
      type: 'string',
      options: {
        list: [
          {title: 'Janeiro', value: 'jan'},
          {title: 'Fevereiro', value: 'fev'},
          {title: 'Março', value: 'mar'},
          {title: 'Abril', value: 'abr'},
          {title: 'Maio', value: 'mai'},
          {title: 'Junho', value: 'jun'},
          {title: 'Julho', value: 'jul'},
          {title: 'Agosto', value: 'ago'},
          {title: 'Setembro', value: 'set'},
          {title: 'Outubro', value: 'out'},
          {title: 'Novembro', value: 'nov'},
          {title: 'Dezembro', value: 'dez'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'dateMain',
      title: 'Data Principal',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Ex: 23 FEV, 15 MAR',
    }),
    defineField({
      name: 'dateSub',
      title: 'Subtítulo da Data (Dia ou FDS)',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Ex: SEXTA, SÁB, FDS, DOM',
    }),
    defineField({
      name: 'tagLabel',
      title: 'Etiqueta Visual (Tag)',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Ex: Atividade, Devocional, Caravana',
    }),
    defineField({
      name: 'theme',
      title: 'Tema de Cor Predominante',
      type: 'string',
      options: {
        list: [
          {title: 'Amarelo (Atividades Festivas)', value: 'yellow'},
          {title: 'Azul (Devocionais / Estudos)', value: 'blue'},
          {title: 'Verde (Natureza / Esporte)', value: 'green'},
          {title: 'Escuro (Templo / Foco)', value: 'dark'},
          {title: 'Cinza (Passado / Cancelado)', value: 'gray'},
        ],
      },
      initialValue: 'yellow',
    }),
    defineField({
      name: 'align',
      title: 'Alinhamento na Linha do Tempo (Desktop)',
      type: 'string',
      options: {
        list: [
          {title: 'Direita', value: 'right'},
          {title: 'Esquerda', value: 'left'},
        ],
        layout: 'radio',
      },
      initialValue: 'right',
      description: 'Intercale entre Esquerda/Direita para ficar bonito na Timeline.',
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
      description: 'Ex: R$ 15,00 (Deixe em branco para remover essa etiqueta).',
    }),
    defineField({
      name: 'buttonText',
      title: 'Texto do Botão',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'Saiba Mais',
    }),
    defineField({
      name: 'buttonUrl',
      title: 'Link de Direcionamento do Botão',
      type: 'url',
      description: 'Link do zap, formulário ou mural. (Deixe vazio caso não precise clicar).',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Ordem Numérica (Cronologia)',
      type: 'number',
      description: 'Use números como 1, 2, 3 para ordenar os cards qual vem primeiro no mês. Menor aparece primeiro.',
      initialValue: 1,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'monthId',
      date: 'dateMain',
    },
    prepare(selection) {
      const {title, subtitle, date} = selection
      const months: Record<string, string> = {
        jan: 'Janeiro', fev: 'Fevereiro', mar: 'Março', abr: 'Abril',
        mai: 'Maio', jun: 'Junho', jul: 'Julho', ago: 'Agosto',
        set: 'Setembro', out: 'Outubro', nov: 'Novembro', dez: 'Dezembro'
      }
      return {
        title: title,
        subtitle: `${date} - ${months[subtitle] || subtitle}`, // Ex: "23 FEV - Fevereiro"
        media: '📅',
      }
    },
  },
})
