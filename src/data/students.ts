import { uniqueEmail } from '@utils/random';

export interface NewStudent {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * Builds a fresh, valid student for signup tests.
 * Pass `overrides` to change only what a test cares about, e.g. buildNewStudent({ password: '12' }).
 */
export function buildNewStudent(overrides: Partial<NewStudent> = {}): NewStudent {
  return {
    firstName: 'Auto',
    lastName: 'Student',
    email: uniqueEmail('auto.signup'),
    password: 'Test@12345',
    ...overrides,
  };
}
