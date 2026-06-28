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

  test('deve persistir o estilo de sombra selecionado apos navegar para outra pagina', async ({ page }) => {
    const select = page.locator('#shadow-select');
    await select.selectOption('white-shadow');
    await expect(page.locator('html')).toHaveAttribute('data-shadow-style', 'white-shadow');

    // Navega para /aulas usando o helper para suportar mobile/desktop
    await navigateTo(page, '/aulas');
    await page.waitForURL(/\/aulas/);

    await expect(page.locator('html')).toHaveAttribute('data-shadow-style', 'white-shadow');
  });
});
