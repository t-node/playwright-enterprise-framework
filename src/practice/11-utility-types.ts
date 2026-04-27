interface FullTestConfig {
  baseUrl: string;
  apiUrl: string;
  timeout: number;
  retries: number;
  headless: boolean;
  browser: "chromium" | "firefox" | "webkit";
  viewport: { width: number; height: number };
  screenshotOnFailure: boolean;
  videoOnFailure: boolean;
  traceOnRetry: boolean;
}

interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "user" | "viewer";
  createdAt: Date;
  lastLogin: Date;
}
type Name = Pick<UserProfile, "firstName" | "lastName">;
type Role = Pick<UserProfile, "role" | "createdAt">;
const name: Name = {
  firstName: "Vevin",
  lastName: "Moza",
};
const DEFAULT_CONFIG: FullTestConfig = {
  baseUrl: "https://www.saucedemo.com",
  apiUrl: "https://reqres.in/api",
  timeout: 30000,
  retries: 0,
  headless: true,
  browser: "chromium",
  viewport: { width: 1280, height: 720 },
  screenshotOnFailure: true,
  videoOnFailure: false,
  traceOnRetry: true,
};

const cc1z = (over: Partial<FullTestConfig> = {}): FullTestConfig => {
  return {
    ...DEFAULT_CONFIG,
    ...over,
  };
};
const createConfig = (
  overrides: Partial<FullTestConfig> = {},
): FullTestConfig => {
  return { ...DEFAULT_CONFIG, ...overrides };
};

const cc = (over: Partial<FullTestConfig> = {}): FullTestConfig => {
  return { ...DEFAULT_CONFIG, ...over };
};
const createConfig1 = (overrides: Partial<FullTestConfig> = {}) => {
  return { ...DEFAULT_CONFIG, ...overrides };
};

const cc1 = (overrides: Partial<FullTestConfig> = {}) => {
  return { ...DEFAULT_CONFIG, ...overrides };
};

const cc2 = (over: Partial<FullTestConfig>) => {
  return { ...DEFAULT_CONFIG, ...over };
};

const ciConfig = createConfig({
  retries: 2,
  headless: true,
  videoOnFailure: true,
});

const debugConfig = createConfig({ headless: false, timeout: 0 });

console.log("CI config retries", ciConfig.retries);
console.log("Debug config headless", debugConfig.headless);
console.log("Debug config baseUrl:", debugConfig.baseUrl);
interface OptionalSearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
const executeSearch = (params: Required<OptionalSearchParams>): void => {
  console.log(
    `\nSearch: "${params.query}" page=${params.page} limit=${params.limit} sort=${params.sortBy} ${params.sortOrder}`,
  );
};
const es = (params: Required<OptionalSearchParams>): void => {
  console.log(
    `\nSearch: "${params.query}" page=${params.page} limit=${params.limit} sort=${params.sortBy} ${params.sortOrder}`,
  );
};
executeSearch({
  query: "backpack",
  page: 1,
  limit: 20,
  sortBy: "price",
  sortOrder: "asc",
});

type LoginCredentials = Pick<UserProfile, "email" | "role">;

const loginUser: LoginCredentials = {
  email: "vevin@test.com",
  role: "admin",
};

console.log("\nPick - Login creds:", loginUser);

type UserCardData = Pick<UserProfile, "firstName" | "lastName" | "role">;

const userCard: UserCardData = {
  firstName: "Vevin",
  lastName: "Moza",
  role: "admin",
};

console.log("Pick- User card:", userCard);
type CreateUserRequest = Omit<UserProfile, "id" | "createdAt" | "lastLogin">;
const newUser: CreateUserRequest = {
  email: "new@test.com",
  firstName: "hi",
  lastName: "last",
  role: "admin",
};

console.log("\nOmit - New user (no id/dates):", newUser);

type HttpHeaders = Record<string, string>;

const headers: HttpHeaders = {
  "Content-Type": "application/json",
  Authorization: "Bearer token123",
  "X-Request-ID": "req-456",
};
console.log("Headers", headers);

type BrowserConfig = Record<
  "chromium" | "firefox" | "webkit",
  { headless: boolean; channel?: string }
>;

const bconfigs: BrowserConfig = {
  chromium: { headless: true, channel: "chrome" },
  firefox: { headless: true },
  webkit: { headless: true },
};
console.log("Record - Browser configs:", bconfigs);
type EnvUrls = Record<"dev" | "qa" | "staging" | "prod", string>;

const urls: EnvUrls = {
  dev: "https://dev.saucedemo.com",
  qa: "https://qa.saucedemo.com",
  staging: "https://staging.saucedemo.com",
  prod: "https://www.saucedemo.com",
};

console.log(urls);

const frozenConfig: Readonly<FullTestConfig> = { ...DEFAULT_CONFIG };

console.log(frozenConfig.baseUrl);
// Deep readonly for nested objects:
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

const deepFrozen: DeepReadonly<FullTestConfig> = { ...DEFAULT_CONFIG };

const createTestData = () => ({
  username: `user_${Date.now()}`,
  email: `test_${Date.now()}@example.com`,
  timestamp: new Date(),
});

type TestData = ReturnType<typeof createTestData>;
const data: TestData = createTestData();

const createAddress = () => ({
  username: `user_${Date.now()}`,
  address: `add_${Date.now()}`,
});

type TestAddress = ReturnType<typeof createAddress>;

const dataadd: TestAddress = createAddress();

type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;

const processValue = (value: DefiniteString): void => {
  console.log("\nNonNullable value:", value.toUpperCase());
};
processValue("null");

type PromiseString = Promise<string>;
type UnwrappedString = Awaited<PromiseString>;

const fetchUser = async (id: number): Promise<UserProfile> => {
  return {
    id,
    email: "test@test.com",
    firstName: "Test",
    lastName: "User",
    role: "user",
    createdAt: new Date(),
    lastLogin: new Date(),
  };
};

type p = ReturnType<typeof fetchUser>;
type FetchedUser = Awaited<p>;
