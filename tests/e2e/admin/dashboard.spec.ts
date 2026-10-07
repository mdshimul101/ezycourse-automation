import { test, expect } from '@fixtures';

test.describe('Admin dashboard', { tag: '@admin' }, () => {
  test('logged-in admin can open the dashboard', async ({ dashboardPage, page }) => {
    await dashboardPage.goto();

    await expect(page).toHaveURL(/\/dashboard/);
    await expect(dashboardPage.heading).toBeVisible();
    await expect(dashboardPage.welcomeHeading).toBeVisible();
  });
});
