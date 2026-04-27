export type EnvironmentName = "dev" | "qa" | "prod" | "staging";

export interface EnvironmentConfig {
  readonly name: EnvironmentName;
  readonly baseUrl: string;
  readonly apiUrl: string;
  readonly timeout: number;
  readonly expectTimeout: number;
  readonly retries: number;
  readonly workers: number;
}

export type EnvironmentMap = Record<EnvironmentName, EnvironmentConfig>;
export type BrowserName = "chromium" | "firefox" | "webkit";
export type DeviceName = "iPhone 13" | "Pixel 7" | "iPad Mini";

export interface ViewPortSize {
  width: number;
  height: number;
}

export interface BrowserProjectConfig {
  name: string;
  browser: BrowserName;
  viewport?: ViewPortSize;
  isMobile?: boolean;
  deviceName?: DeviceName;
}

export type ReporterType =
  | "html"
  | "json"
  | "junit"
  | "allure"
  | "blob"
  | "list";

export interface TestRunConfig {
  environment: EnvironmentName;
  browsers: BrowserName[];
  reporters: ReporterType[];
  isCI: boolean;
  headless: boolean;
  screenshot: "on" | "off" | "only-on-failure";
  video: "on" | "off" | "retain-on-failure" | "on-first-entry";
  trace: "on" | "off" | "retain-on-failure" | "on-first-retry";
  tags?: string[];
}
export type TestRunOverrides = Partial<Omit<TestRunConfig, "isCI">>;

/** Make specific properties required in a Partial type */
export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Make specific properties optional in a Required type */
export type WithOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

/** Extract only the string keys of a type */
export type StringKeysOf<T> = Extract<keyof T, string>;
