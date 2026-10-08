import { test, expect } from '@fixtures';
import { buildNewStudent } from '@data/students';

// These tests create real student accounts. They sign up in a logged-out browser (`guestPage`)
// and register each email with `cleanupStudent`, so the admin session deletes it after the test.
// No @guest tag on purpose: they run in the admin project so that cleanup can log in as admin.
test.describe('Student signup', { tag: ['@auth', '@students'] }, () => {
  test('TC_SIGNUP_03: new student can sign up and lands on the student dashboard', async ({
    guestPage,
    guestSignupController,
    cleanupStudent,
  }) => {
    const student = buildNewStudent();
    cleanupStudent(student.email);

    await guestSignupController.goto();
    await guestSignupController.signup(student);

    await expect(guestPage).toHaveURL(/\/student\/dashboard/);
  });

  test('TC_SIGNUP_04: signing up with an existing email is rejected', async ({
    guestPage,
    guestSignupController,
    guestSignupLocator,
    cleanupStudent,
  }) => {
    const student = buildNewStudent();
    cleanupStudent(student.email);

    // Precondition: the email already belongs to an account.
    await guestSignupController.goto();
    await guestSignupController.signup(student);
    await expect(guestPage).toHaveURL(/\/student\/dashboard/);
    await guestPage.context().clearCookies();

    await guestSignupController.goto();
    await guestSignupController.signup(student);

    await expect(guestSignupLocator.emailAlreadyExistsError).toBeVisible();
    await expect(guestPage).toHaveURL(/\/en\/signup/);
  });
});
