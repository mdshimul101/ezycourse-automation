import { test, expect } from '@fixtures';

test.describe('Students', { tag: ['@admin', '@students'] }, () => {
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
