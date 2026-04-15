function greet(name: string): string {
  return `Hello, ${name}`;
}
console.log(greet("Vevin"));

const greetArrow = (name: string): string => {
  return `Hello, ${name}`;
};
console.log(greetArrow("Ajay"));

const greetShort = (name: string): string => `Hello, ${name}`;
console.log(greetShort("Surya"));

const formatName = (first: string, last?: string): string => {
  return last ? `${first} ${last}` : `${first}`;
};

const login = (
  user: string,
  password: string,
  companycode?: string,
): string => {
  return companycode
    ? `Logging in with ${user} and password ${password} and companycode ${companycode}`
    : `Logging in with ${user} and password ${password}`;
};

console.log(formatName("Vevin", "Moza"));
console.log(login("Vevin", "pass"));

const createUrl = (
  path: string,
  baseUrl: string = "https://saucedemo.com",
): string => {
  return `${baseUrl}${path}`;
};

console.log(createUrl("/inventory.html"));
console.log(createUrl("/api/users", "https://reqres.in"));

const logMessage = (msg: string): void => {
  console.log(`[LOG] ${msg}`);
};

const logMessagex = (msg: string): void => {
  console.log(`[LOG] ${msg}`);
};

const casteConverter = (
  firstName: string,
  lastName: string = " Moza",
): string => {
  return `${firstName}${lastName}`;
};
console.log(casteConverter("Surya"));
logMessage("Test Started");

const executewithTiming = (taskName: string, task: () => void): void => {
  const start = Date.now();
  task();
  const duration = Date.now() - start;
  console.log(`${taskName} took ${duration}ms`);
};

const funcpass = (name: string, testfun?: () => void): void => {
  console.log(testfun?.());
};
funcpass("Vevin", () => {
  console.log("testing the fucntion pass");
});

executewithTiming("Print numbers", () => {
  for (let i = 0; i < 1; i++) {
    console.log("test");
  }
});
const sum = (...numbers: number[]): number => {
  console.log(numbers);
  return 0;
};

const rum = (...numbers: number[]): void => {
  console.log(numbers);
};

rum(1, 2, 3, 4, 5);

function tester(name: string, age = 13): void {
  console.log(`The name is ${name}, ${age}`);
}

tester("Busy", 45);
console.log("\n✅ Exercise 2 complete!");
