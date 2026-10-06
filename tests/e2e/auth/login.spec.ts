import { test, expect } from '@fixtures';
import { invalidUser } from '@data/users';

test.describe('Login', { tag: '@auth' }, () => {
  test('login page shows the sign-in form', { tag: '@smoke' }, async ({ loginPage }) => {
    await loginPage.goto();

    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.signInButton).toBeEnabled();
  });

  test('login with invalid credentials shows an error', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(invalidUser.email, invalidUser.password);

    await expect(page.getByText('Invalid credentials')).toBeVisible();
    await expect(page).toHaveURL(/\/en\/login/);
  });
});
