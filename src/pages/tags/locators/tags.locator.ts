import type { Locator, Page } from '@playwright/test';

export class TagsLocator {
  // ===== Tags list (/dashboard/tags) =====
  readonly heading: Locator;
  readonly addTagButton: Locator;

  // ===== Dialogs =====
  readonly createDialog: Locator;
  readonly createDialogNameInput: Locator;
  readonly createDialogCreateButton: Locator;
  readonly updateDialog: Locator;
  readonly updateDialogNameInput: Locator;
  readonly updateDialogUpdateButton: Locator;
  readonly deleteConfirmDialog: Locator;
  readonly deleteConfirmButton: Locator;

  // ===== Toasts =====
  readonly createdToast: Locator;
  readonly updatedToast: Locator;
  readonly deletedToast: Locator;

  constructor(private readonly page: Page) {
    // ===== Tags list =====
    this.heading = page.getByRole('heading', { name: 'All Tags' });
    this.addTagButton = page.getByRole('button', { name: 'Add Tag' });

    // ===== Dialogs =====
    this.createDialog = page.getByRole('dialog', { name: 'CREATE NEW TAG' });
    this.createDialogNameInput = this.createDialog.getByRole('textbox', { name: 'Tag Name' });
    this.createDialogCreateButton = this.createDialog.getByRole('button', { name: 'Create' });
    this.updateDialog = page.getByRole('dialog', { name: 'UPDATE TAG' });
    // The update dialog's textbox has no label, but it is the only textbox in the dialog.
    this.updateDialogNameInput = this.updateDialog.getByRole('textbox');
    this.updateDialogUpdateButton = this.updateDialog.getByRole('button', { name: 'Update' });
    this.deleteConfirmDialog = page.getByRole('dialog').filter({ hasText: 'Are you sure you want to delete this tag' });
    this.deleteConfirmButton = this.deleteConfirmDialog.getByRole('button', { name: 'Delete' });

    // ===== Toasts =====
    this.createdToast = page.getByText('Tag created successfully');
    this.updatedToast = page.getByText('Tag updated successfully');
    this.deletedToast = page.getByText('Tag Deleted successfully');
  }

  /** The table row whose "Tag Name" cell is exactly `name`. */
  row(name: string): Locator {
    return this.page.getByRole('row').filter({
      has: this.page.getByRole('cell', { name, exact: true }),
    });
  }

  rowButton(name: string, button: 'Edit' | 'Delete'): Locator {
    return this.row(name).getByRole('button', { name: button });
  }
}
