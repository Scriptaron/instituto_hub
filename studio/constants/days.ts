export interface DayOption {
  value: 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado';
  title: string;
  shortLabel: string;
}

export const WEEKDAYS: DayOption[] = [
  { value: 'terca', title: 'Terça-feira', shortLabel: 'Terça' },
  { value: 'quarta', title: 'Quarta-feira', shortLabel: 'Quarta' },
  { value: 'quinta', title: 'Quinta-feira', shortLabel: 'Quinta' },
  { value: 'sexta', title: 'Sexta-feira', shortLabel: 'Sexta' },
  { value: 'sabado', title: 'Sábado', shortLabel: 'Sábado' },
];

export const SANITY_WEEKDAY_OPTIONS = WEEKDAYS.map((d) => ({
  title: d.title,
  value: d.value,
}));
