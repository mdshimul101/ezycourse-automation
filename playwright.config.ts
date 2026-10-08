import { defineConfig, devices } from '@playwright/test';
import { globalConfig } from './src/config/global-config';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['github'], ['list'], ['html', { open: 'never' }]] : 'html',

  use: {
    baseURL: globalConfig.baseUrl,
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
    // 2. Tests tagged @guest: visitors who are NOT logged in (login page, signup validation...).
    {
      name: 'guest',
      grep: /@guest/,
      use: { ...devices['Desktop Chrome'] },
    },
    // 3. Every other test starts already logged in as admin, by loading the saved session.
    {
      name: 'admin',
      grepInvert: /@guest/,
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'], storageState: globalConfig.storageStatePath.admin },
    },
  ],
});
