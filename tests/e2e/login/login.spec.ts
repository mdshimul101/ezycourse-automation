import { test, expect } from '@fixtures';
import { invalidUser } from '@data/users';

test.describe('Login', { tag: ['@guest', '@auth'] }, () => {
  test('TC_LOGIN_01: login page shows the sign-in form', { tag: '@smoke' }, async ({ loginController, loginLocator }) => {
    await loginController.goto();

    await expect(loginLocator.heading).toBeVisible();
    await expect(loginLocator.emailInput).toBeVisible();
    await expect(loginLocator.passwordInput).toBeVisible();
    await expect(loginLocator.signInButton).toBeEnabled();
  });

  test('TC_LOGIN_02: login with invalid credentials shows an error', async ({ loginController, loginLocator, page }) => {
    await loginController.goto();
    await loginController.login(invalidUser.email, invalidUser.password);

    await expect(loginLocator.invalidCredentialsError).toBeVisible();
    await expect(page).toHaveURL(/\/en\/login/);
  });
});
