import { test, expect } from '@fixtures';
import { buildBlogCategoryName } from '@data/blog-categories';

test.describe('Blog categories', { tag: ['@admin', '@blog-categories'] }, () => {
  test.beforeEach(async ({ blogCategoriesController }) => {
    await blogCategoriesController.goto();
  });

  test('TC_BLOGCAT_01: admin can create a blog category', async ({
    blogCategoriesController,
    blogCategoriesLocator,
    cleanupBlogCategory,
  }) => {
    const categoryName = buildBlogCategoryName();
    cleanupBlogCategory(categoryName);

    await blogCategoriesController.create(categoryName);

    await expect(blogCategoriesLocator.createdToast).toBeVisible();
    await expect(blogCategoriesLocator.addDialog).toBeHidden();
    await expect(blogCategoriesLocator.row(categoryName)).toBeVisible();
  });

  test('TC_BLOGCAT_02: admin can rename a blog category', async ({
    blogCategoriesController,
    blogCategoriesLocator,
    cleanupBlogCategory,
  }) => {
    const originalName = buildBlogCategoryName();
    const newName = `${originalName} Renamed`;
    // Register both names: whichever exists after the test gets deleted.
    cleanupBlogCategory(originalName);
    cleanupBlogCategory(newName);
    await blogCategoriesController.create(originalName);
    await expect(blogCategoriesLocator.row(originalName)).toBeVisible();

    await blogCategoriesController.rename(originalName, newName);

    await expect(blogCategoriesLocator.updatedToast).toBeVisible();
    await expect(blogCategoriesLocator.row(newName)).toBeVisible();
    await expect(blogCategoriesLocator.row(originalName)).toHaveCount(0);
  });

  test('TC_BLOGCAT_03: admin can delete a blog category', async ({
    blogCategoriesController,
    blogCategoriesLocator,
    cleanupBlogCategory,
  }) => {
    const categoryName = buildBlogCategoryName();
    cleanupBlogCategory(categoryName);
    await blogCategoriesController.create(categoryName);
    await expect(blogCategoriesLocator.row(categoryName)).toBeVisible();

    await blogCategoriesController.delete(categoryName);

    await expect(blogCategoriesLocator.deletedToast).toBeVisible();
    await expect(blogCategoriesLocator.row(categoryName)).toHaveCount(0);
  });

  test('TC_BLOGCAT_04: short description is required', async ({
    blogCategoriesController,
    blogCategoriesLocator,
    cleanupBlogCategory,
  }) => {
    const categoryName = buildBlogCategoryName();
    // Nothing should be created; registered anyway so a regression does not leave data behind.
    cleanupBlogCategory(categoryName);

    await blogCategoriesController.create(categoryName, '');

    await expect(blogCategoriesLocator.descriptionRequiredError).toBeVisible();
    await expect(blogCategoriesLocator.addDialog).toBeVisible();
  });
});
