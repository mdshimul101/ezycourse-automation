import type { Locator, Page } from '@playwright/test';

export class CourseCategoriesLocator {
  // ===== Categories list (/dashboard/category) =====
  readonly heading: Locator;
  readonly addCategoryButton: Locator;

  // ===== Dialogs =====
  readonly addDialog: Locator;
  readonly addDialogNameInput: Locator;
  readonly addDialogCreateButton: Locator;
  readonly editDialog: Locator;
  readonly editDialogNameInput: Locator;
  readonly editDialogUpdateButton: Locator;
  readonly deleteConfirmDialog: Locator;
  readonly deleteConfirmButton: Locator;

  // ===== Toasts =====
  readonly addedToast: Locator;
  readonly updatedToast: Locator;
  readonly deletedToast: Locator;

  constructor(private readonly page: Page) {
    // ===== Categories list =====
    this.heading = page.getByRole('heading', { name: 'Course Categories' });
    this.addCategoryButton = page.getByRole('button', { name: 'Add Category' });

    // ===== Dialogs =====
    this.addDialog = page.getByRole('dialog', { name: 'ADD A CATEGORY' });
    this.addDialogNameInput = this.addDialog.getByRole('textbox', { name: 'Name' });
    this.addDialogCreateButton = this.addDialog.getByRole('button', { name: 'Create' });
    this.editDialog = page.getByRole('dialog', { name: 'EDIT CATEGORY' });
    this.editDialogNameInput = this.editDialog.getByRole('textbox', { name: 'Name' });
    this.editDialogUpdateButton = this.editDialog.getByRole('button', { name: 'Update' });
    this.deleteConfirmDialog = page.getByRole('dialog').filter({ hasText: 'Are you sure?' });
    this.deleteConfirmButton = this.deleteConfirmDialog.getByRole('button', { name: 'Delete' });

    // ===== Toasts =====
    this.addedToast = page.getByText('Category Added Successfully');
    this.updatedToast = page.getByText('Category Updated Successfully');
    this.deletedToast = page.getByText('1 category deleted');
  }

  /** The table row whose "Category name" cell is exactly `name`. */
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
