import { test, expect } from '@playwright/test';

test('ECOM_001 - Verify successful customer login', async ({ page }) => {

  // Navigate to the application
  await page.goto('/');

  // Enter valid username
  await page.locator('[data-test="username"]').fill('standard_user');

  // Enter valid password
  await page.locator('[data-test="password"]').fill('secret_sauce');

  // Click the login button
  await page.locator('[data-test="login-button"]').click();

  // Verify successful login
  await expect(page).toHaveURL(/inventory.html/);

  // Verify products page is displayed
  await expect(page.locator('.inventory_list')).toBeVisible();

  await expect(page.locator('.title')).toHaveText('Products');

});