import type { Locator, Page } from '@playwright/test';

export class StudentsLocator {
  // ===== Students list (/dashboard/students) =====
  readonly heading: Locator;
  readonly searchBox: Locator;
  readonly table: Locator;

  // ===== Delete flow =====
  readonly deleteUserMenuItem: Locator;
  readonly deleteDialog: Locator;
  readonly permanentDeleteRadio: Locator;
  readonly deleteDialogConfirmButton: Locator;

  // ===== Toasts =====
  readonly deletedPermanentlyToast: Locator;

  constructor(private readonly page: Page) {
    // ===== Students list =====
    this.heading = page.getByRole('heading', { name: 'Students', level: 1 });
    this.searchBox = page.getByRole('textbox', { name: 'Student name or email' });
    this.table = page.getByRole('table');

    // ===== Delete flow =====
    this.deleteUserMenuItem = page.getByRole('menuitem', { name: 'Delete User' });
    this.deleteDialog = page.getByRole('dialog', { name: 'Are you sure?' });
    this.permanentDeleteRadio = this.deleteDialog.getByRole('radio', { name: 'Permanent Delete' });
    this.deleteDialogConfirmButton = this.deleteDialog.getByRole('button', { name: 'Delete' });

    // ===== Toasts =====
    this.deletedPermanentlyToast = page.getByText('Account Deleted Permanently');
  }

  /** The table row for the student with this email. */
  row(email: string): Locator {
    return this.page.getByRole('row').filter({ hasText: email });
  }

  rowMoreButton(email: string): Locator {
    return this.row(email).getByRole('button', { name: 'More' });
  }
}
