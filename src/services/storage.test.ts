import { describe, it, expect, beforeEach } from 'vitest';
import { storage } from './storage';
import type { User } from '../data/users';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
});

// Mock user data
const mockUser: User = {
  id: '1',
  organization: 'Lendsqr',
  username: 'testuser',
  email: 'test@example.com',
  phoneNumber: '08012345678',
  dateJoined: '2024-01-01',
  status: 'Active',
  userId: 'LSQFf123456',
  fullName: 'Test User',
  userTier: 2,
  accountBalance: '₦100,000.00',
  accountNumber: '1234567890',
  bankName: 'GTBank',
  bvn: '12345678901',
  gender: 'Male',
  maritalStatus: 'Single',
  children: 'None',
  typeOfResidence: 'Rented Apartment',
  levelOfEducation: 'B.Sc',
  employmentStatus: 'Employed',
  sectorOfEmployment: 'FinTech',
  durationOfEmployment: '2 years',
  officeEmail: 'test@lendsqr.com',
  monthlyIncome: '₦200,000.00 - ₦400,000.00',
  loanRepayment: '50,000',
  twitter: '@testuser',
  facebook: 'Test User',
  instagram: '@testuser',
  guarantors: [
    {
      fullName: 'Guarantor One',
      phoneNumber: '08087654321',
      emailAddress: 'guarantor1@example.com',
      relationship: 'Friend',
    },
  ],
};

describe('Storage Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // ==================
  // POSITIVE SCENARIOS
  // ==================

  describe('Positive Scenarios', () => {
    it('should save user details to localStorage', () => {
      storage.saveUserDetails(mockUser);
      const cached = storage.getUserDetails('1');

      expect(cached).not.toBeNull();
      expect(cached?.id).toBe('1');
      expect(cached?.fullName).toBe('Test User');
    });

    it('should retrieve user details from localStorage', () => {
      storage.saveUserDetails(mockUser);
      const retrieved = storage.getUserDetails('1');

      expect(retrieved).toEqual(mockUser);
    });

    it('should update existing user details', () => {
      storage.saveUserDetails(mockUser);

      const updatedUser = { ...mockUser, fullName: 'Updated User' };
      storage.saveUserDetails(updatedUser);

      const retrieved = storage.getUserDetails('1');
      expect(retrieved?.fullName).toBe('Updated User');
    });

    it('should check if user is cached', () => {
      expect(storage.isUserCached('1')).toBe(false);

      storage.saveUserDetails(mockUser);

      expect(storage.isUserCached('1')).toBe(true);
    });

    it('should get all cached users', () => {
      const user2 = { ...mockUser, id: '2', fullName: 'User Two' };

      storage.saveUserDetails(mockUser);
      storage.saveUserDetails(user2);

      const allCached = storage.getAllCachedUsers();
      expect(Object.keys(allCached)).toHaveLength(2);
      expect(allCached['1']).toBeDefined();
      expect(allCached['2']).toBeDefined();
    });

    it('should remove specific user from cache', () => {
      storage.saveUserDetails(mockUser);
      expect(storage.isUserCached('1')).toBe(true);

      storage.removeUserDetails('1');
      expect(storage.isUserCached('1')).toBe(false);
    });

    it('should clear all cached user details', () => {
      const user2 = { ...mockUser, id: '2' };
      storage.saveUserDetails(mockUser);
      storage.saveUserDetails(user2);

      storage.clearAllUserDetails();

      expect(storage.isUserCached('1')).toBe(false);
      expect(storage.isUserCached('2')).toBe(false);
    });
  });

  // ==================
  // NEGATIVE SCENARIOS
  // ==================

  describe('Negative Scenarios', () => {
    it('should return null for non-existent user', () => {
      const result = storage.getUserDetails('non-existent-id');
      expect(result).toBeNull();
    });

    it('should return false for checking non-cached user', () => {
      expect(storage.isUserCached('999')).toBe(false);
    });

    it('should return empty object when no users are cached', () => {
      const allCached = storage.getAllCachedUsers();
      expect(Object.keys(allCached)).toHaveLength(0);
    });

    it('should handle removing non-existent user gracefully', () => {
      // Should not throw an error
      expect(() => storage.removeUserDetails('non-existent')).not.toThrow();
    });

    it('should handle clearing when no data exists', () => {
      // Should not throw an error
      expect(() => storage.clearAllUserDetails()).not.toThrow();
    });

    it('should handle corrupted localStorage data gracefully', () => {
      // Set corrupted data directly
      localStorage.setItem('user_details', 'invalid json {{{');

      // Should not throw and return empty object
      const result = storage.getAllCachedUsers();
      expect(result).toEqual({});
    });

    it('should handle expired cache data', () => {
      // Save user with a very old timestamp by manipulating localStorage directly
      const expiredData = {
        '1': {
          user: mockUser,
          timestamp: Date.now() - 25 * 60 * 60 * 1000, // 25 hours ago (expired)
        },
      };
      localStorage.setItem('user_details', JSON.stringify(expiredData));

      // Should return null for expired data
      const result = storage.getUserDetails('1');
      expect(result).toBeNull();
    });

    it('should return valid data within cache expiry period', () => {
      // Save user with recent timestamp
      const validData = {
        '1': {
          user: mockUser,
          timestamp: Date.now() - 1 * 60 * 60 * 1000, // 1 hour ago (valid)
        },
      };
      localStorage.setItem('user_details', JSON.stringify(validData));

      const result = storage.getUserDetails('1');
      expect(result).toEqual(mockUser);
    });
  });
});
