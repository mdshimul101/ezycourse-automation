import type { Page } from '@playwright/test';
import type { NewStudent } from '@data/students';
import { SignupLocator } from '@pages/signup/locators/signup.locator';

export class SignupController {
  private readonly locator: SignupLocator;

  constructor(private readonly page: Page) {
    this.locator = new SignupLocator(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('/en/signup');
  }

  async signup(student: NewStudent): Promise<void> {
    await this.locator.firstNameInput.fill(student.firstName);
    await this.locator.lastNameInput.fill(student.lastName);
    await this.locator.emailInput.fill(student.email);
    await this.locator.passwordInput.fill(student.password);
    await this.submit();
  }

  async submit(): Promise<void> {
    await this.locator.signUpButton.click();
  }
}
