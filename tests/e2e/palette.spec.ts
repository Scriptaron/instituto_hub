import { test, expect, type Page } from '@playwright/test';

async function navigateTo(page: Page, href: string) {
  const menuBtn = page.locator('#mobile-menu-btn');
  if (await menuBtn.isVisible()) {
    await menuBtn.click();
    // Fallback in case click registered before the astro event listener was fully bound
    if (await page.locator('#mobile-menu').evaluate(el => el.classList.contains('hidden'))) {
      await page.locator('#mobile-menu').evaluate(el => el.classList.remove('hidden'));
    }
    await expect(page.locator('#mobile-menu')).not.toHaveClass(/hidden/);
  }
  // Click the visible link in the header via Playwright locator to enforce actionability checks
  await page.locator(`.navbar a[href="${href}"]:visible`).click();
}

test.describe('Seletor de Estilo de Sombra', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('deve possuir o combobox seletor de sombras no header com a opção padrão black-shadow', async ({ page }) => {
    const select = page.locator('#shadow-select');
    await expect(select).toBeVisible();
    await expect(select).toHaveValue('black-shadow');
    await expect(page.locator('html')).toHaveAttribute('data-shadow-style', 'black-shadow');
  });

  test('deve mudar o estilo de sombra para degradê ao selecionar', async ({ page }) => {
    const select = page.locator('#shadow-select');
    await select.selectOption('gradient-shadow');
    await expect(page.locator('html')).toHaveAttribute('data-shadow-style', 'gradient-shadow');
  });

  test('deve mudar o estilo de sombra para preta ao selecionar', async ({ page }) => {
    const select = page.locator('#shadow-select');
    // Força outro valor primeiro
    await select.selectOption('gradient-shadow');
    await expect(page.locator('html')).toHaveAttribute('data-shadow-style', 'gradient-shadow');
    
    // Seleciona black-shadow
    await select.selectOption('black-shadow');
    await expect(page.locator('html')).toHaveAttribute('data-shadow-style', 'black-shadow');
  });

  test('deve persistir o estilo de sombra selecionado apos atualizar', async ({ page }) => {
    const select = page.locator('#shadow-select');
    await select.selectOption('stripe-shadow');
    await expect(page.locator('html')).toHaveAttribute('data-shadow-style', 'stripe-shadow');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-shadow-style', 'stripe-shadow');
    await expect(page.locator('#shadow-select')).toHaveValue('stripe-shadow');
  });

  test('deve persistir o estilo de sombra selecionado apos navegar para outra pagina', async ({ page }) => {
    const select = page.locator('#shadow-select');
    await select.selectOption('stripe-shadow');
    await expect(page.locator('html')).toHaveAttribute('data-shadow-style', 'stripe-shadow');

    await navigateTo(page, '/aulas');
    await page.waitForURL(/\/aulas/);

    await expect(page.locator('html')).toHaveAttribute('data-shadow-style', 'stripe-shadow');
  });
});
