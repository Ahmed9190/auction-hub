import { ENV } from '../constants/env';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  timestamp: string;
  message: string;
  context?: Record<string, any>;
  stack?: string;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 100;

  /**
   * Safely serialize objects to avoid circular references
   */
  private safeSerialize(obj: any, depth = 0, maxDepth = 3): any {
    if (depth > maxDepth) {
      return '[Object]';
    }

    if (obj === null || obj === undefined) {
      return obj;
    }

    if (typeof obj !== 'object') {
      return obj;
    }

    // Handle Error objects
    if (obj instanceof Error) {
      return {
        name: obj.name,
        message: obj.message,
        stack: obj.stack,
      };
    }

    // Handle circular references
    if (obj instanceof Set) {
      return `[Set(${obj.size})]`;
    }

    if (obj instanceof Map) {
      return `[Map(${obj.size})]`;
    }

    // Handle arrays
    if (Array.isArray(obj)) {
      return obj.slice(0, 10).map((item) => this.safeSerialize(item, depth + 1, maxDepth));
    }

    // Handle objects
    try {
      const serialized: Record<string, any> = {};
      const keys = Object.keys(obj).slice(0, 10);

      for (const key of keys) {
        try {
          const value = obj[key];
          serialized[key] = this.safeSerialize(value, depth + 1, maxDepth);
        } catch {
          serialized[key] = '[Unserializable]';
        }
      }

      return serialized;
    } catch {
      return '[Object]';
    }
  }

  /**
   * Format console output safely
   */
  private formatConsoleOutput(entry: LogEntry): any[] {
    const icons = {
      debug: '🔍',
      info: 'ℹ️',
      warn: '⚠️',
      error: '🔴',
    };

    const baseMessage = `${icons[entry.level]} [${entry.timestamp}] ${entry.message}`;

    const output: any[] = [baseMessage];

    if (entry.context) {
      try {
        // Safely serialize context to avoid circular references
        const serializedContext = this.safeSerialize(entry.context);
        output.push(serializedContext);
      } catch {
        output.push('[Context serialization failed]');
      }
    }

    return output;
  }

  private createEntry(
    level: LogLevel,
    message: string,
    context?: Record<string, any>,
    stack?: string
  ): LogEntry {
    return {
      level,
      timestamp: new Date().toISOString(),
      message,
      context: context ? this.safeSerialize(context) : undefined,
      stack,
    };
  }

  debug(message: string, context?: Record<string, any>) {
    const entry = this.createEntry('debug', message, context);
    if (ENV.FEATURES.ENABLE_DEBUG_MODE) {
      try {
        console.debug(...this.formatConsoleOutput(entry));
      } catch (error) {
        console.debug(entry.message);
      }
    }
    this.store(entry);
  }

  info(message: string, context?: Record<string, any>) {
    const entry = this.createEntry('info', message, context);
    if (ENV.IS_DEV) {
      try {
        console.info(...this.formatConsoleOutput(entry));
      } catch (error) {
        console.info(entry.message);
      }
    }
    this.store(entry);
  }

  warn(message: string, context?: Record<string, any>) {
    const entry = this.createEntry('warn', message, context);
    try {
      console.warn(...this.formatConsoleOutput(entry));
    } catch (error) {
      console.warn(entry.message);
    }
    this.store(entry);
  }

  error(message: string, context?: Record<string, any>, stack?: string) {
    const entry = this.createEntry('error', message, context, stack);
    try {
      console.error(...this.formatConsoleOutput(entry));
    } catch (error) {
      console.error(entry.message);
    }
    this.store(entry);
  }

  private store(entry: LogEntry) {
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  getLogs(): LogEntry[] {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }

  downloadLogs() {
    try {
      const dataStr = JSON.stringify(this.logs, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const exportFileDefaultName = `logs-${new Date().toISOString()}.json`;

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } catch (error) {
      console.error('Failed to download logs');
    }
  }
}

export const logger = new Logger();