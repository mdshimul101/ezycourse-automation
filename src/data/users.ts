import { requireEnv } from '@utils/env';

export interface User {
  email: string;
  password: string;
}

/** The real test account. Values come from .env (locally) or CI secrets — never hardcoded. */
export function getAdminUser(): User {
  return {
    email: requireEnv('TEST_USER_EMAIL'),
    password: requireEnv('TEST_USER_PASSWORD'),
  };
}

/** A fake account for negative tests. Safe to hardcode: it does not exist. */
export const invalidUser: User = {
  email: 'not-a-real-user@example.com',
  password: 'wrong-password',
};
