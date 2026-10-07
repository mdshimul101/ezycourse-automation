import { test as base } from '@playwright/test';
import { buildNewStudent, type NewStudent } from '@data/students';
import { CourseCategoriesPage } from '@pages/CourseCategoriesPage';
import { DashboardPage } from '@pages/DashboardPage';
import { LoginPage } from '@pages/LoginPage';
import { SignupPage } from '@pages/SignupPage';
import { StudentsPage } from '@pages/StudentsPage';

type Fixtures = {
  loginPage: LoginPage;
  signupPage: SignupPage;
  dashboardPage: DashboardPage;
  courseCategoriesPage: CourseCategoriesPage;
  studentsPage: StudentsPage;
  signedUpStudent: NewStudent;
};

/**
 * Our own `test`: same as Playwright's, plus ready-made page objects and test data.
 * Tests ask for `{ loginPage }` instead of writing `new LoginPage(page)` every time.
 */
export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  courseCategoriesPage: async ({ page }, use) => {
    await use(new CourseCategoriesPage(page));
  },
  studentsPage: async ({ page }, use) => {
    await use(new StudentsPage(page));
  },

  /**
   * A brand-new student who signed up through the real signup page.
   * Signup happens in a separate, logged-out browser (the test's own page stays logged in as admin).
   * After the test, the student is permanently deleted, even if the test failed.
   * Use only in admin tests: the cleanup needs the admin session.
   */
  signedUpStudent: async ({ browser, studentsPage }, use) => {
    const student = buildNewStudent();

    const guestContext = await browser.newContext({ storageState: { cookies: [], origins: [] } });
    const guestPage = await guestContext.newPage();
    const signupPage = new SignupPage(guestPage);
    await signupPage.goto();
    await signupPage.signup(student);
    await guestPage.waitForURL(/\/student\/dashboard/);
    await guestContext.close();

    await use(student);

    await studentsPage.deleteIfExists(student.email);
  },
});

export { expect } from '@playwright/test';
