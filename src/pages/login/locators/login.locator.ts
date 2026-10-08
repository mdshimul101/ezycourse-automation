import type { Locator, Page } from '@playwright/test';

export class LoginLocator {
  // ===== Login form (/en/login) =====
  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  // ===== Feedback =====
  readonly invalidCredentialsError: Locator;

  constructor(page: Page) {
    // ===== Login form =====
    this.heading = page.getByRole('heading', { name: 'Welcome back' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });

    // ===== Feedback =====
    this.invalidCredentialsError = page.getByText('Invalid credentials');
  }
}
