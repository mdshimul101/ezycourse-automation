import { test as base, type Page } from '@playwright/test';
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
  guestPage: Page;
  guestSignupPage: SignupPage;
  cleanupStudent: (email: string) => void;
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

  /** A logged-out browser tab, separate from the test's own `page` (which may be logged in as admin). */
  guestPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: { cookies: [], origins: [] } });
    await use(await context.newPage());
    await context.close();
  },
  guestSignupPage: async ({ guestPage }, use) => {
    await use(new SignupPage(guestPage));
  },

  /**
   * Call `cleanupStudent(email)` for every student a test creates.
   * After the test (even a failed one) each of them is permanently deleted.
   * Admin tests only: the cleanup needs the admin session.
   */
  cleanupStudent: async ({ studentsPage }, use) => {
    const emails: string[] = [];
    await use((email) => {
      emails.push(email);
    });
    for (const email of emails) {
      await studentsPage.deleteIfExists(email);
    }
  },

  /** A brand-new student who signed up through the real signup page. Deleted after the test. */
  signedUpStudent: async ({ guestSignupPage, cleanupStudent }, use) => {
    const student = buildNewStudent();
    cleanupStudent(student.email);
    await guestSignupPage.goto();
    await guestSignupPage.signup(student);
    await guestSignupPage.page.waitForURL(/\/student\/dashboard/);
    await use(student);
  },
});

export { expect } from '@playwright/test';
