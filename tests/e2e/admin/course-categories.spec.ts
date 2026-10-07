import { test, expect } from '@fixtures';
import { buildCategoryName } from '@data/categories';

test.describe('Course categories', { tag: ['@admin', '@categories'] }, () => {
  // The name of the category the current test created, so afterEach can clean it up.
  let categoryName: string | undefined;

  test.beforeEach(async ({ courseCategoriesPage }) => {
    await courseCategoriesPage.goto();
  });

  test.afterEach(async ({ courseCategoriesPage }) => {
    if (categoryName) {
      await courseCategoriesPage.deleteIfExists(categoryName);
      categoryName = undefined;
    }
  });

  test('admin can create a course category', async ({ courseCategoriesPage, page }) => {
    categoryName = buildCategoryName();

    await courseCategoriesPage.create(categoryName);

    await expect(page.getByText('Category Added Successfully')).toBeVisible();
    await expect(courseCategoriesPage.addDialog).toBeHidden();
    await expect(courseCategoriesPage.row(categoryName)).toBeVisible();
  });

  test('admin can rename a course category', async ({ courseCategoriesPage, page }) => {
    const originalName = buildCategoryName();
    const newName = `${originalName} Renamed`;
    categoryName = originalName;
    await courseCategoriesPage.create(originalName);
    await expect(courseCategoriesPage.row(originalName)).toBeVisible();

    await courseCategoriesPage.rename(originalName, newName);
    categoryName = newName;

    await expect(page.getByText('Category Updated Successfully')).toBeVisible();
    await expect(courseCategoriesPage.row(newName)).toBeVisible();
    await expect(courseCategoriesPage.row(originalName)).toHaveCount(0);
  });

  test('admin can delete a course category', async ({ courseCategoriesPage, page }) => {
    categoryName = buildCategoryName();
    await courseCategoriesPage.create(categoryName);
    await expect(courseCategoriesPage.row(categoryName)).toBeVisible();

    await courseCategoriesPage.delete(categoryName);

    await expect(page.getByText('1 category deleted')).toBeVisible();
    await expect(courseCategoriesPage.row(categoryName)).toHaveCount(0);
  });
});
