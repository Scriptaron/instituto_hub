/// <reference types="@sanity/astro/module" />
import { sanityClient } from 'sanity:client';
import imageUrlBuilder from '@sanity/image-url';
import type { Aula, Evento, EventoFormatado, DiaSemana, Mes, SanityImageAsset } from '../types/index.ts';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageAsset) {
  return builder.image(source);
}

// Constantes de localização PT-BR (exportadas para reusar)
export const MONTHS_ABBR = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'] as const;
export const MONTHS_NAMES_UPPER = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'] as const;
export const DAYS_OF_WEEK_BR = ['DOM','SEG','TER','QUA','QUI','SEX','SÁB'] as const;

export const ALL_MONTHS: Mes[] = [
  { id: 'jan', name: 'Janeiro' }, { id: 'fev', name: 'Fevereiro' },
  { id: 'mar', name: 'Março' },   { id: 'abr', name: 'Abril' },
  { id: 'mai', name: 'Maio' },    { id: 'jun', name: 'Junho' },
  { id: 'jul', name: 'Julho' },   { id: 'ago', name: 'Agosto' },
  { id: 'set', name: 'Setembro' },{ id: 'out', name: 'Outubro' },
  { id: 'nov', name: 'Novembro' },{ id: 'dez', name: 'Dezembro' },
];

/** Formata "YYYY-MM-DD" → "22 JUN". Retorna "S/D" se inválido. */
export function formatEventDate(dateStr: string | undefined): string {
  if (!dateStr) return 'S/D';
  const [, m, d] = dateStr.split('-');
  return `${d} ${MONTHS_NAMES_UPPER[parseInt(m) - 1]}`;
}

/** Enriquece Evento com campos de data formatados. */
export function enrichEvento(evt: Evento): EventoFormatado {
  if (!evt.eventDate) {
    return { ...evt, monthId: 'jan', dateMain: '00 S/D', dateSub: 'S/D' };
  }
  const d = new Date(evt.eventDate + 'T12:00:00');
  return {
    ...evt,
    monthId: MONTHS_ABBR[d.getMonth()],
    dateMain: `${d.getDate().toString().padStart(2, '0')} ${MONTHS_NAMES_UPPER[d.getMonth()]}`,
    dateSub: DAYS_OF_WEEK_BR[d.getDay()],
  };
}

export const daysOfWeek: DiaSemana[] = [
  { id: 'terca', label: 'Terça' },
  { id: 'quarta', label: 'Quarta' },
  { id: 'quinta', label: 'Quinta' },
  { id: 'sabado', label: 'Sábado' },
];

export async function fetchAulas(): Promise<{ aulas: Aula[]; validDays: DiaSemana[]; activeDayId: string }> {
  const aulas: Aula[] = await sanityClient.fetch(`*[_type == "aula"] | order(time asc)`);
  const validDays = daysOfWeek.filter(day => aulas.some(a => a.weekday === day.id));
  const activeDayId = validDays.length > 0 ? validDays[0].id : daysOfWeek[0].id;
  return { aulas, validDays, activeDayId };
}

export async function fetchEventos(): Promise<{ eventData: EventoFormatado[]; availableMonths: Mes[]; currentMonthId: string }> {
  const rawEvents: Evento[] = await sanityClient.fetch(`*[_type == "evento"] | order(eventDate asc)`);
  const eventData = rawEvents.map(enrichEvento);
  const currentMonthIndex = new Date().getMonth();
  const availableMonths = ALL_MONTHS.slice(currentMonthIndex);
  const currentMonthId = ALL_MONTHS[currentMonthIndex].id;
  return { eventData, availableMonths, currentMonthId };
}
