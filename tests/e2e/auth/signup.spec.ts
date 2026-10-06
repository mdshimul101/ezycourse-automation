import { test, expect } from '@fixtures';
import { buildNewStudent } from '@data/students';

test.describe('Student signup', { tag: '@auth' }, () => {
  test.beforeEach(async ({ signupPage }) => {
    await signupPage.goto();
  });

  test('new student can sign up and lands on the student dashboard', async ({ signupPage, page }) => {
    const student = buildNewStudent();

    await signupPage.signup(student);

    await expect(page).toHaveURL(/\/student\/dashboard/);
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

  test('signing up with an existing email is rejected', async ({ signupPage, page }) => {
    const student = buildNewStudent();

    // Precondition: the email already belongs to an account.
    await signupPage.signup(student);
    await expect(page).toHaveURL(/\/student\/dashboard/);
    await page.context().clearCookies();

    await signupPage.goto();
    await signupPage.signup(student);

    await expect(page.getByText('This email already exists')).toBeVisible();
    await expect(page).toHaveURL(/\/en\/signup/);
  });
});
