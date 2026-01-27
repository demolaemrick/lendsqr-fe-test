import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatCard from './StatCard';
import { UsersIcon } from '../../assets/icons';

describe('StatCard Component', () => {
  // ==================
  // POSITIVE SCENARIOS
  // ==================

  describe('Positive Scenarios', () => {
    it('should render with label, value, and icon', () => {
      render(
        <StatCard
          label="USERS"
          value={2500}
          icon={<UsersIcon />}
          color="pink"
        />,
      );

      expect(screen.getByText('USERS')).toBeInTheDocument();
      expect(screen.getByText('2,500')).toBeInTheDocument();
    });

    it('should render the icon container with correct color class', () => {
      const { container } = render(
        <StatCard
          label="Active Users"
          value={1200}
          icon={<UsersIcon />}
          color="purple"
        />,
      );

      const iconWrapper = container.querySelector('.stat-card__icon');
      expect(iconWrapper).toBeInTheDocument();
      expect(iconWrapper).toHaveClass('stat-card__icon--purple');
    });

    it('should display numeric values correctly formatted', () => {
      render(
        <StatCard
          label="Users with Loans"
          value={12453}
          icon={<UsersIcon />}
          color="orange"
        />,
      );

      expect(screen.getByText('12,453')).toBeInTheDocument();
    });

    it('should display label text', () => {
      render(
        <StatCard
          label="USERS WITH SAVINGS"
          value={102453}
          icon={<UsersIcon />}
          color="red"
        />,
      );

      expect(screen.getByText('USERS WITH SAVINGS')).toBeInTheDocument();
    });

    it('should have correct structure of elements', () => {
      const { container } = render(
        <StatCard
          label="Test Label"
          value={100}
          icon={<UsersIcon />}
          color="pink"
        />,
      );

      expect(container.querySelector('.stat-card')).toBeInTheDocument();
      expect(container.querySelector('.stat-card__icon')).toBeInTheDocument();
      expect(container.querySelector('.stat-card__label')).toBeInTheDocument();
      expect(container.querySelector('.stat-card__value')).toBeInTheDocument();
    });

    it('should apply different color classes correctly', () => {
      const colors = ['pink', 'purple', 'orange', 'red'] as const;

      colors.forEach((color) => {
        const { container, unmount } = render(
          <StatCard
            label="Test"
            value={100}
            icon={<UsersIcon />}
            color={color}
          />,
        );
        expect(
          container.querySelector(`.stat-card__icon--${color}`),
        ).toBeInTheDocument();
        unmount();
      });
    });
  });

  // ==================
  // NEGATIVE SCENARIOS
  // ==================

  describe('Negative Scenarios', () => {
    it('should handle zero value', () => {
      render(
        <StatCard
          label="No Users"
          value={0}
          icon={<UsersIcon />}
          color="pink"
        />,
      );

      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should handle large numbers with proper formatting', () => {
      render(
        <StatCard
          label="Total Users"
          value={1000000000}
          icon={<UsersIcon />}
          color="pink"
        />,
      );

      expect(screen.getByText('1,000,000,000')).toBeInTheDocument();
    });

    it('should handle small numbers', () => {
      render(
        <StatCard
          label="Few Users"
          value={5}
          icon={<UsersIcon />}
          color="pink"
        />,
      );

      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should render without crashing when icon is complex SVG', () => {
      const complexIcon = (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v12M6 12h12" />
        </svg>
      );

      const { container } = render(
        <StatCard
          label="Complex Icon"
          value={500}
          icon={complexIcon}
          color="purple"
        />,
      );

      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should format negative numbers correctly', () => {
      render(
        <StatCard
          label="Deficit"
          value={-1000}
          icon={<UsersIcon />}
          color="red"
        />,
      );

      expect(screen.getByText('-1,000')).toBeInTheDocument();
    });
  });
});
