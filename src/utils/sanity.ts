/// <reference types="@sanity/astro/module" />
import { sanityClient } from 'sanity:client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { Aula, Evento, EventoFormatado, DiaSemana, Mes, SanityImageAsset, SiteSettings } from '../types/index.ts';

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageAsset) {
  return builder.image(source).auto('format');
}

// Constantes de localização PT-BR (internas ao módulo)
const MONTHS_ABBR = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'] as const;
const MONTHS_NAMES_UPPER = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'] as const;
const DAYS_OF_WEEK_BR = ['DOM','SEG','TER','QUA','QUI','SEX','SÁB'] as const;

const ALL_MONTHS: Mes[] = [
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
  const parts = dateStr.split('-');
  if (parts.length < 3) return 'S/D';
  const [, m, d] = parts;
  const monthIdx = parseInt(m) - 1;
  if (isNaN(monthIdx) || monthIdx < 0 || monthIdx > 11 || !d) return 'S/D';
  return `${d} ${MONTHS_NAMES_UPPER[monthIdx]}`;
}

/** Enriquece Evento com campos de data formatados. */
function enrichEvento(evt: Evento): EventoFormatado {
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
  { id: 'sexta', label: 'Sexta' },
  { id: 'sabado', label: 'Sábado' },
];

export async function fetchAulas(): Promise<{ aulas: Aula[]; validDays: DiaSemana[]; activeDayId: string }> {
  const rawAulas: Aula[] = await sanityClient.fetch(`*[_type == "aula"] {
    ...,
    "instructor": coalesce(instructor->name, instructor),
    schedules[] {
      ...,
      "instructor": coalesce(instructor->name, instructor)
    }
  } | order(title asc)`);

  const flattened: Aula[] = [];

  for (const item of rawAulas) {
    const hasSchedules = item.schedules && item.schedules.length > 0;

    // Se a aula possui o dia/horário principal (legado/único), inclui caso não esteja duplicado no array schedules
    if (item.weekday && item.time) {
      const isAlreadyInSchedules = hasSchedules && item.schedules!.some(
        s => s.weekday === item.weekday && s.time === item.time
      );
      if (!isAlreadyInSchedules) {
        flattened.push({
          ...item,
          weekday: item.weekday,
          time: item.time,
        });
      }
    }

    // Inclui todas as turmas cadastradas no array schedules
    if (hasSchedules) {
      for (const s of item.schedules!) {
        flattened.push({
          ...item,
          weekday: s.weekday,
          time: s.time,
          modality: (s.modality && s.modality.trim() !== '' ? s.modality : item.modality) as Aula['modality'],
          instructor: s.instructor && s.instructor.trim() !== '' ? s.instructor : item.instructor,
          whatsAppUrl: s.whatsAppUrl && s.whatsAppUrl.trim() !== '' ? s.whatsAppUrl : item.whatsAppUrl,
          zoomUrl: s.zoomUrl && s.zoomUrl.trim() !== '' ? s.zoomUrl : item.zoomUrl,
        });
      }
    }
  }

  flattened.sort((a, b) => (a.time || '').localeCompare(b.time || ''));

  const validDays = daysOfWeek.filter(day => flattened.some(a => a.weekday === day.id));
  const activeDayId = validDays.length > 0 ? validDays[0].id : daysOfWeek[0].id;
  return { aulas: flattened, validDays, activeDayId };
}

export async function fetchEventos(): Promise<{ eventData: EventoFormatado[]; availableMonths: Mes[]; currentMonthId: string }> {
  const rawEvents: Evento[] = await sanityClient.fetch(`*[_type == "evento"] | order(eventDate asc)`);
  const eventData = rawEvents.map(enrichEvento);
  const currentMonthIndex = new Date().getMonth();
  const availableMonths = ALL_MONTHS.slice(currentMonthIndex);
  const currentMonthId = ALL_MONTHS[currentMonthIndex].id;
  return { eventData, availableMonths, currentMonthId };
}

export async function fetchProximosEventos(limit = 3): Promise<Evento[]> {
  const localDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');
  const today = `${year}-${month}-${day}`;

  return await sanityClient.fetch(
    `*[_type == "evento" && eventDate >= $today] | order(eventDate asc) [0...$limit]`,
    { today, limit }
  );
}

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  return await sanityClient.fetch(`*[_type == "siteSettings" && _id == "siteSettings"][0]`);
}
