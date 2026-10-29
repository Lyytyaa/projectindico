const { defineConfig, devices } = require('@playwright/test');
const ENV = require('./config/env');

module.exports = defineConfig({
  testDir: './tests',
  timeout: ENV.DEFAULT_TIMEOUT,
  expect: {
    timeout: 10000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['json', { outputFile: 'reports/test-results.json' }],
    ['./utils/markdownReporter.js'],
  ],
  outputDir: 'reports/test-artifacts',
  use: {
    baseURL: ENV.UI_BASE_URL,
    headless: ENV.HEADLESS,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

