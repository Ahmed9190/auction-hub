/**
 * Local Storage Service
 * Type-safe wrapper for browser's localStorage
 */

export class StorageService {
  private prefix = 'app_';

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(this.getKey(key), serialized);
    } catch (error) {
      console.error('Failed to set localStorage:', error);
    }
  }

  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(this.getKey(key));
      if (!item) return defaultValue || null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Failed to get localStorage:', error);
      return defaultValue || null;
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  }

  clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }

  exists(key: string): boolean {
    return localStorage.getItem(this.getKey(key)) !== null;
  }
}

export const storageService = new StorageService();