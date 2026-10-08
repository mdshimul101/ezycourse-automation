import type { Page } from '@playwright/test';
import { LoginLocator } from '@pages/login/locators/login.locator';

export class LoginController {
  private readonly locator: LoginLocator;

  constructor(private readonly page: Page) {
    this.locator = new LoginLocator(page);
  }

  async goto(): Promise<void> {
    // The "load" event can take over 30s (background widgets); the form is usable long before that.
    await this.page.goto('/en/login', { waitUntil: 'domcontentloaded' });
    await this.locator.signInButton.waitFor();
  }

  async login(email: string, password: string): Promise<void> {
    await this.locator.emailInput.fill(email);
    await this.locator.passwordInput.fill(password);
    await this.locator.signInButton.click();
  }
}
