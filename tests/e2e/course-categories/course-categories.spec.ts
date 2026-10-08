import { test, expect } from '@fixtures';
import { buildCategoryName } from '@data/categories';

test.describe('Course categories', { tag: ['@admin', '@categories'] }, () => {
  test.beforeEach(async ({ courseCategoriesController }) => {
    await courseCategoriesController.goto();
  });

  test('TC_CAT_01: admin can create a course category', async ({
    courseCategoriesController,
    courseCategoriesLocator,
    cleanupCategory,
  }) => {
    const categoryName = buildCategoryName();
    cleanupCategory(categoryName);

    await courseCategoriesController.create(categoryName);

    await expect(courseCategoriesLocator.addedToast).toBeVisible();
    await expect(courseCategoriesLocator.addDialog).toBeHidden();
    await expect(courseCategoriesLocator.row(categoryName)).toBeVisible();
  });

  test('TC_CAT_02: admin can rename a course category', async ({
    courseCategoriesController,
    courseCategoriesLocator,
    cleanupCategory,
  }) => {
    const originalName = buildCategoryName();
    const newName = `${originalName} Renamed`;
    // Register both names: whichever exists after the test gets deleted.
    cleanupCategory(originalName);
    cleanupCategory(newName);
    await courseCategoriesController.create(originalName);
    await expect(courseCategoriesLocator.row(originalName)).toBeVisible();

    await courseCategoriesController.rename(originalName, newName);

    await expect(courseCategoriesLocator.updatedToast).toBeVisible();
    await expect(courseCategoriesLocator.row(newName)).toBeVisible();
    await expect(courseCategoriesLocator.row(originalName)).toHaveCount(0);
  });

  test('TC_CAT_03: admin can delete a course category', async ({
    courseCategoriesController,
    courseCategoriesLocator,
    cleanupCategory,
  }) => {
    const categoryName = buildCategoryName();
    cleanupCategory(categoryName);
    await courseCategoriesController.create(categoryName);
    await expect(courseCategoriesLocator.row(categoryName)).toBeVisible();

    await courseCategoriesController.delete(categoryName);

    await expect(courseCategoriesLocator.deletedToast).toBeVisible();
    await expect(courseCategoriesLocator.row(categoryName)).toHaveCount(0);
  });
});
