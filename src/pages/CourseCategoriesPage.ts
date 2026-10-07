import type { Locator, Page } from '@playwright/test';

export class CourseCategoriesPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly addCategoryButton: Locator;
  readonly addDialog: Locator;
  readonly editDialog: Locator;
  readonly deleteConfirmDialog: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Course Categories' });
    this.addCategoryButton = page.getByRole('button', { name: 'Add Category' });
    this.addDialog = page.getByRole('dialog', { name: 'ADD A CATEGORY' });
    this.editDialog = page.getByRole('dialog', { name: 'EDIT CATEGORY' });
    this.deleteConfirmDialog = page.getByRole('dialog').filter({ hasText: 'Are you sure?' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/dashboard/category');
    await this.heading.waitFor();
  }

  /** The table row whose "Category name" cell is exactly `name`. */
  row(name: string): Locator {
    return this.page.getByRole('row').filter({
      has: this.page.getByRole('cell', { name, exact: true }),
    });
  }

  async create(name: string): Promise<void> {
    await this.addCategoryButton.click();
    await this.addDialog.getByRole('textbox', { name: 'Name' }).fill(name);
    await this.addDialog.getByRole('button', { name: 'Create' }).click();
  }

  async rename(currentName: string, newName: string): Promise<void> {
    await this.openActions(currentName, 'Edit');
    await this.editDialog.getByRole('textbox', { name: 'Name' }).fill(newName);
    await this.editDialog.getByRole('button', { name: 'Update' }).click();
  }

  async delete(name: string): Promise<void> {
    await this.openActions(name, 'Delete');
    await this.deleteConfirmDialog.getByRole('button', { name: 'Delete' }).click();
  }

  /** Cleanup helper: deletes the category if it exists, does nothing otherwise. */
  async deleteIfExists(name: string): Promise<void> {
    await this.goto();
    const exists = await this.row(name).waitFor({ timeout: 5000 }).then(() => true, () => false);
    if (exists) {
      await this.delete(name);
      await this.row(name).waitFor({ state: 'detached' });
    }
  }

  private async openActions(name: string, action: 'Edit' | 'Delete'): Promise<void> {
    // The "⋮" icon has no accessible name, so CSS is the only stable option here.
    await this.row(name).locator('.ant-dropdown-trigger').click();
    await this.page.getByRole('menuitem', { name: action }).click();
  }
}
