import type { Locator, Page } from '@playwright/test';

export class DashboardLocator {
  // ===== Admin dashboard (/dashboard) =====
  readonly heading: Locator;
  readonly welcomeHeading: Locator;

  constructor(page: Page) {
    this.heading = page.getByRole('heading', { name: 'Dashboard', level: 1 });
    this.welcomeHeading = page.getByRole('heading', { name: /Welcome back/ });
  }
}
