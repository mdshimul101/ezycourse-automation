import type { Locator, Page } from '@playwright/test';

export class BlogCategoriesLocator {
  // ===== Blog categories list (/dashboard/blogs/categories) =====
  readonly heading: Locator;
  readonly addCategoryButton: Locator;

  // ===== Dialogs =====
  readonly addDialog: Locator;
  readonly addDialogNameInput: Locator;
  readonly addDialogDescriptionInput: Locator;
  readonly addDialogCreateButton: Locator;
  readonly editDialog: Locator;
  readonly editDialogNameInput: Locator;
  readonly editDialogUpdateButton: Locator;
  readonly deleteConfirmDialog: Locator;
  readonly deleteConfirmButton: Locator;

  // ===== Validation / toasts =====
  readonly descriptionRequiredError: Locator;
  readonly createdToast: Locator;
  readonly updatedToast: Locator;
  readonly deletedToast: Locator;

  constructor(private readonly page: Page) {
    // ===== Blog categories list =====
    this.heading = page.getByRole('heading', { name: 'Categories', level: 1 });
    this.addCategoryButton = page.getByRole('button', { name: 'Add Category' });

    // ===== Dialogs =====
    this.addDialog = page.getByRole('dialog', { name: 'ADD A CATEGORY' });
    this.addDialogNameInput = this.addDialog.getByRole('textbox', { name: 'Category Name' });
    this.addDialogDescriptionInput = this.addDialog.getByRole('textbox', { name: 'Short description' });
    this.addDialogCreateButton = this.addDialog.getByRole('button', { name: 'Create' });
    this.editDialog = page.getByRole('dialog', { name: 'EDIT CATEGORY' });
    this.editDialogNameInput = this.editDialog.getByRole('textbox', { name: 'Category Name' });
    this.editDialogUpdateButton = this.editDialog.getByRole('button', { name: 'Update' });
    this.deleteConfirmDialog = page.getByRole('dialog').filter({ hasText: 'Are you sure?' });
    this.deleteConfirmButton = this.deleteConfirmDialog.getByRole('button', { name: 'Delete' });

    // ===== Validation / toasts =====
    this.descriptionRequiredError = page.getByText('Please enter a short description!');
    this.createdToast = page.getByText('Category created successfully');
    this.updatedToast = page.getByText('Category updated successfully');
    this.deletedToast = page.getByText('1 category deleted');
  }

  /** The table row whose "Name" cell is exactly `name`. */
  row(name: string): Locator {
    return this.page.getByRole('row').filter({
      has: this.page.getByRole('cell', { name, exact: true }),
    });
  }

  /** The "⋮" actions trigger of a row. It has no accessible name, so CSS is the only stable option here. */
  rowActionsTrigger(name: string): Locator {
    return this.row(name).locator('.ant-dropdown-trigger');
  }

  menuItem(action: 'Edit' | 'Delete'): Locator {
    return this.page.getByRole('menuitem', { name: action });
  }
}
