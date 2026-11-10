
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Negative Checkout Testing', () => {

  // Setup: Runs before each test
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cartPage = new CartPage(page);

    // Step 1: Navigate to the application
    await loginPage.navigate();

    // Step 2: Login with valid credentials
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.verifyLoginSuccessful();

    // Step 3: Add Sauce Labs Backpack to cart
    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    // Step 4: Open cart and proceed to checkout
    await cartPage.openCart();
    await cartPage.proceedToCheckout();
  });

  // ECOM_038 - Verify checkout rejects missing first name
  test('ECOM_038 - Verify checkout rejects missing first name', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Step 5: Click Continue without entering customer information
    await checkoutPage.continueButton.click();

    // Step 6: Verify first name validation error
    await checkoutPage.verifyCheckoutError(
      'Error: First Name is required'
    );

    // Step 7: Confirm user remains on checkout information page
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });

  // ECOM_039 - Verify checkout rejects missing last name
  test('ECOM_039 - Verify checkout rejects missing last name', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Step 1: Enter first name
    await checkoutPage.firstNameInput.fill('John');

    // Step 2: Leave last name empty

    // Step 3: Enter postal code
    await checkoutPage.postalCodeInput.fill('12345');

    // Step 4: Click Continue
    await checkoutPage.continueButton.click();

    // Step 5: Verify last name validation error
    await checkoutPage.verifyCheckoutError(
      'Error: Last Name is required'
    );

    // Step 6: Confirm user remains on checkout information page
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });

});
