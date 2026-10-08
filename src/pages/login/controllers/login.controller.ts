import type { Page } from '@playwright/test';
import { LoginLocator } from '@pages/login/locators/login.locator';

export class LoginController {
  private readonly locator: LoginLocator;

  constructor(private readonly page: Page) {
    this.locator = new LoginLocator(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('/en/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.locator.emailInput.fill(email);
    await this.locator.passwordInput.fill(password);
    await this.locator.signInButton.click();
  }
}
