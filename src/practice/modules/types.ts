export interface TestUser {
  username: string;
  password: string;
  role: "admin" | "standard" | "locked" | "problem";
  expectedOutcome: "success" | "failure";
  errorMessage?: string;
}

export interface TestEnvironment {
  name: string;
  baseUrl: string;
  apiUrl: string;
  timeout: number;
}

export interface TestResult {
  testName: string;
  status: "passed" | "failed";
  duration: number;
  browser: string;
  error?: string;
}

export type BrowserType = "chromium" | "firefox" | "webkit";
export type School = "public" | "private" | "govt";
export enum Severity {
  CRITICAL = "critical",
  HIGH = "high",
  MEDIUM = "medium",
}
export const SUPPORTED_BROWSERS: BrowserType[] = [
  "chromium",
  "firefox",
  "webkit",
];

export const supp_schools: School[] = ["private", "public", "govt", "private"];
