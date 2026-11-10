
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Negative Checkout Testing', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cartPage = new CartPage(page);

    await loginPage.navigate();

    await loginPage.login(
      'standard_user',
      'secret_sauce'
    );

    await loginPage.verifyLoginSuccessful();

    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    await cartPage.openCart();
    await cartPage.proceedToCheckout();
  });

  test('ECOM_038 - Verify checkout rejects missing customer information', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.continueButton.click();

    await checkoutPage.verifyCheckoutError(
      'Error: First Name is required'
    );

    await checkoutPage.verifyCheckoutError(
      'Error: First Name is required'
    );
  });

});
