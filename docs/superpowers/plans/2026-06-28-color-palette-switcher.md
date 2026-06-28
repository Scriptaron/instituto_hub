# Color Palette Switcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a color palette switcher (Combobox select element) in the site's header that dynamically switches between four Neo-Brutalist color palettes (Neon, Lavanda Social, Retro Sunset, Forest & Rose) and persists the selection.

**Architecture:** Mapped custom CSS properties (`--color-background`, `--color-principal`, `--color-destaque`, `--color-foreground`, `--dark-panel-bg`, `--dark-panel-bg-alt`, `--dark-panel-text`, `--dark-base-black`) defined dynamically in `global.css` under `html[data-palette="..."]` attributes. A select element in the header modifies the `data-palette` attribute on the `html` element and saves selection to `localStorage`. An inline script in the `<head>` of `BaseLayout.astro` blocks FOUC by loading the palette immediately before rendering.

**Tech Stack:** Astro, Tailwind CSS v4, Playwright (E2E testing).

## Global Constraints

- Design must remain strictly Neo-Brutalist (thick borders, hard shadows, high contrast).
- Accessibility: Text colors over main brand colors must maintain solid contrast ratios (e.g., black text on light brand colors, white/clear text on dark brand colors).
- No page refreshes when toggling the palette.
- Persistent state via `localStorage` with a fallback to the "neon" (original) palette.

---

### Task 1: BaseLayout Head Injector

**Files:**
- Modify: [BaseLayout.astro](file:///c:/Users/aaron/Desktop/TADC/projects/instituto_hub/src/layouts/BaseLayout.astro#L55-L82)

**Interfaces:**
- Consumes: None
- Produces: Inline script that sets `data-palette` attribute on the `html` root node during initial render and after client routing swap.

- [ ] **Step 1: Check existing BaseLayout implementation**
  Review the `BaseLayout.astro` file around lines 55-82 to identify where theme injection is placed.

- [ ] **Step 2: Add palette load logic to the inline script**
  Modify [BaseLayout.astro](file:///c:/Users/aaron/Desktop/TADC/projects/instituto_hub/src/layouts/BaseLayout.astro) to add `applyPalette()` function inside the inline script block and call it immediately, as well as on the `astro:after-swap` listener.

  The updated script should look exactly like this:
  ```html
  <!-- Dark Mode and Palette Global Injector -->
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

          function applyPalette() {
              const palette = (typeof localStorage !== 'undefined' && localStorage.getItem('theme-palette')) || 'neon';
              document.documentElement.setAttribute('data-palette', palette);
          }

          // Aplica imediatamente (previne FOUC no carregamento inicial)
          applyTheme();
          applyPalette();

          // Re-aplica após cada navegação do ClientRouter (evita reset do data-theme e classe .dark)
          document.addEventListener('astro:after-swap', () => {
              applyTheme();
              applyPalette();
          });
      })();
  </script>
  ```

- [ ] **Step 3: Commit Task 1**
  ```bash
  git add src/layouts/BaseLayout.astro
  git commit -m "feat: add inline palette load script in BaseLayout to prevent FOUC"
  ```

---

### Task 2: Global CSS Custom Variables

**Files:**
- Modify: [global.css](file:///c:/Users/aaron/Desktop/TADC/projects/instituto_hub/src/styles/global.css)

**Interfaces:**
- Consumes: `data-palette` attribute on the `html` tag.
- Produces: Updated CSS custom properties for `@theme` depending on the active palette and dark mode state.

- [ ] **Step 1: Set default variables in `:root` and define data-palette overrides**
  Modify [global.css](file:///c:/Users/aaron/Desktop/TADC/projects/instituto_hub/src/styles/global.css) by mapping default CSS variables at `:root` and adding blocks for `social`, `retro`, and `forest` palettes.

  Add these rules at the end of the global variables definition section:
  ```css
  /* ========================================================
     PALETTE CUSTOM PROPERTY CONFIGURATIONS
     ======================================================== */
  :root {
      --color-background: #f2f2f2;
      --color-principal: #7a3aed;
      --color-destaque: #d9ff7f;
      --color-foreground: #2d2d2d;
  }

  /* 2. Lavanda Social */
  html[data-palette="social"] {
      --color-background: #e8e4f8;
      --color-principal: #5e3be0;
      --color-destaque: #00a84f;
      --color-foreground: #1c0e4a;
  }

  /* 3. Retro Sunset */
  html[data-palette="retro"] {
      --color-background: #fafaf9;
      --color-principal: #2563eb;
      --color-destaque: #ff6b00;
      --color-foreground: #000000;
  }

  /* 4. Forest & Rose */
  html[data-palette="forest"] {
      --color-background: #f0fdf4;
      --color-principal: #065f46;
      --color-destaque: #ec4899;
      --color-foreground: #022c22;
  }
  ```

- [ ] **Step 2: Add Dark Mode overrides for each palette**
  Add the dark mode mapping definitions for each `data-palette` selection in [global.css](file:///c:/Users/aaron/Desktop/TADC/projects/instituto_hub/src/styles/global.css).
  Replace or update the `html.dark body` rule so that it defines palette-specific overrides:

  ```css
  /* ========================================================
     GLOBAL NEO-BRUTALIST DARK MODE CAPABILITY
     ======================================================== */
  html.dark body {
      color: #e4e4e7;
      /* Default dark mode values (neon theme) */
      --color-background: #121212;
      --color-principal: #d9ff7f;
      --color-destaque: #7a3aed;
      --dark-panel-bg: #18181b;
      --dark-panel-bg-alt: #27272a;
      --dark-panel-text: #f1f5f9;
      --dark-base-black: #09090b;
      background-image: radial-gradient(rgba(217, 255, 127, 0.08) 2px, transparent 2px) !important;
  }

  /* Lavanda Social - Dark Mode */
  html.dark[data-palette="social"] body {
      --color-background: #0f0d19;
      --color-principal: #a78bfa;
      --color-destaque: #22c55e;
      --color-foreground: #f1f5f9;
      --dark-panel-bg: #181622;
      --dark-panel-bg-alt: #242232;
      --dark-panel-text: #f1f5f9;
      --dark-base-black: #09090b;
      background-image: radial-gradient(rgba(167, 139, 250, 0.08) 2px, transparent 2px) !important;
  }

  /* Retro Sunset - Dark Mode */
  html.dark[data-palette="retro"] body {
      --color-background: #0b132b;
      --color-principal: #ff9f1c;
      --color-destaque: #4ea8de;
      --color-foreground: #f8fafc;
      --dark-panel-bg: #111a36;
      --dark-panel-bg-alt: #1c274c;
      --dark-panel-text: #f8fafc;
      --dark-base-black: #050a18;
      background-image: radial-gradient(rgba(255, 159, 28, 0.08) 2px, transparent 2px) !important;
  }

  /* Forest & Rose - Dark Mode */
  html.dark[data-palette="forest"] body {
      --color-background: #022c22;
      --color-principal: #f472b6;
      --color-destaque: #4ade80;
      --color-foreground: #f0fdf4;
      --dark-panel-bg: #064e3b;
      --dark-panel-bg-alt: #0f766e;
      --dark-panel-text: #f0fdf4;
      --dark-base-black: #021a14;
      background-image: radial-gradient(rgba(74, 222, 128, 0.08) 2px, transparent 2px) !important;
  }
  ```

- [ ] **Step 3: Commit Task 2**
  ```bash
  git add src/styles/global.css
  git commit -m "style: define css custom properties and dark mode overrides for all four palettes"
  ```

---

### Task 3: Header Combobox Selector

**Files:**
- Modify: [Header.astro](file:///c:/Users/aaron/Desktop/TADC/projects/instituto_hub/src/components/organisms/Header.astro)

**Interfaces:**
- Consumes: None
- Produces: HTML select component and script listeners inside `Header.astro`.

- [ ] **Step 1: Place the Combobox select dropdown in the Header layout**
  Add the select element in the `.navbar-end` flex container of [Header.astro](file:///c:/Users/aaron/Desktop/TADC/projects/instituto_hub/src/components/organisms/Header.astro), right before the theme toggle button (around line 54).

  HTML code to insert:
  ```html
  <!-- Palette Selector (Combobox) -->
  <div class="relative mr-1 sm:mr-2">
      <select 
          id="palette-select" 
          aria-label="Escolher Paleta de Cores"
          class="bg-white dark:bg-zinc-800 text-principal border-2 border-principal font-bold font-heading uppercase text-xs h-10 sm:h-12 px-2 sm:px-3 rounded-lg outline-none cursor-pointer shadow-[2px_2px_0_0_black] dark:shadow-[2px_2px_0_0_#f1f5f9] transition-all hover:bg-slate-50 dark:hover:bg-zinc-700"
      >
          <option value="neon">Original</option>
          <option value="social">Lavanda</option>
          <option value="retro">Retro</option>
          <option value="forest">Forest</option>
      </select>
  </div>
  ```

- [ ] **Step 2: Add event listeners in the Header inline script**
  Update the script inside `Header.astro` to bind event listeners on load and update values when selection changes.

  Inside `document.addEventListener('astro:page-load', () => { ... })`:
  ```javascript
      // Palette Selector Logic
      const select = document.getElementById('palette-select');
      const savedPalette = localStorage.getItem('theme-palette') || 'neon';
      if (select) {
          select.value = savedPalette;
      }

      select?.addEventListener('change', (e) => {
          const targetPalette = e.target.value;
          document.documentElement.setAttribute('data-palette', targetPalette);
          localStorage.setItem('theme-palette', targetPalette);
      });
  ```

- [ ] **Step 3: Commit Task 3**
  ```bash
  git add src/components/organisms/Header.astro
  git commit -m "feat: add combobox select element and script to header for switching colors"
  ```

---

### Task 4: E2E Tests for Theme/Palette Switcher

**Files:**
- Create: `tests/e2e/palette.spec.ts`

**Interfaces:**
- Consumes: Playwright browser tests.
- Produces: Test suite validating palette switching and persistence.

- [ ] **Step 1: Create a new Playwright test file**
  Create `tests/e2e/palette.spec.ts` with assertions verifying that changing the dropdown updates the `data-palette` attribute and persists the state in `localStorage` across page loads.

  ```typescript
  import { test, expect } from '@playwright/test';

  test.describe('Seletor de Paleta de Cores', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('deve possuir o combobox seletor de paletas no header', async ({ page }) => {
      const select = page.locator('#palette-select');
      await expect(select).toBeVisible();
    });

    test('deve mudar a paleta para social ao selecionar', async ({ page }) => {
      const select = page.locator('#palette-select');
      await select.selectOption('social');
      await expect(page.locator('html')).toHaveAttribute('data-palette', 'social');
    });

    test('deve persistir a paleta selecionada apos atualizar', async ({ page }) => {
      const select = page.locator('#palette-select');
      await select.selectOption('retro');
      await expect(page.locator('html')).toHaveAttribute('data-palette', 'retro');

      await page.reload();
      await expect(page.locator('html')).toHaveAttribute('data-palette', 'retro');
      const currentVal = await page.locator('#palette-select').inputValue();
      expect(currentVal).toBe('retro');
    });

    test('deve persistir a paleta selecionada apos navegar para outra pagina', async ({ page }) => {
      const select = page.locator('#palette-select');
      await select.selectOption('forest');
      await expect(page.locator('html')).toHaveAttribute('data-palette', 'forest');

      // Navega para /aulas
      const aulasLink = page.locator('.navbar a[href="/aulas"]:visible');
      await aulasLink.click();
      await page.waitForURL(/\/aulas/);

      await expect(page.locator('html')).toHaveAttribute('data-palette', 'forest');
    });
  });
  ```

- [ ] **Step 2: Run all tests to verify everything passes**
  Propose command: `pnpm test`
  Expected: All E2E tests pass.

- [ ] **Step 3: Commit Task 4**
  ```bash
  git add tests/e2e/palette.spec.ts
  git commit -m "test: add E2E tests for color palette combobox switcher and persistence"
  ```
