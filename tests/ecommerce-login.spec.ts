
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';

test.describe('E-commerce Authentication Module', () => {

  test('ECOM_001 - Verify successful customer login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );

    await loginPage.verifyLoginSuccessful();
  });

  test('ECOM_002 - Verify login with locked-out user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(
      users.lockedOutUser.username,
      users.lockedOutUser.password
    );

    await loginPage.verifyLoginError(
      'Sorry, this user has been locked out.'
    );
  });

  test('ECOM_003 - Verify login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(
      users.invalidUser.username,
      users.invalidUser.password
    );

    await loginPage.verifyLoginError(
      'Username and password do not match any user in this service'
    );
  });

  test('ECOM_004 - Verify login with empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(
      users.emptyUser.username,
      users.emptyUser.password
    );

    await loginPage.verifyLoginError(
      'Username is required'
    );
  });

});
