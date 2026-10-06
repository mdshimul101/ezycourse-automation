import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';

type Pages = {
  loginPage: LoginPage;
};

/**
 * Our own `test`: same as Playwright's, plus ready-made page objects.
 * Tests ask for `{ loginPage }` instead of writing `new LoginPage(page)` every time.
 */
export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from '@playwright/test';
