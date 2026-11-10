
import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;
  readonly cartItemPrices: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.cartItemPrices = page.locator('.inventory_item_price');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async openCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart.html/);
  }

  async verifyCartCount(count: number) {
    if (count === 0) {
      await expect(this.cartBadge).toHaveCount(0);
    } else {
      await expect(this.cartBadge).toHaveText(String(count));
    }
  }

  async verifyCartItems(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async verifyProductInCart(productName: string) {
    await expect(this.cartItemNames).toContainText([productName]);
  }

  async verifyProductPrice(price: string) {
    await expect(this.cartItemPrices).toContainText([price]);
  }

  async removeProduct(productName: string) {
    const product = this.page
      .locator('.cart_item')
      .filter({ hasText: productName });

    await product.locator('button').click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout-step-one.html/);
  }
}
