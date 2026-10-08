import type { Page } from '@playwright/test';
import { BLOG_CATEGORY_DESCRIPTION } from '@data/blog-categories';
import { BlogCategoriesLocator } from '@pages/blog-categories/locators/blog-categories.locator';

export class BlogCategoriesController {
  private readonly locator: BlogCategoriesLocator;

  constructor(private readonly page: Page) {
    this.locator = new BlogCategoriesLocator(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('/dashboard/blogs/categories', { waitUntil: 'domcontentloaded' });
    await this.locator.heading.waitFor();
  }

  /** The short description is required by the form, so it defaults to a fixed test text. */
  async create(name: string, description = BLOG_CATEGORY_DESCRIPTION): Promise<void> {
    await this.locator.addCategoryButton.click();
    await this.locator.addDialogNameInput.fill(name);
    await this.locator.addDialogDescriptionInput.fill(description);
    await this.locator.addDialogCreateButton.click();
  }

  async rename(currentName: string, newName: string): Promise<void> {
    await this.openActions(currentName, 'Edit');
    await this.locator.editDialogNameInput.fill(newName);
    await this.locator.editDialogUpdateButton.click();
  }

  async delete(name: string): Promise<void> {
    await this.openActions(name, 'Delete');
    await this.locator.deleteConfirmButton.click();
  }

  /** Cleanup helper: deletes the category if it exists, does nothing otherwise. */
  async deleteIfExists(name: string): Promise<void> {
    await this.goto();
    const exists = await this.locator.row(name).waitFor({ timeout: 5000 }).then(() => true, () => false);
    if (exists) {
      await this.delete(name);
      await this.locator.row(name).waitFor({ state: 'detached' });
    }
  }

  private async openActions(name: string, action: 'Edit' | 'Delete'): Promise<void> {
    await this.locator.rowActionsTrigger(name).click();
    await this.locator.menuItem(action).click();
  }
}
