import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from './api';

// Mock faker since it's used in api.ts
vi.mock('@faker-js/faker', () => ({
  faker: {
    seed: vi.fn(),
    person: {
      firstName: vi.fn().mockReturnValue('John'),
      lastName: vi.fn().mockReturnValue('Doe'),
      fullName: vi.fn().mockReturnValue('John Doe'),
    },
    internet: {
      username: vi.fn().mockReturnValue('johndoe'),
      email: vi.fn().mockReturnValue('john.doe@example.com'),
    },
    phone: {
      number: vi.fn().mockReturnValue('08012345678'),
    },
    date: {
      past: vi.fn().mockReturnValue(new Date('2024-01-01')),
    },
    string: {
      alphanumeric: vi.fn().mockReturnValue('abc123'),
      numeric: vi.fn().mockReturnValue('1234567890'),
    },
    number: {
      int: vi.fn().mockReturnValue(100),
    },
    helpers: {
      arrayElement: vi.fn((arr) => arr[0]),
    },
  },
}));

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ==================
  // POSITIVE SCENARIOS
  // ==================

  describe('Positive Scenarios', () => {
    describe('getUsers', () => {
      it('should return paginated users', async () => {
        const result = await api.getUsers(1, 10);

        expect(result).toHaveProperty('data');
        expect(result).toHaveProperty('total');
        expect(result).toHaveProperty('page');
        expect(result).toHaveProperty('pageSize');
        expect(result).toHaveProperty('totalPages');
        expect(result.page).toBe(1);
        expect(result.pageSize).toBe(10);
      });

      it('should return correct total of 500 users', async () => {
        const result = await api.getUsers(1, 10);

        expect(result.total).toBe(500);
        expect(result.totalPages).toBe(50);
      });

      it('should paginate correctly', async () => {
        const page1 = await api.getUsers(1, 10);
        const page2 = await api.getUsers(2, 10);

        expect(page1.page).toBe(1);
        expect(page2.page).toBe(2);
        expect(page1.data).toHaveLength(10);
        expect(page2.data).toHaveLength(10);
      });

      it('should use default values when no params provided', async () => {
        const result = await api.getUsers();

        expect(result.page).toBe(1);
        expect(result.pageSize).toBe(10);
      });
    });

    describe('getAllUsers', () => {
      it('should return all 500 users', async () => {
        const result = await api.getAllUsers();

        expect(Array.isArray(result)).toBe(true);
        expect(result).toHaveLength(500);
      });

      it('should return users with correct structure', async () => {
        const result = await api.getAllUsers();
        const user = result[0];

        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('organization');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('status');
        expect(user).toHaveProperty('fullName');
      });
    });

    describe('getUserById', () => {
      it('should return user by ID', async () => {
        const result = await api.getUserById('1');

        expect(result).not.toBeNull();
        expect(result?.id).toBe('1');
      });

      it('should return user with all required properties', async () => {
        const user = await api.getUserById('1');

        expect(user).toHaveProperty('fullName');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('phoneNumber');
        expect(user).toHaveProperty('guarantors');
      });
    });

    describe('getStats', () => {
      it('should return user statistics', async () => {
        const result = await api.getStats();

        expect(result).toHaveProperty('users');
        expect(result).toHaveProperty('activeUsers');
        expect(result).toHaveProperty('usersWithLoans');
        expect(result).toHaveProperty('usersWithSavings');
      });

      it('should return correct total user count', async () => {
        const result = await api.getStats();

        expect(result.users).toBe(500);
      });

      it('should return numeric values for all stats', async () => {
        const result = await api.getStats();

        expect(typeof result.users).toBe('number');
        expect(typeof result.activeUsers).toBe('number');
        expect(typeof result.usersWithLoans).toBe('number');
        expect(typeof result.usersWithSavings).toBe('number');
      });
    });
  });

  // ==================
  // NEGATIVE SCENARIOS
  // ==================

  describe('Negative Scenarios', () => {
    describe('getUsers', () => {
      it('should return empty data array for out of range page', async () => {
        const result = await api.getUsers(1000, 10);

        expect(result.data).toHaveLength(0);
        expect(result.total).toBe(500);
      });

      it('should handle page 0 gracefully', async () => {
        const result = await api.getUsers(0, 10);

        // Page 0 would calculate negative start index, but slice handles it
        expect(result.page).toBe(0);
        expect(Array.isArray(result.data)).toBe(true);
      });

      it('should handle negative page number', async () => {
        const result = await api.getUsers(-1, 10);

        expect(Array.isArray(result.data)).toBe(true);
      });

      it('should handle very large page size', async () => {
        const result = await api.getUsers(1, 1000);

        // Should return all 500 users since pageSize > total
        expect(result.data.length).toBeLessThanOrEqual(500);
      });

      it('should handle zero page size', async () => {
        const result = await api.getUsers(1, 0);

        expect(result.data).toHaveLength(0);
        expect(result.pageSize).toBe(0);
      });
    });

    describe('getUserById', () => {
      it('should return null for non-existent user ID', async () => {
        const result = await api.getUserById('9999');

        expect(result).toBeNull();
      });

      it('should return null for empty ID', async () => {
        const result = await api.getUserById('');

        expect(result).toBeNull();
      });

      it('should return null for invalid ID format', async () => {
        const result = await api.getUserById('invalid-id');

        expect(result).toBeNull();
      });

      it('should handle special characters in ID', async () => {
        const result = await api.getUserById('<script>alert(1)</script>');

        expect(result).toBeNull();
      });
    });

    describe('getStats', () => {
      it('should always return non-negative values', async () => {
        const result = await api.getStats();

        expect(result.users).toBeGreaterThanOrEqual(0);
        expect(result.activeUsers).toBeGreaterThanOrEqual(0);
        expect(result.usersWithLoans).toBeGreaterThanOrEqual(0);
        expect(result.usersWithSavings).toBeGreaterThanOrEqual(0);
      });

      it('should have active users less than or equal to total users', async () => {
        const result = await api.getStats();

        expect(result.activeUsers).toBeLessThanOrEqual(result.users);
      });
    });
  });
});
