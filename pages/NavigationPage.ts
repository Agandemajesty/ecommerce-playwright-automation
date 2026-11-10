
import { Page, Locator, expect } from '@playwright/test';

export class NavigationPage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly closeMenuButton: Locator;
  readonly navigationMenu: Locator;
  readonly logoutLink: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly resetAppLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.closeMenuButton = page.locator('#react-burger-cross-btn');
    this.navigationMenu = page.locator('.bm-menu');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.allItemsLink = page.locator('[data-test="inventory-sidebar-link"]');
    this.aboutLink = page.locator('[data-test="about-sidebar-link"]');
    this.resetAppLink = page.locator('[data-test="reset-sidebar-link"]');
  }

  async openMenu() {
    await this.menuButton.click();
    await expect(this.navigationMenu).toBeVisible();
  }

  async closeMenu() {
    await this.closeMenuButton.click();
    await expect(this.navigationMenu).toBeHidden();
  }

  async logout() {
    await this.logoutLink.click();
    await expect(this.page).toHaveURL('/');
  }

  async navigateToAllItems() {
    await this.allItemsLink.click();
    await expect(this.page).toHaveURL(/inventory.html/);
  }

  async navigateToAbout() {
    await this.aboutLink.click();
  }

  async resetApplicationState() {
    await this.resetAppLink.click();
  }
}
