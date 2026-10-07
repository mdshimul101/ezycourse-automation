import { test, expect } from '@fixtures';

test.describe('Students', { tag: ['@admin', '@students'] }, () => {
  test('a student who signs up appears in the admin students list', async ({ signedUpStudent, studentsPage }) => {
    await studentsPage.goto();
    await studentsPage.search(signedUpStudent.email);

    const row = studentsPage.row(signedUpStudent.email);
    await expect(row).toBeVisible();
    await expect(row).toContainText(`${signedUpStudent.firstName} ${signedUpStudent.lastName}`);
  });

  test('admin can permanently delete a student', async ({ signedUpStudent, studentsPage, page }) => {
    await studentsPage.goto();
    await studentsPage.search(signedUpStudent.email);
    await expect(studentsPage.row(signedUpStudent.email)).toBeVisible();

    await studentsPage.deletePermanently(signedUpStudent.email);

    await expect(page.getByText('Account Deleted Permanently')).toBeVisible();
    await expect(studentsPage.row(signedUpStudent.email)).toHaveCount(0);

    // Searching again proves the student is gone on the server, not just hidden in the table.
    await studentsPage.search(signedUpStudent.email);
    await expect(studentsPage.table).toContainText('No Data');
  });
});
