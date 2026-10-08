import type { Credentials } from '@configs/global-config';

/**
 * A fake account for negative tests. Safe to hardcode: it does not exist.
 * The real admin account lives in `globalConfig.admin` (read from .env / CI secrets).
 */
export const invalidUser: Credentials = {
  email: 'not-a-real-user@example.com',
  password: 'wrong-password',
};
