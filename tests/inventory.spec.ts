
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../test-data/users';

test.describe('E-commerce Inventory Module', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );
    await loginPage.verifyLoginSuccessful();
  });

  test('ECOM_005 - Verify inventory page is displayed', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.verifyInventoryPage();
  });

  test('ECOM_006 - Verify six products are displayed', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.verifyProductCount(6);
  });

  test('ECOM_007 - Verify products are sorted A to Z', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortProducts('az');
    await inventoryPage.verifyProductsSortedAZ();
  });

  test('ECOM_008 - Verify products are sorted Z to A', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortProducts('za');
    await inventoryPage.verifyProductsSortedZA();
  });

  test('ECOM_009 - Verify prices are sorted low to high', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortProducts('lohi');
    await inventoryPage.verifyPricesLowToHigh();
  });

  test('ECOM_010 - Verify prices are sorted high to low', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortProducts('hilo');
    await inventoryPage.verifyPricesHighToLow();
  });

});