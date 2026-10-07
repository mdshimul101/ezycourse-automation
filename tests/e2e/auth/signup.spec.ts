import { test, expect } from '@fixtures';
import { buildNewStudent } from '@data/students';

// Signup validation for visitors. None of these tests creates an account.
// Tests that DO create accounts live in tests/e2e/admin/student-signup.spec.ts,
// because deleting the created student afterwards needs the admin session.
test.describe('Student signup validation', { tag: '@auth' }, () => {
  test.beforeEach(async ({ signupPage }) => {
    await signupPage.goto();
  });

  test('empty form shows a validation error for every field', async ({ signupPage, page }) => {
    await signupPage.signUpButton.click();

    await expect(page.getByText('First name must be at least 2 characters long')).toBeVisible();
    await expect(page.getByText('Last name must be at least 2 characters long')).toBeVisible();
    await expect(page.getByText('Invalid email address')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
    await expect(page).toHaveURL(/\/en\/signup/);
  });

  test('password shorter than 6 characters is rejected', async ({ signupPage, page }) => {
    await signupPage.signup(buildNewStudent({ password: '12' }));

    await expect(page.getByText('Password must be at least 6 characters long')).toBeVisible();
    await expect(page).toHaveURL(/\/en\/signup/);
  });
});
