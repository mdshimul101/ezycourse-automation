import type { Locator, Page } from '@playwright/test';
import type { NewStudent } from '@data/students';

export class SignupPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Sign Up' });
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    // The email field has no <label>, only a placeholder, so getByRole cannot name it reliably.
    this.emailInput = page.getByPlaceholder('email@example.com');
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signUpButton = page.getByRole('button', { name: 'Sign Up' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/en/signup');
  }

  async signup(student: NewStudent): Promise<void> {
    await this.firstNameInput.fill(student.firstName);
    await this.lastNameInput.fill(student.lastName);
    await this.emailInput.fill(student.email);
    await this.passwordInput.fill(student.password);
    await this.signUpButton.click();
  }
}
