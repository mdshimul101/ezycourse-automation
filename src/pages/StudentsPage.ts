import type { Locator, Page } from '@playwright/test';

export class StudentsPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly searchBox: Locator;
  readonly table: Locator;
  readonly deleteDialog: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Students', level: 1 });
    this.searchBox = page.getByRole('textbox', { name: 'Student name or email' });
    this.table = page.getByRole('table');
    this.deleteDialog = page.getByRole('dialog', { name: 'Are you sure?' });
  }

  async goto(): Promise<void> {
    // The admin dashboard keeps loading widgets long after it is usable, so we wait for
    // the HTML only and then for the element we need, instead of the full "load" event.
    await this.page.goto('/dashboard/students', { waitUntil: 'domcontentloaded' });
    await this.searchBox.waitFor();
  }

  async search(text: string): Promise<void> {
    await this.searchBox.fill(text);
    await this.searchBox.press('Enter');
  }

  /** The table row for the student with this email. */
  row(email: string): Locator {
    return this.page.getByRole('row').filter({ hasText: email });
  }

  /** Permanently deletes a student. Only ever use this on test students. */
  async deletePermanently(email: string): Promise<void> {
    await this.row(email).getByRole('button', { name: 'More' }).click();
    await this.page.getByRole('menuitem', { name: 'Delete User' }).click();
    await this.deleteDialog.getByRole('radio', { name: 'Permanent Delete' }).check();
    await this.deleteDialog.getByRole('button', { name: 'Delete' }).click();
  }

  /** Cleanup helper: permanently deletes the student if they exist, does nothing otherwise. */
  async deleteIfExists(email: string): Promise<void> {
    await this.goto();
    await this.search(email);
    const exists = await this.row(email).waitFor({ timeout: 5000 }).then(() => true, () => false);
    if (exists) {
      await this.deletePermanently(email);
      await this.row(email).waitFor({ state: 'detached' });
    }
  }
}
