import type { Locator, Page } from '@playwright/test';

export class TagsPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly addTagButton: Locator;
  readonly createDialog: Locator;
  readonly updateDialog: Locator;
  readonly deleteConfirmDialog: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'All Tags' });
    this.addTagButton = page.getByRole('button', { name: 'Add Tag' });
    this.createDialog = page.getByRole('dialog', { name: 'CREATE NEW TAG' });
    this.updateDialog = page.getByRole('dialog', { name: 'UPDATE TAG' });
    this.deleteConfirmDialog = page.getByRole('dialog').filter({ hasText: 'Are you sure you want to delete this tag' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/dashboard/tags', { waitUntil: 'domcontentloaded' });
    await this.heading.waitFor();
  }

  /** The table row whose "Tag Name" cell is exactly `name`. */
  row(name: string): Locator {
    return this.page.getByRole('row').filter({
      has: this.page.getByRole('cell', { name, exact: true }),
    });
  }

  async create(name: string): Promise<void> {
    await this.addTagButton.click();
    await this.createDialog.getByRole('textbox', { name: 'Tag Name' }).fill(name);
    await this.createDialog.getByRole('button', { name: 'Create' }).click();
  }

  async rename(currentName: string, newName: string): Promise<void> {
    await this.row(currentName).getByRole('button', { name: 'Edit' }).click();
    // The update dialog's textbox has no label, but it is the only textbox in the dialog.
    await this.updateDialog.getByRole('textbox').fill(newName);
    await this.updateDialog.getByRole('button', { name: 'Update' }).click();
  }

  async delete(name: string): Promise<void> {
    await this.row(name).getByRole('button', { name: 'Delete' }).click();
    await this.deleteConfirmDialog.getByRole('button', { name: 'Delete' }).click();
  }

  /** Cleanup helper: deletes the tag if it exists, does nothing otherwise. */
  async deleteIfExists(name: string): Promise<void> {
    await this.goto();
    const exists = await this.row(name).waitFor({ timeout: 5000 }).then(() => true, () => false);
    if (exists) {
      await this.delete(name);
      await this.row(name).waitFor({ state: 'detached' });
    }
  }
}
