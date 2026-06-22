/// <reference types="@sanity/astro/module" />
import { sanityClient } from 'sanity:client';
import imageUrlBuilder from '@sanity/image-url';

// ----------------------------------------------------
// Base Setup
// ----------------------------------------------------
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// ----------------------------------------------------
// Aulas Logic
// ----------------------------------------------------
export const daysOfWeek = [
    { id: 'terca', label: 'Terça' },
    { id: 'quarta', label: 'Quarta' },
    { id: 'quinta', label: 'Quinta' },
    { id: 'sabado', label: 'Sábado' }
];

export async function fetchAulas() {
    const aulas = await sanityClient.fetch(`*[_type == "aula"] | order(time asc)`);
    const validDays = daysOfWeek.filter(day => aulas.some((a: any) => a.weekday === day.id));
    const activeDayId = validDays.length > 0 ? validDays[0].id : daysOfWeek[0].id;
    
    return {
        aulas,
        validDays,
        activeDayId
    };
}

// ----------------------------------------------------
// Cronograma (Eventos) Logic
// ----------------------------------------------------
const monthsAbbr = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const monthsNamesUpper = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
const daysOfWeekBr = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

const allMonthsData = [
    { id: 'jan', name: 'Janeiro' },
    { id: 'fev', name: 'Fevereiro' },
    { id: 'mar', name: 'Março' },
    { id: 'abr', name: 'Abril' },
    { id: 'mai', name: 'Maio' },
    { id: 'jun', name: 'Junho' },
    { id: 'jul', name: 'Julho' },
    { id: 'ago', name: 'Agosto' },
    { id: 'set', name: 'Setembro' },
    { id: 'out', name: 'Outubro' },
    { id: 'nov', name: 'Novembro' },
    { id: 'dez', name: 'Dezembro' }
];

export async function fetchEventos() {
    const rawEvents = await sanityClient.fetch(`*[_type == "evento"] | order(eventDate asc)`);
    
    const eventData = rawEvents.map((evt: any) => {
        if (!evt.eventDate) return { ...evt, monthId: 'jan', dateMain: '00 S/D', dateSub: 'S/D' };
        
        const d = new Date(evt.eventDate + 'T12:00:00'); // Força 12h para evitar fuso bug de virar o dia
        
        return {
            ...evt,
            monthId: monthsAbbr[d.getMonth()],
            dateMain: `${d.getDate().toString().padStart(2, '0')} ${monthsNamesUpper[d.getMonth()]}`,
            dateSub: daysOfWeekBr[d.getDay()]
        };
    });

    const currentMonthIndex = new Date().getMonth();
    const availableMonths = allMonthsData.slice(currentMonthIndex);
    const currentMonthId = allMonthsData[currentMonthIndex].id;

    return {
        eventData,
        availableMonths,
        currentMonthId
    };
}
