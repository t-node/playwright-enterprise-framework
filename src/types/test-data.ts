export type UserRole =
  | "admin"
  | "standard"
  | "locked"
  | "problem"
  | "performance";

export interface TestUser {
  readonly username: string;
  readonly password: string;
  readonly role: UserRole;
  readonly expectedOutcome: "success" | "error";
  readonly errorMessage?: string;
  readonly displayName?: string;
}

export interface CreateUserRequest {
  name: string;
  job: string;
}
export interface CreateUserResponse extends CreateUserRequest {
  id: string;
  createdAt: string;
}
export type Order = "az" | "za" | "lohi" | "hilo";
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}
export interface OrderSummary {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}
export interface ApiResponse<T> {
  status: number;
  statusText: string;
  data: T;
  headers: Record<string, string>;
}

export interface PaginatedApiResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
}

export interface ApiErrorResponse {
  error: string;
}
export type TestOutcome =
  | "passed"
  | "failed"
  | "skipped"
  | "flaky"
  | "timedOut";
export type Severity = "critical" | "high" | "medium" | "low";

export interface TestResultRecord {
  id: string;
  title: string;
  fullTitle: string;
  outcome: TestOutcome;
  duration: number;
  retries: number;
  browser: string;
  tags: string[];
  severity?: Severity;
  errorMessage?: string;
  screenshotPath?: string;
  tracePath?: string;
  timestamp: Date;
}

export interface TestSuiteReport {
  suiteName: string;
  environment: string;
  startTime: Date;
  endTime: Date;
  totalDuration: number;
  results: TestResultRecord[];
  summary: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
    flaky: number;
    passRate: number;
  };
}
/** A function that creates test data with optional overrides */
export type DataFactory<T> = (overrides?: Partial<T>) => T;

/** A function that creates unique test data (with timestamps/random values) */
export type UniqueDataFactory<T> = (
  overrides?: Partial<T>,
) => T & { _generatedAt: Date };
