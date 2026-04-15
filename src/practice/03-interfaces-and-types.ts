interface TestUser {
  name: string;
  username: string;
  password: string;
  role: "admin" | "user" | "locked";
}

const lockedUser: TestUser = {
  name: "lock",
  username: "locked_out_user",
  password: "secret",
  role: "admin",
};

const standardUser: TestUser = {
  name: "hehei",
  username: "standardUser",
  password: "stpass",
  role: "user",
};

console.log("Standard user:", standardUser);
console.log("lockedUser:", lockedUser);

interface TestEnvironment {
  readonly baseUrl: string;
  readonly apiUrl: string;
  timeout?: number;
  retries?: number;
}

const devEnv: TestEnvironment = {
  baseUrl: "https://www.saucedemo.com",
  apiUrl: "https://reqres.in/api",
  timeout: 2320,
  retries: 2,
};

const qaEnv: TestEnvironment = {
  baseUrl: "https://www.qa.saucedemo.com",
  apiUrl: "https://qa.reqres.in/api",
  timeout: 21320,
  retries: 5,
};

console.log(devEnv);
console.log(qaEnv);

interface BasePage {
  url: string;
  title: string;
}

interface LoginPage extends BasePage {
  username: string;
  password: string;
  submitbutton: string;
  login: (username: string, password: string) => void;
}

const loginPageConfig: LoginPage = {
  url: "/login",
  title: "Sweag labs",
  username: "ajauy",
  password: "pass",
  submitbutton: "submit",
  login: (username, password) => {
    console.log(`Logging in as ${username}`);
  },
};

loginPageConfig.login("asds", "pass");

type BrowserName = "chromium" | "firefox" | "webkit";
type TestStatus = "passed" | "failed" | "skipped" | "flaky";

type TestResult = {
  testName: string;
  status: TestStatus;
  duration: number;
  browser: BrowserName;
  errorMessage?: string;
};

const result: TestResult = {
  testName: "Login with valid credentials",
  status: "passed",
  duration: 1250,
  browser: "chromium",
};

console.log("Test Result:", result);

interface HasName {
  name: string;
}
const printName = (thing: HasName) => {
  return thing.name;
};

console.log(printName({ name: "Playwright", book: "play" } as HasName));
console.log(printName(standardUser));
console.log("\n✅ Exercise 3 complete!");
