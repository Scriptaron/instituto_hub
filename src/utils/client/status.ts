/**
 * Calcula se o Instituto está aberto com base no fuso horário de Porto Alegre (America/Sao_Paulo).
 * Horários:
 * - Segunda, Terça, Sábado: 8h às 17h
 * - Quarta, Quinta: 14h às 22h
 */
export function isInstitutoOpen(): boolean {
  const tzDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  const day = tzDate.getDay();
  const hour = tzDate.getHours();
  const min = tzDate.getMinutes();
  const timeInMinutes = hour * 60 + min;

  if (day === 1 || day === 2 || day === 6) { // Seg, Ter, Sáb
    return timeInMinutes >= 8 * 60 && timeInMinutes < 17 * 60;
  }
  if (day === 3 || day === 4) { // Qua, Qui
    return timeInMinutes >= 14 * 60 && timeInMinutes < 22 * 60;
  }
  return false;
}

export function updateStatusIndicator(): void {
  const isOpen = isInstitutoOpen();
  const headerIndicator = document.getElementById('status-indicator');
  const mobileIndicator = document.getElementById('status-indicator-mobile');

  const setIndicator = (indicator: HTMLElement | null, isMob: boolean) => {
    if (!indicator) return;
    const dot = indicator.querySelector(isMob ? '#status-dot-mobile' : '#status-dot') as HTMLElement;
    const ping = indicator.querySelector(isMob ? '#status-dot-ping-mobile' : '#status-dot-ping') as HTMLElement;
    const txt = indicator.querySelector(isMob ? '#status-text-mobile' : '#status-text') as HTMLElement;

    if (isOpen) {
      if (dot) dot.className = 'relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500';
      if (ping) ping.className = 'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-green-400';
      if (txt) txt.textContent = 'Aberto Agora';
      if (!isMob) {
        indicator.classList.remove('border-principal', 'text-principal');
        indicator.classList.add('border-green-600', 'text-green-600');
      }
    } else {
      if (dot) dot.className = 'relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-400';
      if (ping) ping.className = 'hidden';
      if (txt) txt.textContent = 'Fechado';
      if (!isMob) {
        indicator.classList.remove('border-green-600', 'text-green-600');
        indicator.classList.add('border-principal', 'text-principal');
      }
    }
  };

  setIndicator(headerIndicator, false);
  setIndicator(mobileIndicator, true);
}
