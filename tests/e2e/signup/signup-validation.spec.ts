import { test, expect } from '@fixtures';
import { buildNewStudent } from '@data/students';

// Signup validation for visitors. None of these tests creates an account.
// Tests that DO create accounts live in student-signup.spec.ts, because deleting
// the created student afterwards needs the admin session.
test.describe('Student signup validation', { tag: ['@guest', '@auth'] }, () => {
  test.beforeEach(async ({ signupController }) => {
    await signupController.goto();
  });

  test('TC_SIGNUP_01: empty form shows a validation error for every field', async ({ signupController, signupLocator, page }) => {
    await signupController.submit();

    await expect(signupLocator.firstNameTooShortError).toBeVisible();
    await expect(signupLocator.lastNameTooShortError).toBeVisible();
    await expect(signupLocator.invalidEmailError).toBeVisible();
    await expect(signupLocator.passwordRequiredError).toBeVisible();
    await expect(page).toHaveURL(/\/en\/signup/);
  });

  test('TC_SIGNUP_02: password shorter than 6 characters is rejected', async ({ signupController, signupLocator, page }) => {
    await signupController.signup(buildNewStudent({ password: '12' }));

    await expect(signupLocator.passwordTooShortError).toBeVisible();
    await expect(page).toHaveURL(/\/en\/signup/);
  });
});
