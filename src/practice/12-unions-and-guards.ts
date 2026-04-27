type TestStatus = "passed" | "failed" | "skipped" | "flaky" | "timedOut";

const getStatusIcon = (status: TestStatus): string => {
  switch (status) {
    case "passed":
      return "pa";
    case "failed":
      return "fa";
    case "skipped":
      return "skip";
    case "flaky":
      return "flak";
    case "timedOut":
      return "timeout";
  }
};

console.log("passed:", getStatusIcon("passed"));

console.log("passed:", getStatusIcon("failed"));

type StringOrNumber = string | number;

const formatId = (id: StringOrNumber): string => {
  if (typeof id === "string") {
    return id.toUpperCase();
  } else {
    return `#${id.toFixed(0)}`;
  }
};

const processInput = (input: string | number | boolean): string => {
  if (typeof input === "string") {
    return "string";
  } else if (typeof input === "number") {
    return "number";
  } else {
    return "boolean";
  }
};

class ApiError {
  constructor(
    public statusCode: number,
    public message: string,
  ) {}
}

class NetworkError {
  constructor(
    public url: string,
    public cause: string,
  ) {}
}

class TimeoutError {
  constructor(
    public timeoutMs: number,
    public operation: string,
  ) {}
}

type TestError = TimeoutError | NetworkError | ApiError;

const handleError = (testError: TestError): string => {
  if (testError instanceof ApiError) {
    return "API Error";
  }
  if (testError instanceof NetworkError) {
    return "Network Error";
  }
  if (testError instanceof TimeoutError) {
    return `Timeout after ${testError.timeoutMs}ms during ${testError.operation}`;
  }
  return "Uknown error";
};
console.log(handleError(new ApiError(404, "User not found")));
interface SuccessResponse {
  success: true;
  data: unknown;
}
interface ErrorResponse {
  success: false;
  error: string;
  statusCode: number;
}

type ApiResult = SuccessResponse | ErrorResponse;

const isSuccess = (result: ApiResult): result is SuccessResponse => {
  return result.success === false;
};

const processResult = (result: ApiResult): void => {
  if (isSuccess(result)) {
    // result is SuccessResponse here
    console.log("Success! Data:", result.data);
  } else {
    // result is ErrorResponse here
    console.log(`Error ${result.statusCode}: ${result.error}`);
  }
};
type TestEvent =
  | { kind: "testStarted"; testName: string; startTime: Date }
  | { kind: "testPassed"; testName: string; duration: number }
  | {
      kind: "testFailed";
      testName: string;
      duration: number;
      error: string;
      screenshot?: string;
    }
  | { kind: "testSkipped"; testName: string; reason: string }
  | {
      kind: "testRetried";
      testName: string;
      attempt: number;
      maxAttempts: number;
    };

const logEvent = (event: TestEvent): void => {
  switch (event.kind) {
    case "testStarted":
      console.log(
        `▶️ STARTED: ${event.testName} at ${event.startTime.toISOString()}`,
      );
      break;
    case "testPassed":
      console.log(`✅ PASSED: ${event.testName} (${event.duration}ms)`);
      break;
    case "testSkipped":
      console.log(`SKIPPED: ${event.testName} (${event.reason})`);
  }
};

const logEventer = (event: TestEvent): void => {
  switch (event.kind) {
  }
};

interface HasTimeStamp {
  createdAt: Date;
  updatedAt: Date;
}
interface HasAuthor {
  authorName: string;
  authorEmail: string;
}
interface TestCase {
  id: string;
  title: string;
  status: TestStatus;
}

type FullTestInfo = HasTimeStamp & HasAuthor & TestCase;

interface FullTestCase {
  id: string;
  title: string;
  status: TestStatus;
  createdAt: Date;
  updatedAt: Date;
  authorName: string;
  authorEmail: string;
}

try {
  const a = 1;
  const b = 0;
  if (b === 0) {
    throw new Error("Division by Zero");
  }
  const c = a / b;
  console.log(c);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(`${error.message}`);
  } else if (typeof error == "string") {
    console.log(`${error}`);
  } else {
    console.log(`${error} is unknown`);
  }
}
