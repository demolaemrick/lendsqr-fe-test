import type { User } from '../data/users';

const STORAGE_KEY = 'user_details';

export interface StoredUserData {
  user: User;
  timestamp: number;
}

// Cache expiry time (24 hours)
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000;

export const storage = {
  saveUserDetails(user: User): void {
    try {
      const existingData = this.getAllCachedUsers();
      existingData[user.id] = {
        user,
        timestamp: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  getUserDetails(id: string): User | null {
    try {
      const existingData = this.getAllCachedUsers();
      const storedUser = existingData[id];

      if (!storedUser) return null;

      // Check if cache is expired
      if (Date.now() - storedUser.timestamp > CACHE_EXPIRY_MS) {
        this.removeUserDetails(id);
        return null;
      }

      return storedUser.user;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  getAllCachedUsers(): Record<string, StoredUserData> {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
      return {};
    }
  },

  removeUserDetails(id: string): void {
    try {
      const existingData = this.getAllCachedUsers();
      delete existingData[id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  clearAllUserDetails(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },

  isUserCached(id: string): boolean {
    return this.getUserDetails(id) !== null;
  },
};

export default storage;
