
import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;
  readonly checkoutItems: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.checkoutItems = page.locator('.cart_item');
    this.subtotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
    this.completeHeader = page.locator('.complete-header');
  }

  async enterCustomerInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueCheckout() {
    await this.continueButton.click();
    await expect(this.page).toHaveURL(/checkout-step-two.html/);
  }

  async verifyCheckoutError(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }

  async verifyCheckoutItems(count: number) {
    await expect(this.checkoutItems).toHaveCount(count);
  }

  async verifySubtotal(amount: string) {
    await expect(this.subtotal).toContainText(amount);
  }

  async verifyTax(amount: string) {
    await expect(this.tax).toContainText(amount);
  }

  async verifyTotal(amount: string) {
    await expect(this.total).toContainText(amount);
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async verifyOrderComplete() {
    await expect(this.page).toHaveURL(/checkout-complete.html/);
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }
}
