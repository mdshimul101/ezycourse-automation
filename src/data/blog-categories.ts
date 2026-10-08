import { uniqueName } from '@utils/random';

/** The blog category form requires a short description; tests that do not care about it use this one. */
export const BLOG_CATEGORY_DESCRIPTION = 'Created by automation';

/** A fresh blog category name for each test, so tests never collide or touch real categories. */
export function buildBlogCategoryName(): string {
  return uniqueName('Auto Blog Category');
}
