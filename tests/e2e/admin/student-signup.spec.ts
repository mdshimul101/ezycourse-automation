import { test, expect } from '@fixtures';
import { buildNewStudent } from '@data/students';

// These tests create real student accounts. They sign up in a logged-out browser (`guestSignupPage`)
// and register each email with `cleanupStudent`, so the admin session deletes it after the test.
test.describe('Student signup', { tag: ['@auth', '@students'] }, () => {
  test('new student can sign up and lands on the student dashboard', async ({ guestSignupPage, cleanupStudent }) => {
    const student = buildNewStudent();
    cleanupStudent(student.email);

    await guestSignupPage.goto();
    await guestSignupPage.signup(student);

    await expect(guestSignupPage.page).toHaveURL(/\/student\/dashboard/);
  });

  test('signing up with an existing email is rejected', async ({ guestSignupPage, cleanupStudent }) => {
    const student = buildNewStudent();
    cleanupStudent(student.email);
    const guestPage = guestSignupPage.page;

    // Precondition: the email already belongs to an account.
    await guestSignupPage.goto();
    await guestSignupPage.signup(student);
    await expect(guestPage).toHaveURL(/\/student\/dashboard/);
    await guestPage.context().clearCookies();

    await guestSignupPage.goto();
    await guestSignupPage.signup(student);

    await expect(guestPage.getByText('This email already exists')).toBeVisible();
    await expect(guestPage).toHaveURL(/\/en\/signup/);
  });
});
