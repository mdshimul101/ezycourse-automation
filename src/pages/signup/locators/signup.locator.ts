import type { Locator, Page } from '@playwright/test';

export class SignupLocator {
  // ===== Signup form (/en/signup) =====
  readonly heading: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signUpButton: Locator;

  // ===== Validation / server errors =====
  readonly firstNameTooShortError: Locator;
  readonly lastNameTooShortError: Locator;
  readonly invalidEmailError: Locator;
  readonly passwordRequiredError: Locator;
  readonly passwordTooShortError: Locator;
  readonly emailAlreadyExistsError: Locator;

  constructor(page: Page) {
    // ===== Signup form =====
    this.heading = page.getByRole('heading', { name: 'Sign Up' });
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    // The email field has no <label>, only a placeholder, so getByRole cannot name it reliably.
    this.emailInput = page.getByPlaceholder('email@example.com');
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signUpButton = page.getByRole('button', { name: 'Sign Up' });

    // ===== Validation / server errors =====
    this.firstNameTooShortError = page.getByText('First name must be at least 2 characters long');
    this.lastNameTooShortError = page.getByText('Last name must be at least 2 characters long');
    this.invalidEmailError = page.getByText('Invalid email address');
    this.passwordRequiredError = page.getByText('Password is required');
    this.passwordTooShortError = page.getByText('Password must be at least 6 characters long');
    this.emailAlreadyExistsError = page.getByText('This email already exists');
  }
}
