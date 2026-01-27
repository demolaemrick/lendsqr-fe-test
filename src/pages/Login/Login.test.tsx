import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ==================
  // POSITIVE SCENARIOS
  // ==================

  describe('Positive Scenarios', () => {
    it('should render the login form correctly', () => {
      renderLogin();

      expect(screen.getByText('Welcome!')).toBeInTheDocument();
      expect(screen.getByText('Enter details to login.')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /log in/i }),
      ).toBeInTheDocument();
    });

    it('should allow user to type email', () => {
      renderLogin();

      const emailInput = screen.getByPlaceholderText('Email');
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

      expect(emailInput).toHaveValue('test@example.com');
    });

    it('should allow user to type password', () => {
      renderLogin();

      const passwordInput = screen.getByPlaceholderText('Password');
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      expect(passwordInput).toHaveValue('password123');
    });

    it('should toggle password visibility when SHOW/HIDE is clicked', () => {
      renderLogin();

      const passwordInput = screen.getByPlaceholderText('Password');
      const toggleButton = screen.getByText('SHOW');

      // Initially password should be hidden
      expect(passwordInput).toHaveAttribute('type', 'password');

      // Click to show password
      fireEvent.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'text');
      expect(screen.getByText('HIDE')).toBeInTheDocument();

      // Click to hide password again
      fireEvent.click(screen.getByText('HIDE'));
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('should navigate to dashboard on successful form submission', async () => {
      renderLogin();

      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: /log in/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard/users');
      });
    });

    it('should display the logo and illustration', () => {
      renderLogin();

      const logo = screen.getByAltText('Lendsqr');
      const illustration = screen.getByAltText('Welcome illustration');

      expect(logo).toBeInTheDocument();
      expect(illustration).toBeInTheDocument();
    });

    it('should have a forgot password link', () => {
      renderLogin();

      expect(screen.getByText('FORGOT PASSWORD?')).toBeInTheDocument();
    });
  });

  // ==================
  // NEGATIVE SCENARIOS
  // ==================

  describe('Negative Scenarios', () => {
    it('should not navigate without filling email', async () => {
      renderLogin();

      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: /log in/i });

      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      // The form has required fields, so browser validation should prevent submission
      // We check that navigate wasn't called
      fireEvent.click(submitButton);

      // Wait a bit and verify navigate was not called
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('should not navigate without filling password', async () => {
      renderLogin();

      const emailInput = screen.getByPlaceholderText('Email');
      const submitButton = screen.getByRole('button', { name: /log in/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

      fireEvent.click(submitButton);

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('should not navigate with empty form', async () => {
      renderLogin();

      const submitButton = screen.getByRole('button', { name: /log in/i });
      fireEvent.click(submitButton);

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('should require valid email format', () => {
      renderLogin();

      const emailInput = screen.getByPlaceholderText(
        'Email',
      ) as HTMLInputElement;
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

      // HTML5 validation - the input should be invalid
      expect(emailInput.validity.valid).toBe(false);
    });

    it('should have email input with required attribute', () => {
      renderLogin();

      const emailInput = screen.getByPlaceholderText('Email');
      expect(emailInput).toHaveAttribute('required');
    });

    it('should have password input with required attribute', () => {
      renderLogin();

      const passwordInput = screen.getByPlaceholderText('Password');
      expect(passwordInput).toHaveAttribute('required');
    });
  });
});
