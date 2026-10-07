import { uniqueName } from '@utils/random';

/** A fresh category name for each test, so tests never collide or touch real categories. */
export function buildCategoryName(): string {
  return uniqueName('Auto Category');
}
