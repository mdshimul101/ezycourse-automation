import { test as setup, expect } from '@fixtures';
import { getAdminUser } from '@data/users';
import { ADMIN_STORAGE_STATE } from '@utils/paths';

setup('log in as admin and save the session', async ({ loginPage, dashboardPage, page }) => {
  const admin = getAdminUser();

  await loginPage.goto();
  await loginPage.login(admin.email, admin.password);

  // Make sure login really finished before saving, or we would save a logged-out session.
  await expect(page).toHaveURL(/\/dashboard/);
  await expect(dashboardPage.heading).toBeVisible();

  await page.context().storageState({ path: ADMIN_STORAGE_STATE });
});
