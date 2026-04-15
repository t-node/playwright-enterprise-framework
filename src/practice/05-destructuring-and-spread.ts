interface TestFixtures {
  page: string;
  context: string;
  request: string;
}

const myTest = ({ page, context }: TestFixtures): void => {
  console.log(`Using page: ${page}`);
  console.log(`Using context: ${context}`);
};

const myTes = ({ page, context }: TestFixtures): void => {
  console.log(`Using page: ${page}`);
  console.log(`Using page: ${context}`);
};

myTes({ page: "hi", context: "books", request: "test" });

const apiResponse = {
  data: { id: 1, name: "John" },
  status: 200,
  statusText: "OK",
};

const { status: httpStatus, statusText: message, data: exampled } = apiResponse;

console.log(`HTTP ${httpStatus} ${message} ${exampled.id}`);
const { retries = 3, workers = 4 } = { retries: 9 } as Record<string, number>;
console.log(`Retries: ${retries}, Workers: ${workers}`); // 2, 4

const browsers: string[] = ["chrome", "firefox", "edge"];
const [first, second, thrid] = browsers;
const [, , lastbrowser] = browsers;
console.log(first, second, thrid, lastbrowser);

const defaultConfig = {
  baseUrl: "https://saucedemo.com",
  timeout: 3000,
  retries: 0,
  headless: true,
};

const ciConfig = {
  ...defaultConfig,
  retries: 2,
  workers: 4,
};

console.log(ciConfig);

const deConfig = {
  ...defaultConfig,
  headless: false,
  timeout: 23,
};

const defaultUser = {
  firstName: "Test",
  lastName: "User",
  email: "test@example.com",
  role: "user",
};

const createTestUser = (overrides: Partial<typeof defaultUser> = {}) => {
  return {
    ...defaultUser,
    ...overrides,
    email: overrides.email || `test-${Date.now()}@example.com`, // unique email
  };
};

const createTU = (overrides: Partial<typeof defaultUser> = {}) => {
  return {
    ...defaultUser,
    ...overrides,
    email: overrides.email || `test-${Date.now()}@example.com`,
  };
};

console.log(createTU());

const adminUser = createTU({ role: "admin", firstName: "Admin" });
const regularUser = createTestUser({ lastName: "Moza" });
console.log(adminUser);
console.log(regularUser);
const smokeTests = ["login", "logout", "search"];
const regressionTests = ["checkout", "payment", "refund"];
const allTests = [...smokeTests, ...regressionTests];
console.log(allTests);
const testCopy = [...allTests];
testCopy.push("Hello");
console.log(testCopy);
