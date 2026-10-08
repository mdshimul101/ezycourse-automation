import { test, expect } from '@fixtures';

test.describe('Admin dashboard', { tag: '@admin' }, () => {
  test('TC_DASH_01: logged-in admin can open the dashboard', async ({ dashboardController, dashboardLocator, page }) => {
    await dashboardController.goto();

    await expect(page).toHaveURL(/\/dashboard/);
    await expect(dashboardLocator.heading).toBeVisible();
    await expect(dashboardLocator.welcomeHeading).toBeVisible();
  });
});
