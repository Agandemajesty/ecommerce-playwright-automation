
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { NavigationPage } from '../pages/NavigationPage';
import { users } from '../test-data/users';

test.describe('E-commerce Navigation Module', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );

    await loginPage.verifyLoginSuccessful();
  });

  test('ECOM_026 - Verify navigation menu opens', async ({ page }) => {
    const navigationPage = new NavigationPage(page);

    await navigationPage.openMenu();

    await expect(navigationPage.navigationMenu).toBeVisible();
  });

  test('ECOM_027 - Verify navigation menu closes', async ({ page }) => {
    const navigationPage = new NavigationPage(page);

    await navigationPage.openMenu();
    await navigationPage.closeMenu();

    await expect(navigationPage.navigationMenu).toBeHidden();
  });

  test('ECOM_028 - Verify All Items navigation', async ({ page }) => {
    const navigationPage = new NavigationPage(page);

    await navigationPage.openMenu();
    await navigationPage.navigateToAllItems();

    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('ECOM_029 - Verify successful user logout', async ({ page }) => {
    const navigationPage = new NavigationPage(page);

    await navigationPage.openMenu();
    await navigationPage.logout();

    await expect(page.locator('[data-test="login-button"]'))
      .toBeVisible();
  });

  test('ECOM_030 - Verify application state reset', async ({ page }) => {
    const navigationPage = new NavigationPage(page);

    // Add a product to the cart
    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    await expect(page.locator('.shopping_cart_badge'))
      .toHaveText('1');

    // Open menu and reset application state
    await navigationPage.openMenu();
    await navigationPage.resetApplicationState();

    // Verify cart badge is removed
    await expect(page.locator('.shopping_cart_badge'))
      .toHaveCount(0);
  });

});
