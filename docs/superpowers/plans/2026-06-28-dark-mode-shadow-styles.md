# Dark Mode Shadow Styles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Revert to the original color brand palette (Roxo + Verde Limão) and implement a combobox selector to preview 3 styles of neo-brutalist shadows in dark mode (Black Shadow, Neon Shadow, White Shadow).

**Architecture:** Mapped custom CSS properties (`--dark-shadow-color`, `--dark-shadow-ring-color`) in `global.css` under different `html[data-shadow-style="..."]` attributes. A select element in the header modifies the `data-shadow-style` attribute on the `html` element and saves selection to `localStorage`. An inline script in the `<head>` of `BaseLayout.astro` blocks FOUC.

**Tech Stack:** Astro, Tailwind CSS v4, Playwright.

## Global Constraints

- Site uses only the original palette (Roxo `#7a3aed` and Verde Limão `#d9ff7f`).
- Shadows in light mode remain solid black (`#000000`).
- State is persisted via `localStorage` under `theme-shadow-style` with a fallback to `black-shadow`.
- No page refreshes when toggling styles.

---

### Task 1: BaseLayout Script Update

**Files:**
- Modify: [BaseLayout.astro](file:///c:/Users/aaron/Desktop/TADC/projects/instituto_hub/src/layouts/BaseLayout.astro#L76-L89)

**Interfaces:**
- Consumes: None
- Produces: Inline script that loads `theme-shadow-style` and sets `data-shadow-style` on the root node during initial render and ClientRouter swaps.

- [ ] **Step 1: Check existing BaseLayout implementation**
  Review the `BaseLayout.astro` file around lines 76-89.

- [ ] **Step 2: Update palette references to shadow styles**
  Modify [BaseLayout.astro](file:///c:/Users/aaron/Desktop/TADC/projects/instituto_hub/src/layouts/BaseLayout.astro) to replace `applyPalette()` with `applyShadowStyle()`, reading `theme-shadow-style` (fallback: `'black-shadow'`) and setting `data-shadow-style` on `document.documentElement`.

  The updated script should look exactly like this:
  ```html
  <!-- Dark Mode and Shadow Style Global Injector -->
  <script is:inline>
      (function() {
          function getThemePreference() {
              if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
                  return localStorage.getItem('theme');
              }
              return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          }

          function applyTheme() {
              const theme = getThemePreference();
              if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dracula');
              } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.setAttribute('data-theme', 'lofi');
              }
          }

          function applyShadowStyle() {
              const shadow = (typeof localStorage !== 'undefined' && localStorage.getItem('theme-shadow-style')) || 'black-shadow';
              document.documentElement.setAttribute('data-shadow-style', shadow);
          }

          // Aplica imediatamente (previne FOUC no carregamento inicial)
          applyTheme();
          applyShadowStyle();

          // Re-aplica após cada navegação do ClientRouter (evita reset do data-theme e classe .dark)
          document.addEventListener('astro:after-swap', () => {
              applyTheme();
              applyShadowStyle();
          });
      })();
  </script>
  ```

- [ ] **Step 3: Commit Task 1** (Do not commit, write report)

---

### Task 2: global.css cleanup and shadow styles mapping

**Files:**
- Modify: [global.css](file:///c:/Users/aaron/Desktop/TADC/projects/instituto_hub/src/styles/global.css)

**Interfaces:**
- Consumes: `data-shadow-style` attribute on `html` tag.
- Produces: CSS variables `--dark-shadow-color` and `--dark-shadow-ring-color` resolving based on shadow style.

- [ ] **Step 1: Clean up alternative palettes**
  Remove the alternative palettes (`social`, `retro`, `forest` in light and dark mode) from [global.css](file:///c:/Users/aaron/Desktop/TADC/projects/instituto_hub/src/styles/global.css). Keep only the original `:root` brand colors and `html.dark body` overrides.

- [ ] **Step 2: Map shadow style variables in dark mode**
  Define `--dark-shadow-color` and `--dark-shadow-ring-color` inside `html.dark body`. Mapped overrides for `neon-shadow` and `white-shadow` styles.

  Add these rules:
  ```css
  /* ========================================================
     GLOBAL NEO-BRUTALIST DARK MODE CAPABILITY
     ======================================================== */
  html.dark body {
      color: #e4e4e7;
      --color-foreground: #e4e4e7;
      /* Default dark mode values (neon theme) */
      --color-background: #121212;
      --color-principal: #d9ff7f;
      --color-destaque: #7a3aed;
      --dark-panel-bg: #1c1c1f;     /* Lighter panel bg for black shadow contrast */
      --dark-panel-bg-alt: #27272a;
      --dark-panel-text: #f1f5f9;
      --dark-base-black: #09090b;
      --color-dot-pattern: rgba(217, 255, 127, 0.08);

      /* Default Shadow Style: Black Shadow */
      --dark-shadow-color: #000000;
      --dark-shadow-ring-color: var(--dark-panel-text); /* White border, black shadow */
  }

  /* 2. Sombra Neon */
  html.dark[data-shadow-style="neon-shadow"] body {
      --dark-shadow-color: var(--color-principal); /* Verde Limão */
      --dark-shadow-ring-color: var(--dark-base-black); /* Black border, green shadow */
  }

  /* 3. Sombra Branca */
  html.dark[data-shadow-style="white-shadow"] body {
      --dark-shadow-color: var(--dark-panel-text); /* White shadow */
      --dark-shadow-ring-color: var(--dark-panel-text); /* White border */
  }
  ```

- [ ] **Step 3: Update shadow CSS classes to reference the variables in dark mode**
  Replace the hardcoded `box-shadow` values inside `html.dark .neo-shadow`, `html.dark .neo-shadow-sm` and `html.dark .neo-shadow-yellow` to use `var(--dark-shadow-ring-color)` and `var(--dark-shadow-color)`.

  ```css
  /* =========================================
     SOMBRAS NEO-BRUTALISTAS E ÍCONES
     ========================================= */
  html.dark .neo-shadow, 
  html.dark .neo-shadow-yellow,
  html.dark .neo-shadow-sm,
  html.dark .hover\:neo-shadow:hover,
  html.dark .hover\:neo-shadow-yellow:hover,
  html.dark .hover\:neo-shadow-sm:hover {
      box-shadow: 0 0 0 1px var(--dark-shadow-ring-color), 4px 4px 0px 0px var(--dark-shadow-color) !important;
  }

  html.dark .neo-shadow:hover,
  html.dark .neo-shadow-yellow:hover {
      box-shadow: 0 0 0 1px var(--dark-shadow-ring-color), 2px 2px 0px 0px var(--dark-shadow-color) !important;
      transform: translate(2px, 2px);
  }

  html.dark .neo-shadow-sm:hover {
      box-shadow: 0 0 0 1px var(--dark-shadow-ring-color), 1px 1px 0px 0px var(--dark-shadow-color) !important;
      transform: translate(2px, 2px);
  }
  ```

- [ ] **Step 4: Commit Task 2** (Do not commit, write report)

---

### Task 3: Header Dropdown Update

**Files:**
- Modify: [Header.astro](file:///c:/Users/aaron/Desktop/TADC/projects/instituto_hub/src/components/organisms/Header.astro)

**Interfaces:**
- Consumes: None
- Produces: HTML select component and script listeners inside `Header.astro`.

- [ ] **Step 1: Replace select options in Header**
  Replace the option list of `#palette-select` with the new shadow styles options:
  ```html
  <!-- Shadow Style Selector (Combobox) -->
  <div class="relative mr-1 sm:mr-2">
      <select 
          id="shadow-select" 
          aria-label="Escolher Estilo de Sombra"
          class="bg-white dark:bg-zinc-800 text-principal border-2 border-principal font-bold font-heading uppercase text-xs h-10 sm:h-12 px-2 sm:px-3 rounded-lg outline-none cursor-pointer shadow-[2px_2px_0_0_black] dark:shadow-[2px_2px_0_0_#f1f5f9] transition-all hover:bg-slate-50 dark:hover:bg-zinc-700"
      >
          <option value="black-shadow">Sombra Preta</option>
          <option value="neon-shadow">Sombra Neon</option>
          <option value="white-shadow">Sombra Branca</option>
      </select>
  </div>
  ```

- [ ] **Step 2: Update Script logic**
  Change the select ID to `shadow-select` and store key to `theme-shadow-style`. Update DOM attribute `data-shadow-style` on root.

  ```javascript
        // Shadow Style Selector Logic
        const select = document.getElementById('shadow-select');
        if (select) {
            select.replaceWith(select.cloneNode(true));
        }

        const newSelect = document.getElementById('shadow-select');
        const savedShadow = localStorage.getItem('theme-shadow-style') || 'black-shadow';
        if (newSelect) {
            newSelect.value = savedShadow;
            newSelect.addEventListener('change', (e) => {
                const targetShadow = e.target.value;
                document.documentElement.setAttribute('data-shadow-style', targetShadow);
                localStorage.setItem('theme-shadow-style', targetShadow);
            });
        }
  ```

- [ ] **Step 3: Commit Task 3** (Do not commit, write report)

---

### Task 4: E2E Tests for Shadow Styles

**Files:**
- Modify: `tests/e2e/palette.spec.ts`

**Interfaces:**
- Consumes: Playwright browser tests.
- Produces: Test suite validating shadow style switching.

- [ ] **Step 1: Update Playwright test file**
  Update `tests/e2e/palette.spec.ts` to change references from palette to shadow styles:
  Verify element `#shadow-select` instead of `#palette-select` and attribute `data-shadow-style` instead of `data-palette`.

  ```typescript
  import { test, expect } from '@playwright/test';

  test.describe('Seletor de Estilo de Sombra', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('deve possuir o combobox seletor de sombras no header', async ({ page }) => {
      const select = page.locator('#shadow-select');
      await expect(select).toBeVisible();
    });

    test('deve mudar o estilo de sombra para neon ao selecionar', async ({ page }) => {
      const select = page.locator('#shadow-select');
      await select.selectOption('neon-shadow');
      await expect(page.locator('html')).toHaveAttribute('data-shadow-style', 'neon-shadow');
    });

    test('deve persistir o estilo de sombra selecionado apos atualizar', async ({ page }) => {
      const select = page.locator('#shadow-select');
      await select.selectOption('white-shadow');
      await expect(page.locator('html')).toHaveAttribute('data-shadow-style', 'white-shadow');

      await page.reload();
      await expect(page.locator('html')).toHaveAttribute('data-shadow-style', 'white-shadow');
      const currentVal = await page.locator('#shadow-select').inputValue();
      expect(currentVal).toBe('white-shadow');
    });
  });
  ```

- [ ] **Step 2: Run all tests to verify**
  Propose command: `pnpm test`
  Expected: All E2E tests pass.

- [ ] **Step 3: Commit Task 4** (Do not commit, write report)
