
import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly productCards: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.productCards = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async verifyInventoryPage() {
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.pageTitle).toHaveText('Products');
  }

  async verifyProductCount(count: number) {
    await expect(this.productCards).toHaveCount(count);
  }

  async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async verifyProductsSortedAZ() {
    const names = await this.productNames.allTextContents();
    expect(names).toEqual([...names].sort());
  }

  async verifyProductsSortedZA() {
    const names = await this.productNames.allTextContents();
    expect(names).toEqual([...names].sort().reverse());
  }

  async verifyPricesLowToHigh() {
    const prices = await this.productPrices.allTextContents();
    const numericPrices = prices.map(price =>
      Number(price.replace('$', ''))
    );

    expect(numericPrices).toEqual(
      [...numericPrices].sort((a, b) => a - b)
    );
  }

  async verifyPricesHighToLow() {
    const prices = await this.productPrices.allTextContents();
    const numericPrices = prices.map(price =>
      Number(price.replace('$', ''))
    );

    expect(numericPrices).toEqual(
      [...numericPrices].sort((a, b) => b - a)
    );
  }
}
