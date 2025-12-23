import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for accessibility testing
 *
 * This config is optimized for running axe-core accessibility tests
 * against the design system documentation site.
 */
export default defineConfig({
  testDir: "./tests/a11y",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use */
  reporter: [
    ["html", { open: "never" }],
    ["json", { outputFile: "test-results/a11y-results.json" }],
  ],
  /* Shared settings for all the projects below */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: "http://localhost:5173",
    /* Collect trace when retrying the failed test */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  /* Run local dev server before starting the tests */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,  // Always reuse existing server
    timeout: 120 * 1000,
  },
});

