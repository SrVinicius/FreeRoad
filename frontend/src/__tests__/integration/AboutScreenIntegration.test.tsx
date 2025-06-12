import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest'; 
import AboutScreen from '../../features/About/AboutScreen';

const mockNavigate = vi.fn(); 
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate, 
}));

describe('AboutScreen Integration Tests', () => {
  beforeEach(() => {
    mockNavigate.mockClear(); 
  });

  it('redirects to login when clicking "Acessar" without a token', () => {
    localStorage.removeItem('authToken'); 

    render(<AboutScreen />);
    const acessarButton = screen.getByRole('button', { name: /Acessar/i }); 
    fireEvent.click(acessarButton);

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('redirects to dashboard when clicking "Acessar" with a token', () => {
    localStorage.setItem('authToken', 'test-token'); 

    render(<AboutScreen />);
    const acessarButton = screen.getByRole('button', { name: /Acessar/i }); 
    fireEvent.click(acessarButton);

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});