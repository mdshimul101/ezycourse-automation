import { uniqueName } from '@utils/random';

/** A fresh tag name for each test, so tests never collide or touch real tags. */
export function buildTagName(): string {
  return uniqueName('Auto Tag');
}
