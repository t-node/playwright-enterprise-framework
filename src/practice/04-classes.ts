class TestConfig {
  constructor(
    public browser: string,
    public baseUrl: string,
    public timeout: number = 30000,
  ) {}

  toString(): string {
    return `Hello ${this.browser} and ${this.baseUrl} and ${this.timeout}`;
  }
}

const config = new TestConfig("chrome", "http://google.com", 121);
console.log(config.toString());
console.log("Browser:", config.browser);
console.log("Timeout:", config.timeout);

class BasePage {
  constructor(
    protected pageName: string,
    protected url: string,
  ) {}

  navigate(): void {
    console.log(`Navigating to ${this.url}`);
  }
  getPageName(): string {
    return this.pageName;
  }
}

class LoginPage extends BasePage {
  constructor() {
    super("Login Page", "/login");
  }
  login(username: string, password: string): void {
    console.log(`[${this.pageName}] filling UserName: ${username}`);
  }
}

class InventoryPage extends BasePage {
  constructor() {
    super("Inventory Page", "/inventory.html");
  }
  addProductToCart(productName: string): void {
    console.log(`[${this.pageName} Adding "${productName}" to cart ]`);
  }
}
const loginPage = new LoginPage();
loginPage.navigate();
loginPage.login("standard_user", "secret_sauce");

const inventoryPage = new InventoryPage();
inventoryPage.navigate();

inventoryPage.addProductToCart("Sauce Labs Backup");

abstract class BaseApiClient {
  constructor(protected baseUrl: string) {}
  abstract getAuthHeaders(): Record<string, string>;

  async get(endpoint: string): Promise<void> {
    const headers = this.getAuthHeaders();
    console.log(`GET ${this.baseUrl}${endpoint}`);
    console.log("Headers:", headers);
  }
}
class AuthenticatedApiClient extends BaseApiClient {
  constructor(
    baseUrl: string,
    private token: string,
  ) {
    super(baseUrl);
  }
  getAuthHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };
  }
}
const apiClient = new AuthenticatedApiClient(
  "https://api.example.com",
  "my-jwt-token",
);
apiClient.get("/users");

interface Reportable {
  generateReport(): string;
}

interface Configurable {
  configure(options: Record<string, unknown>): void;
}

class TestRunner implements Reportable, Configurable {
  private testCount: number = 0;
  generateReport(): string {
    return `Test Runner Report: ${this.testCount} tests executed`;
  }
  configure(options: Record<string, unknown>): void {
    console.log("Configuring test runner with:", options);
  }
  runTest(name: string): void {
    console.log(`Running test: ${name}`);
  }
}

const runner = new TestRunner();
runner.configure({ parallel: true, workers: 4 });
runner.runTest("login Test");
runner.runTest("checkout Test");
console.log(runner.generateReport());
