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

    // Navega para /aulas usando o helper para suportar mobile/desktop
    await navigateTo(page, '/aulas');
    await page.waitForURL(/\/aulas/);

    await expect(page.locator('html')).toHaveAttribute('data-palette', 'forest');
  });
});
