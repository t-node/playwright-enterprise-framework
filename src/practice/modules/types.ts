/**
 * DAY 2 - Exercise 8a: Module — Type Definitions
 *
 * This file EXPORTS types that other files will IMPORT.
 *
 * Java equivalent: A shared package with interfaces/DTOs
 * Java:   package com.framework.types;
 *         public interface TestUser { ... }
 * TS:     export interface TestUser { ... }
 */

// Named exports — each exported individually:
export interface TestUser {
  username: string;
  password: string;
  role: "admin" | "standard" | "locked" | "problem" | "performance";
  expectedOutcome: "success" | "error";
  errorMessage?: string; // optional — only for error cases
}

export interface TestEnvironment {
  name: string;
  baseUrl: string;
  apiUrl: string;
  timeout: number;
}

export interface TestResult {
  testName: string;
  status: "passed" | "failed" | "skipped";
  duration: number;
  browser: string;
  error?: string;
}

// You can also export type aliases:
export type BrowserType = "chromium" | "firefox" | "webkit";

// And enums (similar to Java enums):
export enum Severity {
  CRITICAL = "critical",
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}

// Export a constant:
export const SUPPORTED_BROWSERS: BrowserType[] = [
  "chromium",
  "firefox",
  "webkit",
];
