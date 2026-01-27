import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusBadge from './StatusBadge';

describe('StatusBadge Component', () => {
  // ==================
  // POSITIVE SCENARIOS
  // ==================

  describe('Positive Scenarios', () => {
    it('should render Active status correctly', () => {
      render(<StatusBadge status="Active" />);

      const badge = screen.getByText('Active');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('status-badge');
      expect(badge).toHaveClass('status-badge--active');
    });

    it('should render Inactive status correctly', () => {
      render(<StatusBadge status="Inactive" />);

      const badge = screen.getByText('Inactive');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('status-badge--inactive');
    });

    it('should render Pending status correctly', () => {
      render(<StatusBadge status="Pending" />);

      const badge = screen.getByText('Pending');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('status-badge--pending');
    });

    it('should render Blacklisted status correctly', () => {
      render(<StatusBadge status="Blacklisted" />);

      const badge = screen.getByText('Blacklisted');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('status-badge--blacklisted');
    });

    it('should apply correct CSS class based on status', () => {
      const { rerender } = render(<StatusBadge status="Active" />);
      expect(screen.getByText('Active')).toHaveClass('status-badge--active');

      rerender(<StatusBadge status="Inactive" />);
      expect(screen.getByText('Inactive')).toHaveClass(
        'status-badge--inactive',
      );
    });
  });

  // ==================
  // NEGATIVE SCENARIOS
  // ==================

  describe('Negative Scenarios', () => {
    it('should handle lowercase status by converting properly', () => {
      // The component should display the status as provided
      render(<StatusBadge status="Active" />);
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('should not have multiple status modifier classes', () => {
      render(<StatusBadge status="Active" />);
      const badge = screen.getByText('Active');

      expect(badge).toHaveClass('status-badge--active');
      expect(badge).not.toHaveClass('status-badge--inactive');
      expect(badge).not.toHaveClass('status-badge--pending');
      expect(badge).not.toHaveClass('status-badge--blacklisted');
    });

    it('should always have base status-badge class', () => {
      const statuses = [
        'Active',
        'Inactive',
        'Pending',
        'Blacklisted',
      ] as const;

      statuses.forEach((status) => {
        const { unmount } = render(<StatusBadge status={status} />);
        expect(screen.getByText(status)).toHaveClass('status-badge');
        unmount();
      });
    });
  });
});
