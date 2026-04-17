import { Severity, TestEnvironment, TestUser } from "./types.ts";

export const STAN_USER: TestUser = {
  username: "standard_user",
  password: "books",
  role: "standard",
  expectedOutcome: "success",
};

export const LOCKED_USER: TestUser = {
  username: "locked_out_user",
  password: "secret_sauce",
  role: "locked",
  expectedOutcome: "failure",
  errorMessage: "Epic sadface: Sorry, this user has been locked out.",
};

export const PROBLEM_USER: TestUser = {
  username: "problem_user",
  password: "secret_problem",
  role: "problem",
  expectedOutcome: "success",
};

export const INVALID_USER: TestUser = {
  username: "invalid_user",
  password: "secte_invalid",
  role: "admin",
  expectedOutcome: "failure",
};

export const ALLUSERS: TestUser[] = [PROBLEM_USER, INVALID_USER];

export const DEV_ENV: TestEnvironment = {
  name: "dev",
  baseUrl: "base",
  apiUrl: "api",
  timeout: 30,
};

export const QA_ENV: TestEnvironment = {
  name: "QA",
  baseUrl: "https://qa.saucedemo.com",
  apiUrl: "https://qa-api.example.com",
  timeout: 60000,
};

export default class TestDataFactory {
  static createUser(overrides: Partial<TestUser> = {}): TestUser {
    return {
      ...STAN_USER,
      ...overrides,
    };
  }

  static getUsersbyoutcome(outcome: "success" | "failure"): TestUser[] {
    ALLUSERS.filter((user) => user.expectedOutcome === outcome);
    return ALLUSERS.filter((user) => user.expectedOutcome === outcome);
  }

  static getUserOutcome(outcome: "success" | "failure"): TestUser[] {
    return ALLUSERS.filter((user) => user.expectedOutcome === outcome);
  }

  static getTestSeverity(testName: string): Severity {
    if (testName.toLowerCase().includes("login")) return Severity.CRITICAL;
    if (testName.toLowerCase().includes("checkout")) return Severity.HIGH;
    return Severity.MEDIUM;
  }
}

export class TestData {
  static createUser(overrides: Partial<TestUser> = {}) {
    return {
      ...STAN_USER,
      ...overrides,
    };
  }
}
