import type { Locator, Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly welcomeHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Dashboard', level: 1 });
    this.welcomeHeading = page.getByRole('heading', { name: /Welcome back/ });
  }

  async goto(): Promise<void> {
    await this.page.goto('/dashboard');
  }
}
