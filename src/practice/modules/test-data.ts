/**
 * DAY 2 - Exercise 8b: Module — Test Data
 *
 * This file imports types from types.ts and exports test data.
 *
 * Java equivalent:
 *   import com.framework.types.TestUser;
 *   public class TestData {
 *       public static final TestUser STANDARD_USER = new TestUser(...);
 *   }
 */

// IMPORT from another file — note the relative path with ./
// Java:  import com.framework.types.TestUser;
// TS:    import { TestUser } from './types';
import { Severity, TestEnvironment, TestUser } from "./types.js";
// NOTE: Use .js extension in imports even though the source file is .ts
// This is a TypeScript/Node.js convention when using NodeNext module resolution

// ============================================================
// Named exports for test users
// ============================================================

export const STANDARD_USER: TestUser = {
  username: "standard_user",
  password: "secret_sauce",
  role: "standard",
  expectedOutcome: "success",
};

export const LOCKED_USER: TestUser = {
  username: "locked_out_user",
  password: "secret_sauce",
  role: "locked",
  expectedOutcome: "error",
  errorMessage: "Epic sadface: Sorry, this user has been locked out.",
};

export const PROBLEM_USER: TestUser = {
  username: "problem_user",
  password: "secret_sauce",
  role: "problem",
  expectedOutcome: "success",
};

export const INVALID_USER: TestUser = {
  username: "invalid_user",
  password: "wrong_password",
  role: "standard",
  expectedOutcome: "error",
  errorMessage:
    "Epic sadface: Username and password do not match any user in this service",
};

// Export an array of all users:
export const ALL_USERS: TestUser[] = [
  STANDARD_USER,
  LOCKED_USER,
  PROBLEM_USER,
  INVALID_USER,
];

// ============================================================
// Named exports for environments
// ============================================================

export const DEV_ENV: TestEnvironment = {
  name: "Development",
  baseUrl: "https://www.saucedemo.com",
  apiUrl: "https://reqres.in/api",
  timeout: 30000,
};

export const QA_ENV: TestEnvironment = {
  name: "QA",
  baseUrl: "https://qa.saucedemo.com",
  apiUrl: "https://qa-api.example.com",
  timeout: 60000,
};

// ============================================================
// DEFAULT export — one per file (like Java's public class per file)
// ============================================================

// A module can have ONE default export (plus any number of named exports).
// Default exports are imported without curly braces.

// Java:  public class TestDataFactory { ... } // one public class per file
// TS:    export default class TestDataFactory { ... }

export default class TestDataFactory {
  static createUser(overrides: Partial<TestUser> = {}): TestUser {
    return {
      ...STANDARD_USER, // spread the defaults
      ...overrides, // override with provided values
    };
  }

  static getUsersByOutcome(outcome: "success" | "error"): TestUser[] {
    return ALL_USERS.filter((user) => user.expectedOutcome === outcome);
  }

  static getTestSeverity(testName: string): Severity {
    if (testName.toLowerCase().includes("login")) return Severity.CRITICAL;
    if (testName.toLowerCase().includes("checkout")) return Severity.HIGH;
    return Severity.MEDIUM;
  }
}
