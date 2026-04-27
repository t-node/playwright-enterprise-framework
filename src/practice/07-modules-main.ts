import Logger, { LogLevel } from "./modules/logger.js";
import TestDataFactory from "./modules/test-data.js";
import { ALL_USERS, DEV_ENV, STANDARD_USER } from "./modules/test-data.ts";
import {
  BrowserType,
  SUPPORTED_BROWSERS,
  TestEnvironment,
  TestUser,
} from "./modules/types.ts";

const main = async (): Promise<void> => {
  const logger = Logger.getInstance(LogLevel.DEBUG);
  logger.info("===Day 2 Module Exercise===");
  logger.step("Using TestUser Interface");
  const user: TestUser = STANDARD_USER;
  console.log(
    `User: ${user.username}, Role: ${user.role}, Password: ${user.password}`,
  );
  logger.step("Listing all test users");
  ALL_USERS.forEach((u) => {
    const icon = u.expectedOutcome === "success" ? "true" : "false";
    console.log(
      `  ${icon} ${u.username} (${u.role}) → expects ${u.expectedOutcome}`,
    );
  });

  logger.step("Creating custom users with TestDataFactory");

  const customUser = TestDataFactory.createUser({
    username: "hello",
    role: "admin",
  });

  const errorUsers = TestDataFactory.getUsersByOutcome("success");
  console.log(
    `  Users expecting errors: ${errorUsers.map((u) => u.username).join(",")}`,
  );
  logger.step("Test Severity classification");
  const tests = ["Login Validation", "Checkout Flow", "Product Sort"];
  tests.forEach((testName) => {
    const severity = TestDataFactory.getTestSeverity(testName);
    console.log(` ${testName} -> ${severity}`);
  });
  logger.step("Browser configuration");
  const env: TestEnvironment = DEV_ENV;
  console.log(`  Environment: ${env.name}`);
  console.log(` Base Url: ${env.baseUrl}`);

  logger.step("Browser configuration");
  const primaryBrowser: BrowserType = "chromium";
  console.log(`  Primary: ${primaryBrowser}`);
  console.log(`  Supported: ${SUPPORTED_BROWSERS.join(", ")}`);
};
