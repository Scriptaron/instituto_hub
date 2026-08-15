import { test, expect } from '@playwright/test';

test.describe('Página de Aulas', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/aulas');
  });

  test('hero banner visível com h1', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/Aulas/i);
  });

  test('exibe 5 botões de abas de dia', async ({ page }) => {
    await expect(page.locator('.tab-btn')).toHaveCount(5);
  });

  test('clicar na segunda aba exibe seu conteúdo', async ({ page }) => {
    const tabs = page.locator('.tab-btn');
    const second = tabs.nth(1);
    await second.click();

    const targetId = await second.getAttribute('data-target');
    if (targetId) {
      try {
        await expect(page.locator(`#${targetId}`)).not.toHaveClass(/hidden/);
      } catch (e) {
        // Fallback: click again if the first click registered before the astro event listener was fully bound
        await second.click();
        await expect(page.locator(`#${targetId}`)).not.toHaveClass(/hidden/);
      }
    }
  });
});
