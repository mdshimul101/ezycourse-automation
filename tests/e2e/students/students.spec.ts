import { test, expect } from '@fixtures';

test.describe('Students', { tag: ['@admin', '@students'] }, () => {
  // Signing up and permanently deleting a student takes ~25s alone, and far longer when several
  // workers do it at once. Run these one after another, with room for the cleanup to finish.
  test.describe.configure({ mode: 'default', timeout: 90_000 });

  test('TC_STU_01: a student who signs up appears in the admin students list', async ({
    signedUpStudent,
    studentsController,
    studentsLocator,
  }) => {
    await studentsController.goto();
    await studentsController.search(signedUpStudent.email);

    const row = studentsLocator.row(signedUpStudent.email);
    await expect(row).toBeVisible();
    await expect(row).toContainText(`${signedUpStudent.firstName} ${signedUpStudent.lastName}`);
  });

  test('TC_STU_02: admin can permanently delete a student', async ({
    signedUpStudent,
    studentsController,
    studentsLocator,
  }) => {
    await studentsController.goto();
    await studentsController.search(signedUpStudent.email);
    await expect(studentsLocator.row(signedUpStudent.email)).toBeVisible();

    await studentsController.deletePermanently(signedUpStudent.email);

    await expect(studentsLocator.deletedPermanentlyToast).toBeVisible();
    await expect(studentsLocator.row(signedUpStudent.email)).toHaveCount(0);

    // Searching again proves the student is gone on the server, not just hidden in the table.
    await studentsController.search(signedUpStudent.email);
    await expect(studentsLocator.table).toContainText('No Data');
  });
});
