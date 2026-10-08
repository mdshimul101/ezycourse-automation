import { test as setup, expect } from '@fixtures';
import { globalConfig } from '@configs/global-config';

setup('log in as admin and save the session', async ({ loginController, dashboardLocator, page }) => {
  const admin = globalConfig.admin;

  await loginController.goto();
  await loginController.login(admin.email, admin.password);

  // Make sure login really finished before saving, or we would save a logged-out session.
  await expect(page).toHaveURL(/\/dashboard/);
  await expect(dashboardLocator.heading).toBeVisible();

  await page.context().storageState({ path: globalConfig.storageStatePath.admin });
});
