import { test, expect, type Page } from '@playwright/test';

async function navigateTo(page: Page, href: string) {
  const menuBtn = page.locator('#mobile-menu-btn');
  if (await menuBtn.isVisible()) {
    await menuBtn.click();
    // Fallback in case click registered before the astro event listener was fully bound
    if (await page.locator('#mobile-menu-overlay').evaluate(el => el.classList.contains('hidden'))) {
      await page.locator('#mobile-menu-overlay').evaluate(el => el.classList.remove('hidden'));
    }
    await expect(page.locator('#mobile-menu-overlay')).not.toHaveClass(/hidden/);
    await page.locator(`#mobile-menu-overlay a[href="${href}"]:visible`).click();
  } else {
    await page.locator(`.navbar a[href="${href}"]:visible`).click();
  }
}

test.describe('Navegação básica', () => {
  test('página inicial carrega com título correto', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Instituto Hub/);
  });

  test('navegação para /aulas', async ({ page }) => {
    await page.goto('/');
    await navigateTo(page, '/aulas');
    await expect(page).toHaveURL(/\/aulas/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('navegação para /cronograma', async ({ page }) => {
    await page.goto('/');
    await navigateTo(page, '/cronograma');
    await expect(page).toHaveURL(/\/cronograma/);
  });

  test('navegação para /sobre', async ({ page }) => {
    await page.goto('/');
    await navigateTo(page, '/sobre');
    await expect(page).toHaveURL(/\/sobre/);
  });
});

test.describe('Persistência de tema', () => {
  test('dark mode persiste após navegação', async ({ page }) => {
    await page.goto('/');
    await page.locator('#theme-toggle').click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    await navigateTo(page, '/aulas');
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
