const identity = <T>(value: T): T => {
  return value;
};
const str = identity("hello");
const num = identity("42");
const arr = identity([1, 2, 3]);

const iden = <T>(value: T): T => {
  return value;
};

console.log("identity string:", str, typeof str);
console.log("identity number:", num, typeof num);
console.log("indeity aarr:", arr, typeof arr);
const explicit = identity<string>("typed");
const number = identity<number>(45);

interface HasLength {
  length: number;
}
const getLength = <T extends HasLength>(item: T): number => {
  return item.length;
};

const str1 = identity("typed");
console.log(str1);
console.log(getLength([1, 2, 3]));
console.log(getLength("hello how are you"));
console.log(getLength("hello how are you"));

interface ApiResponse<T> {
  status: number;
  statusText: string;
  data: T;
  headers: Record<string, string>;
  duration: number;
}

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

const userResponse: ApiResponse<User> = {
  status: 200,
  statusText: "OK",
  data: {
    id: 1,
    email: "vevin.moza@ul.com",
    first_name: "Vevin",
    last_name: "Moza",
  },
  headers: { "Content-Type": "applicatino/json" },
  duration: 23,
};

const productResponse: ApiResponse<Product> = {
  status: 200,
  statusText: "OK",
  data: {
    id: 101,
    name: "Sauce Labs Backpack",
    price: 29.99,
    category: "Bags",
  },
  headers: { "Content-Type": "applicatino/json" },
  duration: 23,
};
console.log(userResponse.data.email);
console.log(productResponse.data.name);

class DataStore<T extends { id: number }> {
  private items: Map<number, T> = new Map();
  add(item: T): void {
    this.items.set(item.id, item);
  }
  get(id: number): T | undefined {
    return this.items.get(id);
  }
  getAll(): T[] {
    return Array.from(this.items.values());
  }
  find(predicate: (item: T) => boolean): T | undefined {
    return this.getAll().find(predicate);
  }
  count(): number {
    return this.items.size;
  }
}

const userStore = new DataStore<User>();
userStore.add({
  id: 1,
  email: "vevin@test.com",
  first_name: "Vevin",
  last_name: "Moza",
});
userStore.add({
  id: 2,
  email: "john@test.com",
  first_name: "John",
  last_name: "Doe",
});

console.log(userStore.count());
console.log(userStore.get(1)?.first_name);
console.log(userStore.get(1)?.last_name);
console.log(userStore.find((u) => u.email === "john@test.com")?.first_name);

const productStore = new DataStore<Product>();
productStore.add({
  id: 101,
  name: "Sauce Labs Backpack",
  price: 29.99,
  category: "Bags",
});

const createPair = <K, V>(key: K, value: V): { key: K; value: V } => {
  return { key, value };
};

const createPair1 = <K, V>(key: K, value: V): { key: K; value: V } => {
  return { key, value };
};

const envVar = createPair("BASE_URL", "https://saucedemo.com");
console.log(envVar);
const timeout = createPair("timeout", 30000);
console.log("Timeout:", timeout);

interface PaginatedResponse<T, M = { page: number; total: number }> {
  data: T[];
  meta: M;
}

interface PaginatedResponse<T, M = { page: number; total: number }> {
  data: T[];
  meta: M;
}

interface PaginatedResponse<T, M = { page: number; total: number }> {
  data: T[];
  meta: M;
}
interface P<T, M = { page: number; total: number }> {
  data: T[];
  meta: M;
}

const usersPage: PaginatedResponse<User> = {
  data: [
    { id: 1, email: "test@test.com", first_name: "Test", last_name: "User" },
  ],
  meta: { page: 1, total: 50 },
};

const usersPage1: PaginatedResponse<User> = {
  data: [
    { id: 1, email: "test@test.com", first_name: "Test", last_name: "User" },
  ],
  meta: { page: 1, total: 50 },
};
interface CursorMeta {
  cursor: string;
  hasMore: boolean;
}

const cursorReponse: PaginatedResponse<Product, CursorMeta> = {
  data: [{ id: 1, name: "Item", price: 10, category: "Test" }],
  meta: { cursor: "23", hasMore: true },
};

// Let's simulate this pattern:
interface SimulatedFixtures {
  userName: string;
  baseUrl: string;
  timeout: number;
}

// Simulated test.extend — creates a "fixture provider" from a generic type:
const createFixtureProvider = <T extends Record<string, unknown>>(fixtures: {
  [K in keyof T]: () => T[K];
}): (() => T) => {
  return () => {
    const result = {} as T;
    for (const key in fixtures) {
      result[key] = fixtures[key]();
    }
    return result;
  };
};

const getFixtures = createFixtureProvider<SimulatedFixtures>({
  userName: () => "standard_user",
  baseUrl: () => "https://www.saucedemo.com",
  timeout: () => 30000,
});

const fixtures = getFixtures();
console.log("\nSimulated fixtures:", fixtures);
// TypeScript gives full autocomplete on fixtures.userName, fixtures.baseUrl, etc.

console.log("\n✅ Exercise 10 complete!");
