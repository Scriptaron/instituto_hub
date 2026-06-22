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
    buttonClass: 'bg-destaque text-foreground hover:bg-white shadow-[4px_4px_0_#FFF] border-destaque',
  },
};

export const THEME_CYCLE = ['yellow', 'blue', 'green', 'dark'] as const;

export function getThemeByIndex(index: number): ThemeProps {
  const key = THEME_CYCLE[index % THEME_CYCLE.length];
  return themeMap[key];
}
