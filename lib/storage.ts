import { config } from './config';

class LocalStorage {
  private prefix = 'referloop_';

  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const item = localStorage.getItem(this.prefix + key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.prefix + key);
  }

  clear(): void {
    if (typeof window === 'undefined') return;
    
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }

  has(key: string): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(this.prefix + key) !== null;
  }
}

export const storage = new LocalStorage();

export function initializeSeeds() {
  const seedVersion = storage.get<string>('seed_version');
  
  if (seedVersion !== config.SEED_VERSION) {
    // Import seeds dynamically to avoid SSR issues
    import('./seeds').then(({ generateSeeds }) => {
      const seeds = generateSeeds();
      
      // Store all seed data
      Object.entries(seeds).forEach(([key, data]) => {
        storage.set(key, data);
      });
      
      storage.set('seed_version', config.SEED_VERSION);
      console.log('Seeds initialized with version:', config.SEED_VERSION);
    });
  }
}