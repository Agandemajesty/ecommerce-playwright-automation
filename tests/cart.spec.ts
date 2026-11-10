
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../test-data/users';

test.describe('E-commerce Shopping Cart Module', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );
    await loginPage.verifyLoginSuccessful();
  });

  test('ECOM_011 - Verify cart opens successfully', async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.openCart();
    await expect(page.locator('.title')).toHaveText('Your Cart');
  });

  test('ECOM_012 - Verify adding one product to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await cartPage.verifyCartCount(1);
    await cartPage.openCart();
    await cartPage.verifyProductInCart('Sauce Labs Backpack');
  });

  test('ECOM_013 - Verify adding multiple products to cart', async ({ page }) => {
    const cartPage = new CartPage(page);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    await cartPage.verifyCartCount(3);
    await cartPage.openCart();
    await cartPage.verifyCartItems(3);
  });

  test('ECOM_014 - Verify cart item count', async ({ page }) => {
    const cartPage = new CartPage(page);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    await cartPage.verifyCartCount(2);
  });

  test('ECOM_015 - Verify removing a product from cart', async ({ page }) => {
    const cartPage = new CartPage(page);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    await cartPage.openCart();
    await cartPage.removeProduct('Sauce Labs Backpack');

    await cartPage.verifyCartItems(1);
    await cartPage.verifyProductInCart('Sauce Labs Bike Light');
    await expect(cartPage.cartItemNames).not.toContainText('Sauce Labs Backpack');
  });

  test('ECOM_016 - Verify cart product price', async ({ page }) => {
    const cartPage = new CartPage(page);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await cartPage.openCart();
    await cartPage.verifyProductPrice('$29.99');
  });

  test('ECOM_017 - Verify cart is empty after removing all products', async ({ page }) => {
    const cartPage = new CartPage(page);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    await cartPage.openCart();

    await cartPage.removeProduct('Sauce Labs Backpack');
    await cartPage.removeProduct('Sauce Labs Bike Light');

    await cartPage.verifyCartItems(0);
    await cartPage.verifyCartCount(0);
  });

});
