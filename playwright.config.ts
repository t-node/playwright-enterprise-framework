/**
 * Playwright Configuration — Production Grade
 *
 * This config is designed for enterprise scale:
 * - Multi-browser testing (Chromium, Firefox, WebKit)
 * - CI-aware settings (retries, workers, reporters)
 * - Environment-based baseURL
 * - Screenshot/video/trace on failure only (saves disk space)
 * - Organized output directories
 *
 * Equivalent to your Selenium Grid + TestNG XML + Maven Surefire config
 * — but in ONE file.
 */

import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables.
 * In a real project, you'd use dotenv here:
 *   import dotenv from 'dotenv';
 *   dotenv.config({ path: `.env.${process.env.TEST_ENV || 'dev'}` });
 */

// Determine if we're running in CI (GitHub Actions, Jenkins, etc.)
const isCI = !!process.env.CI;

export default defineConfig({
  // ========================================
  // TEST DISCOVERY
  // ========================================

  // Where to find test files (relative to this config file)
  testDir: "./tests",

  // Pattern to match test files
  // Default: **/*.spec.ts — you can customize this
  testMatch: "**/*.spec.ts",

  // ========================================
  // EXECUTION SETTINGS
  // ========================================

  // Run tests within each file in parallel
  // Set to true for maximum speed (each test is independent)
  fullyParallel: true,

  // Fail the build if you accidentally left test.only in the source code
  // CRITICAL for CI — prevents accidentally running only one test
  forbidOnly: isCI,

  // Retry failed tests
  // CI: retry twice to handle transient failures
  // Local: no retries — you want to see failures immediately
  retries: isCI ? 2 : 0,

  // Number of parallel worker processes
  // CI: limit to conserve resources (GitHub Actions runners have 2 CPUs)
  // Local: undefined = use reasonable default based on CPU cores
  workers: isCI ? 2 : undefined,

  // Maximum time a single test can run (milliseconds)
  // 30 seconds is generous for UI tests — most should finish in 10-15s
  timeout: 30_000,

  // ========================================
  // REPORTING
  // ========================================

  // Configure reporters based on environment
  reporter: isCI
    ? [
        // CI: blob for shard merging + GitHub annotations
        ["blob"],
        ["github"],
      ]
    : [
        // Local: list output in terminal + HTML report
        ["list"],
        ["html", { open: "never" }], // don't auto-open browser
      ],

  // ========================================
  // SHARED SETTINGS FOR ALL PROJECTS
  // ========================================

  // These settings apply to ALL browser projects below
  use: {
    // Base URL — allows you to use relative URLs in tests:
    //   await page.goto('/login')  instead of  await page.goto('https://www.saucedemo.com/login')
    baseURL: process.env.BASE_URL || "https://www.saucedemo.com",

    // Assertion timeout — how long expect() waits before failing
    // Separate from the global test timeout
    // Java comparison: This is like Selenium's implicit wait, but ONLY for assertions
    actionTimeout: 10_000,

    // ---- ARTIFACT CAPTURE (screenshots, videos, traces) ----

    // Screenshots: only capture when a test fails (saves disk space)
    screenshot: "only-on-failure",

    // Video: only keep recordings of failed tests
    video: "retain-on-failure",

    // Trace: capture on first retry only (traces are large but invaluable for debugging)
    // The trace viewer is Playwright's KILLER feature — it's a time-travel debugger
    trace: "on-first-retry",

    // ---- NAVIGATION ----

    // Extra HTTP headers sent with every request (useful for auth tokens, custom headers)
    // extraHTTPHeaders: {
    //   'X-Test-Framework': 'playwright-enterprise',
    // },
  },

  // ========================================
  // BROWSER PROJECTS
  // ========================================

  // Each "project" is a separate browser configuration
  // Tests run against ALL projects by default (cross-browser testing)
  // Java comparison: This replaces your Selenium Grid browser matrix

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // You can override shared settings per-project:
        // viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },

    // MOBILE PROJECTS (uncomment when you reach Day 33):
    // {
    //   name: 'mobile-chrome',
    //   use: {
    //     ...devices['Pixel 7'],
    //   },
    // },
    // {
    //   name: 'mobile-safari',
    //   use: {
    //     ...devices['iPhone 13'],
    //   },
    // },
  ],

  // ========================================
  // OUTPUT DIRECTORIES
  // ========================================

  // Where test artifacts (screenshots, videos, traces) are stored
  outputDir: "./test-results",

  // ========================================
  // EXPECT CONFIGURATION
  // ========================================

  expect: {
    // Maximum time expect() will wait for a condition to be met
    timeout: 5_000,

    // Visual comparison settings (for toHaveScreenshot — Day 31)
    toHaveScreenshot: {
      maxDiffPixels: 100,
    },
  },
});
