import { test, expect } from '@playwright/test';

test.describe('Navegação básica', () => {
  test('página inicial carrega com título correto', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Instituto Hub/);
  });

  test('navegação para /aulas', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      const link = document.querySelector('a[href="/aulas"]');
      if (link) (link as HTMLElement).click();
    });
    await expect(page).toHaveURL(/\/aulas/);
    await expect(page.locator('main h1').first()).toContainText(/Aulas/i);
  });

  test('navegação para /cronograma', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      const link = document.querySelector('a[href="/cronograma"]');
      if (link) (link as HTMLElement).click();
    });
    await expect(page).toHaveURL(/\/cronograma/);
    await expect(page.locator('main h1').first()).toContainText(/Cronograma/i);
  });

  test('navegação para /sobre', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      const link = document.querySelector('a[href="/sobre"]');
      if (link) (link as HTMLElement).click();
    });
    await expect(page).toHaveURL(/\/sobre/);
    await expect(page.locator('main h1').first()).toContainText(/Nossa História/i);
  });
});

test.describe('Persistência de tema', () => {
  test('dark mode persiste após navegação', async ({ page }) => {
    await page.goto('/');
    await page.locator('#theme-toggle').click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    await page.evaluate(() => {
      const link = document.querySelector('a[href="/aulas"]');
      if (link) (link as HTMLElement).click();
    });
    await page.waitForURL(/\/aulas/);
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('tema claro é padrão sem localStorage', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('theme'));
    await page.reload();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });
});
