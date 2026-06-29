# Advanced Dark Mode Shadow Styles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement 3 advanced neo-brutalist shadow styles in dark mode (Black Shadow, Gradient Shadow, Stripe Shadow) using `::after` pseudo-elements for premium visual fidelity and perfect hover anchoring.

**Tech Stack:** Astro, Tailwind CSS v4, Playwright.

---

### Task 1: BaseLayout Script Update

**Files:**
- Modify: [BaseLayout.astro](file:///c:/Users/aaron/Desktop/TADC/projects/instituto_hub/src/layouts/BaseLayout.astro)

**Interfaces:**
- Consumes: None
- Produces: Inline script mapping `data-shadow-style` on `html` tag.

- [ ] **Step 1: Update script default value**
  Modify [BaseLayout.astro](file:///c:/Users/aaron/Desktop/TADC/projects/instituto_hub/src/layouts/BaseLayout.astro) to ensure the fallback shadow style is `gradient-shadow` (as it is the most premium one) or keep `black-shadow` as default. Let's use `black-shadow` as default fallback but ensure it works with the new options.

- [ ] **Step 2: Verify SSR compatibility**
  Confirm the code evaluates safely without referencing `window` or `document` during build-time (SSR).

- [ ] **Step 3: Commit Task 1** (Do not commit, write report)

---

### Task 2: global.css Advanced Shadow Styling

**Files:**
- Modify: [global.css](file:///c:/Users/aaron/Desktop/TADC/projects/instituto_hub/src/styles/global.css)

**Interfaces:**
- Consumes: `data-shadow-style` attribute on `html` tag.
- Produces: Advanced pseudo-element rules for `.neo-shadow`, `.neo-shadow-yellow`, and `.neo-shadow-sm` in dark mode.

- [ ] **Step 1: Map pseudo-element selectors for Gradient and Stripe Shadows**
  For `.neo-shadow`, `.neo-shadow-yellow`, and `.neo-shadow-sm`, when `data-shadow-style` is `gradient-shadow` or `stripe-shadow`, disable standard `box-shadow` and use `::after` for the shadow block.

  Add these rules under `SOMBRAS NEO-BRUTALISTAS E ÍCONES` in dark mode:
  ```css
  /* ========================================================
     SOMBRAS AVANÇADAS COM PSEUDO-ELEMENTOS (MODO ESCURO)
     ======================================================== */
  html.dark[data-shadow-style="gradient-shadow"] .neo-shadow,
  html.dark[data-shadow-style="gradient-shadow"] .neo-shadow-yellow,
  html.dark[data-shadow-style="gradient-shadow"] .neo-shadow-sm,
  html.dark[data-shadow-style="stripe-shadow"] .neo-shadow,
  html.dark[data-shadow-style="stripe-shadow"] .neo-shadow-yellow,
  html.dark[data-shadow-style="stripe-shadow"] .neo-shadow-sm {
      position: relative !important;
      box-shadow: none !important; /* Desativa a sombra CSS padrão */
  }

  html.dark[data-shadow-style="gradient-shadow"] .neo-shadow::after,
  html.dark[data-shadow-style="gradient-shadow"] .neo-shadow-yellow::after,
  html.dark[data-shadow-style="gradient-shadow"] .neo-shadow-sm::after,
  html.dark[data-shadow-style="stripe-shadow"] .neo-shadow::after,
  html.dark[data-shadow-style="stripe-shadow"] .neo-shadow-yellow::after,
  html.dark[data-shadow-style="stripe-shadow"] .neo-shadow-sm::after {
      content: '';
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      border: 2px solid var(--dark-panel-text);
      border-radius: inherit;
      transition: all 0.2s ease;
  }

  /* 1. Sombra de Degradê Neon */
  html.dark[data-shadow-style="gradient-shadow"] .neo-shadow::after,
  html.dark[data-shadow-style="gradient-shadow"] .neo-shadow-yellow::after {
      top: 4px;
      left: 4px;
      background: linear-gradient(135deg, var(--color-destaque), var(--color-principal));
  }
  html.dark[data-shadow-style="gradient-shadow"] .neo-shadow-sm::after {
      top: 3px;
      left: 3px;
      background: linear-gradient(135deg, var(--color-destaque), var(--color-principal));
  }

  /* Hover da Sombra de Degradê Neon (Ancoragem Matemática) */
  html.dark[data-shadow-style="gradient-shadow"] .neo-shadow:hover::after,
  html.dark[data-shadow-style="gradient-shadow"] .neo-shadow-yellow:hover::after {
      top: 2px;
      left: 2px;
  }
  html.dark[data-shadow-style="gradient-shadow"] .neo-shadow-sm:hover::after {
      top: 1px;
      left: 1px;
  }

  /* 2. Sombra Listrada Brutalista */
  html.dark[data-shadow-style="stripe-shadow"] .neo-shadow::after,
  html.dark[data-shadow-style="stripe-shadow"] .neo-shadow-yellow::after {
      top: 4px;
      left: 4px;
      background: repeating-linear-gradient(
          45deg,
          var(--dark-base-black),
          var(--dark-base-black) 4px,
          var(--color-principal) 4px,
          var(--color-principal) 8px
      );
  }
  html.dark[data-shadow-style="stripe-shadow"] .neo-shadow-sm::after {
      top: 3px;
      left: 3px;
      background: repeating-linear-gradient(
          45deg,
          var(--dark-base-black),
          var(--dark-base-black) 4px,
          var(--color-principal) 4px,
          var(--color-principal) 8px
      );
  }

  /* Hover da Sombra Listrada Brutalista (Ancoragem Matemática) */
  html.dark[data-shadow-style="stripe-shadow"] .neo-shadow:hover::after,
  html.dark[data-shadow-style="stripe-shadow"] .neo-shadow-yellow:hover::after {
      top: 2px;
      left: 2px;
  }
  html.dark[data-shadow-style="stripe-shadow"] .neo-shadow-sm:hover::after {
      top: 1px;
      left: 1px;
  }
  ```

- [ ] **Step 2: Retain standard black-shadow rules using variables**
  Ensure that when `data-shadow-style` is `black-shadow` (default) or not matched, it uses the standard `--dark-shadow-color` and `--dark-shadow-ring-color` variables mapping we already have.

- [ ] **Step 3: Commit Task 2** (Do not commit, write report)

---

### Task 3: Header.astro Dropdown Update

**Files:**
- Modify: [Header.astro](file:///c:/Users/aaron/Desktop/TADC/projects/instituto_hub/src/components/organisms/Header.astro)

**Interfaces:**
- Consumes: None
- Produces: HTML select component and script listeners inside `Header.astro`.

- [ ] **Step 1: Replace select options in Header**
  Rename choices to match the premium options:
  - `black-shadow` -> "Sombra Preta"
  - `gradient-shadow` -> "Sombra Degradê"
  - `stripe-shadow` -> "Sombra Listrada"

  ```html
  <select 
      id="shadow-select" 
      aria-label="Escolher Estilo de Sombra"
      class="bg-white dark:bg-zinc-800 text-principal border-2 border-principal font-bold font-heading uppercase text-xs h-10 sm:h-12 px-2 sm:px-3 rounded-lg outline-none cursor-pointer shadow-[2px_2px_0_0_black] dark:shadow-[2px_2px_0_0_#f1f5f9] transition-all hover:bg-slate-50 dark:hover:bg-zinc-700"
  >
      <option value="black-shadow">Sombra Preta</option>
      <option value="gradient-shadow">Sombra Degradê</option>
      <option value="stripe-shadow">Sombra Listrada</option>
  </select>
  ```

- [ ] **Step 2: Verify event listeners**
  Confirm the Javascript is wired correctly and handles storage key `theme-shadow-style` and attribute `data-shadow-style`.

- [ ] **Step 3: Commit Task 3** (Do not commit, write report)

---

### Task 4: Playwright E2E Tests Update

**Files:**
- Modify: `tests/e2e/palette.spec.ts`

**Interfaces:**
- Consumes: Playwright browser tests.
- Produces: Test suite validating shadow style switching.

- [ ] **Step 1: Update Playwright test file**
  Update the tests to verify the new option values `black-shadow`, `gradient-shadow`, and `stripe-shadow`.

- [ ] **Step 2: Run all tests to verify**
  Expected: All E2E tests pass.

- [ ] **Step 3: Commit Task 4** (Do not commit, write report)
