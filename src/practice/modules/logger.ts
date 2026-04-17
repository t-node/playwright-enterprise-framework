/**
 * DAY 2 - Exercise 8c: Module — A Simple Logger Utility
 *
 * Demonstrates:
 *   - A class with a default export
 *   - Static methods (like Java's static utility classes)
 *   - How utility modules work in a framework
 */

// Java equivalent:
// public class Logger {
//     public static void info(String msg) { System.out.println("[INFO] " + msg); }
// }

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

class Logger {
  private static instance: Logger; // Singleton pattern (same as Java)
  private level: LogLevel;

  private constructor(level: LogLevel = LogLevel.INFO) {
    this.level = level;
  }

  // Singleton accessor:
  static getInstance(level?: LogLevel): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(level);
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  debug(message: string): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.log(this.formatMessage(LogLevel.DEBUG, message));
    }
  }

  info(message: string): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(this.formatMessage(LogLevel.INFO, message));
    }
  }

  warn(message: string): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage(LogLevel.WARN, message));
    }
  }

  error(message: string): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.formatMessage(LogLevel.ERROR, message));
    }
  }

  // Log a test step (you'll use this pattern in Playwright page objects):
  step(stepName: string): void {
    this.info(`📍 STEP: ${stepName}`);
  }

  private shouldLog(messageLevel: LogLevel): boolean {
    const levels = [
      LogLevel.DEBUG,
      LogLevel.INFO,
      LogLevel.WARN,
      LogLevel.ERROR,
    ];
    return levels.indexOf(messageLevel) >= levels.indexOf(this.level);
  }
}

// Default export — the Logger class itself
export default Logger;
