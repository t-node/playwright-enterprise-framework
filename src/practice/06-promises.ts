// const fetchUserData = (
//   userId: number,
// ): Promise<{ id: number; name: string }> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (userId > 0) {
//         resolve({ id: userId, name: `User_${userId}` });
//       } else {
//         reject(new Error("Invalid User"));
//       }
//     }, 1000);
//   });
// };

// console.log("1. Starting fetch with .then()...");

// fetchUserData(1)
//   .then((user) => {
//     console.log("2. Got User:", user);
//     return fetchUserData(2);
//   })
//   .then((user2) => {
//     console.log("3. Got Second User");
//   })
//   .catch((error) => {
//     console.error("Error:", error.message);
//   });

// console.log("4. This prints before the fetch completes");

// const demonstrateStates = (): void => {
//   const promise = fetchUserData(1);
//   console.log("promise is", promise);
//   promise.then((result) => {
//     console.log("Promise fulfilled:", result);
//   });
// };
// demonstrateStates();

// const fetchMultipleUsers = async (): Promise<void> => {
//   console.log("");
//   const startTime = Date.now();
//   const results = await Promise.all([
//     fetchUserData(1),
//     fetchUserData(2),
//     fetchUserData(3),
//   ]);

//   const elaspsed = Date.now() - startTime;
//   console.log(
//     `All 3 users fetched in ${elaspsed}ms (parallel — ~1 second, not 3):`,
//     results,
//   );
// };
// const re1 = async (): Promise<void> => {
//   const slow = new Promise<string>((resolve) =>
//     setTimeout(() => resolve("flow"), 2000),
//   );
// };
// const re2 = async (): Promise<{ id: number; name: string }> => {
//   const fast = new Promise<{ id: number; name: string }>((resolve) =>
//     setTimeout(() => resolve({ id: 23, name: "hi" }), 300),
//   );
//   return fast;
// };

// const allSettled = async (): Promise<void> => {
//   const results = await Promise.allSettled([
//     fetchUserData(1),
//     fetchUserData(1),
//     fetchUserData(1),
//   ]);
//   console.log("\n--- Promise.allSettled results ---");

//   results.forEach((result, index) => {
//     if (result.status === "fulfilled") {
//       console.log(`Promise ${index}: ${JSON.stringify(result.value)}`);
//     } else {
//       console.log(`Promise ${index}: ${result.reason.message}`);
//     }
//   });
// };
// const runAll = async (): Promise<void> => {
//   await fetchMultipleUsers();
//   await allSettled();
// };

// setTimeout(() => {
//   runAll();
// }, 2000);

// const simulatePageGoto = async (url: string): Promise<void> => {
//   console.log(`navigating ${url}...`);
//   await new Promise((resolve) => setTimeout(resolve, 500));
//   console.log(` Page Loaded ${url}`);
// };
// const simulateClick = async (selector: string): Promise<void> => {
//   console.log(`Clicking ${selector}`);
//   await new Promise((resolve) => setTimeout(resolve, 200));
//   console.log(`Clicked ${selector}`);
// };
// const simulateFill = async (selector: string, value: string): Promise<void> => {
//   console.log(`Filling ${selector} with ${value}`);
//   await new Promise((resolve) => setTimeout(resolve, 200));
//   console.log(`Filled ${selector} with ${value}`);
// };
// const simulateGetText = async (selector: string): Promise<string> => {
//   await new Promise((resolve) => setTimeout(resolve, 400));
//   return `Text ${selector}`;
// };

// const LoginTest = async (): Promise<void> => {
//   console.log("Running Test");
//   await simulatePageGoto("google.com");
//   await simulateFill("#user", "vevin");
//   await simulateFill("#password", "secret_sauce");
//   await simulateClick("#login-button");
//   const pageTitle = await simulateGetText(".title");
//   console.log(`  📋 Page title: ${pageTitle}`);
//   console.log("--- Login Test: PASSED ✅ ---\n");
// };

// const brokenLoginTest = async (): Promise<void> => {
//   console.log("--- Running: BROKEN Login Test (missing awaits) ---");
//   simulatePageGoto("google.com");
//   simulateFill("#user", "vevin");
//   simulateFill("#password", "secret_sauce");
//   simulateClick("#login-button");
//   console.log("  🔴 This line runs BEFORE any operation completes!");
//   await new Promise((resolve, reject) => {
//     setTimeout(resolve, 80);
//   });
//   console.log("--- BROKEN Test: demonstrates flaky behavior ---\n");
// };

// const simulateFailAction = async (): Promise<void> => {
//   await new Promise((resolve) => setTimeout(resolve, 200));
//   throw new Error("Element not found: #non-existent-button");
// };

// const testWithErrorHandling = async (): Promise<void> => {
//   console.log("----Running Error Handling Test---");
//   try {
//     simulateFill("#password", "secret_sauce");
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(`Test failed: ${error.message}`);
//     }
//   } finally {
//     console.log("Clean up: closing browser context");
//   }

//   console.log("Error handling");
// };

const getBaseUrl = async (): Promise<string> => {
  return "google.com";
};
const useBaseUrl = async (): Promise<void> => {
  const url = await getBaseUrl();
  console.log(`Base URL: ${url}`);
};

const urlPromise = getBaseUrl();

console.log(`with await (Promise object):`, useBaseUrl());

console.log(`Without await (Promise object):`, urlPromise);
const fetchProduct = async (
  id: number,
): Promise<{ id: number; name: string }> => {
  new Promise((resolve, reject) => setTimeout(resolve, 500));
  return { id: id, name: `Name is book ${id}` };
};

const seqFetch = async (): Promise<void> => {
  console.log(`--Seq fetch`);
  const start = Date.now();
  const p1 = await fetchProduct(1);
  const p2 = await fetchProduct(2);
  const p3 = await fetchProduct(3);
};
const parallelFetch = async (): Promise<void> => {
  console.log(`-parallel feetch`);
  const [p1, p2, p3] = await Promise.all([
    fetchProduct(1),
    fetchProduct(2),
    fetchProduct(3),
  ]);
  console.log(`Fetched ${[p1, p2, p3]}.length`);
};
const retryAsync = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000,
): Promise<T> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      console.log(` Attempt ${attempt} failed, retrying`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  throw new Error("Unreachable");
};

const flakeyOperation = async (): Promise<string> => {
  const random = Math.random();
  if (random < 0.7) {
    throw new Error("fail");
  }
  return "Success";
};

const retryExample = async (): Promise<void> => {
  console.log("retry");
  try {
    const result = await retryAsync(() => flakeyOperation(), 5, 500);
  } catch (error) {
    if (error instanceof Error) {
      console.log(` All retries exhanused: ${error.message}`);
    }
  }
};

type TestFunction = (fixtures: { page: string }) => Promise<void>;

const myTest: TestFunction = async (fixtures) => {
  console.log(fixtures.page);
};

const myTest1: TestFunction = async (fixtures) => {
  console.log(fixtures.page);
};

const myTest2: TestFunction = async (fixtures) => {
  console.log(fixtures.page);
};

myTest({ page: "how are you here" });

const fakeTest = (name: string, fn: TestFunction): void => {
  console.log(`Test ${name}`);
  fn({ page: "FakePage" })
    .then(() => console.log(`PASSED`))
    .catch((err) => console.log(`  ❌ ${name}: FAILED — ${err.message}`));
};

fakeTest("test login", async ({ page }) => {
  //await simulatePageGoto("https://saucedemo.com");
  console.log(`  Using page object: ${page}`);
});
const main = async (): Promise<void> => {};

type tf = (
  receipt: { page: string; id: number },
  token: { id: number },
) => Promise<void>;

const box: tf = async (receipt, token) => {
  console.log("test");
  Promise.resolve(undefined);
};
box({ page: "book", id: 23 }, { id: 23 });
