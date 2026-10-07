import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';
import { requireEnv } from './src/utils/env';
import { ADMIN_STORAGE_STATE } from './src/utils/paths';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['github'], ['list'], ['html', { open: 'never' }]] : 'html',

  use: {
    baseURL: requireEnv('BASE_URL'),
    // Record every test, keep the recording only when it fails, so a random failure always leaves evidence.
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    // 1. Logs in once and saves the admin session to a file.
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    // 2. Tests for visitors who are NOT logged in (login page, signup...).
    {
      name: 'guest',
      testMatch: /e2e\/(?!admin\/).*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    // 3. Admin tests start already logged in, by loading the saved session.
    {
      name: 'admin',
      testMatch: /e2e\/admin\/.*\.spec\.ts/,
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'], storageState: ADMIN_STORAGE_STATE },
    },
  ],
});
