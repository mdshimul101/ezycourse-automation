import { test as base } from '@playwright/test';
import { CourseCategoriesPage } from '@pages/CourseCategoriesPage';
import { DashboardPage } from '@pages/DashboardPage';
import { LoginPage } from '@pages/LoginPage';
import { SignupPage } from '@pages/SignupPage';

type Pages = {
  loginPage: LoginPage;
  signupPage: SignupPage;
  dashboardPage: DashboardPage;
  courseCategoriesPage: CourseCategoriesPage;
};

/**
 * Our own `test`: same as Playwright's, plus ready-made page objects.
 * Tests ask for `{ loginPage }` instead of writing `new LoginPage(page)` every time.
 */
export const test = base.extend<Pages>({
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
});

export { expect } from '@playwright/test';
