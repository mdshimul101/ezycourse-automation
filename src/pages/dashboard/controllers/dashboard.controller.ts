import type { Page } from '@playwright/test';
import { DashboardLocator } from '@pages/dashboard/locators/dashboard.locator';

export class DashboardController {
  private readonly locator: DashboardLocator;

  constructor(private readonly page: Page) {
    this.locator = new DashboardLocator(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await this.locator.heading.waitFor();
  }
}
