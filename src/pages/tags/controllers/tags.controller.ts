import type { Page } from '@playwright/test';
import { TagsLocator } from '@pages/tags/locators/tags.locator';

export class TagsController {
  private readonly locator: TagsLocator;

  constructor(private readonly page: Page) {
    this.locator = new TagsLocator(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('/dashboard/tags', { waitUntil: 'domcontentloaded' });
    await this.locator.heading.waitFor();
  }

  async create(name: string): Promise<void> {
    await this.locator.addTagButton.click();
    await this.locator.createDialogNameInput.fill(name);
    await this.locator.createDialogCreateButton.click();
  }

  async rename(currentName: string, newName: string): Promise<void> {
    await this.locator.rowButton(currentName, 'Edit').click();
    await this.locator.updateDialogNameInput.fill(newName);
    await this.locator.updateDialogUpdateButton.click();
  }

  async delete(name: string): Promise<void> {
    await this.locator.rowButton(name, 'Delete').click();
    await this.locator.deleteConfirmButton.click();
  }

  /** Cleanup helper: deletes the tag if it exists, does nothing otherwise. */
  async deleteIfExists(name: string): Promise<void> {
    await this.goto();
    const exists = await this.locator.row(name).waitFor({ timeout: 5000 }).then(() => true, () => false);
    if (exists) {
      await this.delete(name);
      await this.locator.row(name).waitFor({ state: 'detached' });
    }
  }
}
