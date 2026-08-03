/**
 * Alterna entre temas claro (lofi) e escuro (dracula) usando View Transitions API se disponível.
 */
export function initThemeToggle(): void {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');

  function updateIcons(isDark: boolean): void {
    if (!sunIcon || !moonIcon) return;
    if (isDark) {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  }

  // Sincroniza ícones no carregamento da página
  updateIcons(document.documentElement.classList.contains('dark'));

  toggleBtn.onclick = (event: MouseEvent) => {
    const isDark = document.documentElement.classList.contains('dark');
    const willBeDark = !isDark;

    const toggleTheme = () => {
      if (willBeDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dracula');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'lofi');
        localStorage.setItem('theme', 'light');
      }
      updateIcons(willBeDark);
    };

    const transitionSupported = (document as any).startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!transitionSupported) {
      toggleTheme();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = (document as any).startViewTransition(() => {
      toggleTheme();
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];
      document.documentElement.animate(
        { clipPath },
        {
          duration: 450,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)'
        }
      );
    });
  };
}
