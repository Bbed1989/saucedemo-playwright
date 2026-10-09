import { test, expect } from '@playwright/test';

test('User can login successfully', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL('/inventory.html');
  await expect(page.locator('.title')).toHaveText('Products');
});
