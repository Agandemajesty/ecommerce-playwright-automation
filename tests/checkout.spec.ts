
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../test-data/users';

test.describe('E-commerce Checkout Module', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );
    await loginPage.verifyLoginSuccessful();

    // Add a product to the cart
    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    // Open cart and proceed to checkout
    const cartPage = new CartPage(page);
    await cartPage.openCart();
    await cartPage.proceedToCheckout();
  });

  test('ECOM_018 - Verify checkout information page', async ({ page }) => {
    await expect(page).toHaveURL(/checkout-step-one.html/);
    await expect(page.locator('.title'))
      .toHaveText('Checkout: Your Information');
  });

  test('ECOM_019 - Verify first name validation', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.continueButton.click();

    await checkoutPage.verifyCheckoutError(
      'Error: First Name is required'
    );
  });

  test('ECOM_020 - Verify last name validation', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.firstNameInput.fill('Majesty');
    await checkoutPage.continueButton.click();

    await checkoutPage.verifyCheckoutError(
      'Error: Last Name is required'
    );
  });

  test('ECOM_021 - Verify postal code validation', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.firstNameInput.fill('Majesty');
    await checkoutPage.lastNameInput.fill('Agande');
    await checkoutPage.continueButton.click();

    await checkoutPage.verifyCheckoutError(
      'Error: Postal Code is required'
    );
  });

  test('ECOM_022 - Verify valid customer information', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.enterCustomerInformation(
      'Majesty',
      'Agande',
      '100001'
    );

    await checkoutPage.continueCheckout();

    await expect(page.locator('.title'))
      .toHaveText('Checkout: Overview');
  });

  test('ECOM_023 - Verify checkout order summary and calculations', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.enterCustomerInformation(
      'Majesty',
      'Agande',
      '100001'
    );

    await checkoutPage.continueCheckout();

    await checkoutPage.verifyCheckoutItems(1);
    await checkoutPage.verifySubtotal('$29.99');
    await checkoutPage.verifyTax('$2.40');
    await checkoutPage.verifyTotal('$32.39');
  });

  test('ECOM_024 - Verify successful order completion', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.enterCustomerInformation(
      'Majesty',
      'Agande',
      '100001'
    );

    await checkoutPage.continueCheckout();
    await checkoutPage.finishOrder();
    await checkoutPage.verifyOrderComplete();
  });

  test('ECOM_025 - Verify cancel checkout navigation', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.cancelCheckout();

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

});
