import 'dotenv/config';
// Relative import: playwright.config.ts loads this file too, before path aliases apply.
import { requireEnv } from '../utils/env';

export interface Credentials {
  email: string;
  password: string;
}

/**
 * Every setting the tests need, in one place. Values come from .env (locally) or CI variables/secrets.
 * Credentials are getters, so a test that never logs in does not fail just because they are missing.
 */
export const globalConfig = {
  get baseUrl(): string {
    return requireEnv('BASE_URL');
  },

  get admin(): Credentials {
    return {
      email: requireEnv('TEST_USER_EMAIL'),
      password: requireEnv('TEST_USER_PASSWORD'),
    };
  },

  /** Saved logged-in sessions. Git-ignored: they work like passwords. */
  storageStatePath: {
    admin: 'playwright/.auth/admin.json',
  },
};
