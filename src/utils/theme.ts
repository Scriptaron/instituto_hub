import type { ThemeProps } from '../types/index.ts';

export const themeMap: Record<string, ThemeProps> = {
  yellow: {
    dotColorClass: 'bg-destaque',
    dotShadowClass: 'shadow-[4px_4px_0_var(--color-principal)]',
    cardBgClass: 'bg-white',
    cardShadowClass: 'shadow-[6px_6px_0_var(--color-principal)]',
    connectorBorderClass: 'border-destaque',
    tagClass: 'bg-destaque text-foreground shadow-[2px_2px_0_var(--color-principal)]',
    titleClass: 'text-principal group-hover:text-destaque',
    buttonClass: 'bg-principal text-white hover:bg-destaque hover:text-foreground shadow-[4px_4px_0_var(--color-destaque)]',
  },
  blue: {
    dotColorClass: 'bg-principal',
    dotShadowClass: 'shadow-[4px_4px_0_var(--color-destaque)]',
    cardBgClass: 'bg-white',
    cardShadowClass: 'shadow-[6px_6px_0_var(--color-principal)]',
    connectorBorderClass: 'border-principal',
    tagClass: 'bg-principal text-white shadow-[2px_2px_0_var(--color-destaque)]',
    titleClass: 'text-principal group-hover:text-destaque',
    buttonClass: 'bg-white text-principal hover:bg-principal hover:text-white shadow-[4px_4px_0_var(--color-principal)]',
  },
  green: {
    dotColorClass: 'bg-destaque',
    dotShadowClass: 'shadow-[4px_4px_0_var(--color-principal)]',
    cardBgClass: 'bg-white',
    cardShadowClass: 'shadow-[6px_6px_0_var(--color-destaque)]',
    connectorBorderClass: 'border-destaque',
    tagClass: 'bg-destaque text-foreground shadow-[2px_2px_0_var(--color-principal)]',
    titleClass: 'text-principal group-hover:text-destaque',
    buttonClass: 'bg-white text-principal border-destaque hover:bg-destaque hover:text-foreground shadow-[4px_4px_0_var(--color-principal)]',
  },
  dark: {
    dotColorClass: 'bg-slate-800',
    dotShadowClass: 'shadow-[4px_4px_0_var(--color-principal)]',
    cardBgClass: 'bg-slate-800',
    cardShadowClass: 'shadow-[6px_6px_0_var(--color-destaque)]',
    cardExtraClass: 'border-slate-800',
    connectorBorderClass: 'border-slate-800',
    tagClass: 'bg-white text-slate-800 shadow-[2px_2px_0_var(--color-destaque)]',
    titleClass: 'text-white group-hover:text-destaque',
    detailsClass: 'text-slate-300',
    detailsIconSvg: '<svg class="text-destaque shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    buttonClass: 'bg-destaque text-foreground hover:bg-white shadow-[4px_4px_0_#FFF] border-destaque',
  },
};

export const THEME_CYCLE = ['yellow', 'blue', 'green', 'dark'] as const;

export function getThemeByIndex(index: number): ThemeProps {
  const key = THEME_CYCLE[index % THEME_CYCLE.length];
  return themeMap[key];
}
