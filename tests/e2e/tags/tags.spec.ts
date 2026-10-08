import { test, expect } from '@fixtures';
import { buildTagName } from '@data/tags';

test.describe('Tags', { tag: ['@admin', '@tags'] }, () => {
  test.beforeEach(async ({ tagsController }) => {
    await tagsController.goto();
  });

  test('TC_TAG_01: admin can create a tag', async ({ tagsController, tagsLocator, cleanupTag }) => {
    const tagName = buildTagName();
    cleanupTag(tagName);

    await tagsController.create(tagName);

    await expect(tagsLocator.createdToast).toBeVisible();
    await expect(tagsLocator.createDialog).toBeHidden();
    await expect(tagsLocator.row(tagName)).toBeVisible();
  });

  test('TC_TAG_02: admin can rename a tag', async ({ tagsController, tagsLocator, cleanupTag }) => {
    const originalName = buildTagName();
    const newName = `${originalName} Renamed`;
    // Register both names: whichever exists after the test gets deleted.
    cleanupTag(originalName);
    cleanupTag(newName);
    await tagsController.create(originalName);
    await expect(tagsLocator.row(originalName)).toBeVisible();

    await tagsController.rename(originalName, newName);

    await expect(tagsLocator.updatedToast).toBeVisible();
    await expect(tagsLocator.row(newName)).toBeVisible();
    await expect(tagsLocator.row(originalName)).toHaveCount(0);
  });

  test('TC_TAG_03: admin can delete a tag', async ({ tagsController, tagsLocator, cleanupTag }) => {
    const tagName = buildTagName();
    cleanupTag(tagName);
    await tagsController.create(tagName);
    await expect(tagsLocator.row(tagName)).toBeVisible();

    await tagsController.delete(tagName);

    await expect(tagsLocator.deletedToast).toBeVisible();
    await expect(tagsLocator.row(tagName)).toHaveCount(0);
  });
});
