import type { Page } from '@playwright/test';
import { StudentsLocator } from '@pages/students/locators/students.locator';

export class StudentsController {
  private readonly locator: StudentsLocator;

  constructor(private readonly page: Page) {
    this.locator = new StudentsLocator(page);
  }

  async goto(): Promise<void> {
    // The admin dashboard keeps loading widgets long after it is usable, so we wait for
    // the HTML only and then for the element we need, instead of the full "load" event.
    await this.page.goto('/dashboard/students', { waitUntil: 'domcontentloaded' });
    await this.locator.searchBox.waitFor();
  }

  async search(text: string): Promise<void> {
    await this.locator.searchBox.fill(text);
    await this.locator.searchBox.press('Enter');
  }

  /** Permanently deletes a student. Only ever use this on test students. */
  async deletePermanently(email: string): Promise<void> {
    await this.locator.rowMoreButton(email).click();
    await this.locator.deleteUserMenuItem.click();
    await this.locator.permanentDeleteRadio.check();
    await this.locator.deleteDialogConfirmButton.click();
  }

  /** Cleanup helper: permanently deletes the student if they exist, does nothing otherwise. */
  async deleteIfExists(email: string): Promise<void> {
    await this.goto();
    await this.search(email);
    const exists = await this.locator.row(email).waitFor({ timeout: 5000 }).then(() => true, () => false);
    if (exists) {
      await this.deletePermanently(email);
      await this.locator.row(email).waitFor({ state: 'detached' });
    }
  }
}
