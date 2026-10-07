import { test, expect } from '@fixtures';
import { buildTagName } from '@data/tags';

test.describe('Tags', { tag: ['@admin', '@tags'] }, () => {
  test.beforeEach(async ({ tagsPage }) => {
    await tagsPage.goto();
  });

  test('admin can create a tag', async ({ tagsPage, cleanupTag, page }) => {
    const tagName = buildTagName();
    cleanupTag(tagName);

    await tagsPage.create(tagName);

    await expect(page.getByText('Tag created successfully')).toBeVisible();
    await expect(tagsPage.createDialog).toBeHidden();
    await expect(tagsPage.row(tagName)).toBeVisible();
  });

  test('admin can rename a tag', async ({ tagsPage, cleanupTag, page }) => {
    const originalName = buildTagName();
    const newName = `${originalName} Renamed`;
    // Register both names: whichever exists after the test gets deleted.
    cleanupTag(originalName);
    cleanupTag(newName);
    await tagsPage.create(originalName);
    await expect(tagsPage.row(originalName)).toBeVisible();

    await tagsPage.rename(originalName, newName);

    await expect(page.getByText('Tag updated successfully')).toBeVisible();
    await expect(tagsPage.row(newName)).toBeVisible();
    await expect(tagsPage.row(originalName)).toHaveCount(0);
  });

  test('admin can delete a tag', async ({ tagsPage, cleanupTag, page }) => {
    const tagName = buildTagName();
    cleanupTag(tagName);
    await tagsPage.create(tagName);
    await expect(tagsPage.row(tagName)).toBeVisible();

    await tagsPage.delete(tagName);

    await expect(page.getByText('Tag Deleted successfully')).toBeVisible();
    await expect(tagsPage.row(tagName)).toHaveCount(0);
  });
});
