// import { describe, it, expect, vi, afterEach } from 'vitest';
// import { render, screen, fireEvent, cleanup } from '@testing-library/react';
// import LoginPage from '../../features/auth/Login/LoginPage';

// const localStorageMock = (() => {
//     let store: Record<string, string> = {};
//     return {
//         getItem: (key: string) => store[key] || null,
//         setItem: (key: string, value: string) => (store[key] = value),
//         removeItem: (key: string) => delete store[key],
//         clear: () => (store = {}),
//     };
// })();

// Object.defineProperty(window, 'localStorage', { value: localStorageMock });
// Object.defineProperty(window, 'location', {
//     value: { href: '' },
//     writable: true,
// });

// describe('LoginPage', () => {
//     afterEach(() => {
//         cleanup();
//         localStorage.clear();
//         window.location.href = '';
//     });

//     it('renderiza corretamente os elementos da tela', () => {
//         render(<LoginPage />);
//         expect(screen.getByText('FreeRoad')).toBeInTheDocument();
//         expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
//         expect(screen.getByText('Utilize suas credenciais para acessar sua conta')).toBeInTheDocument();
//         expect(screen.getByLabelText('Email')).toBeInTheDocument();
//         expect(screen.getByLabelText('Senha')).toBeInTheDocument();
//         expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
//     });

//     it('atualiza os campos de email e senha', () => {
//         render(<LoginPage />);
//         const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
//         const passwordInput = screen.getByLabelText('Senha') as HTMLInputElement;
//         fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//         fireEvent.change(passwordInput, { target: { value: 'password123' } });
//         expect(emailInput.value).toBe('test@example.com');
//         expect(passwordInput.value).toBe('password123');
//     });

//     it('exibe mensagem de erro para credenciais inválidas', () => {
//         render(<LoginPage />);
//         fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'wrong@email.com' } });
//         fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'wrongpass' } });
//         fireEvent.click(screen.getByRole('button', { name: 'Login' }));
//         expect(screen.getByText('Credenciais inválidas')).toBeInTheDocument();
//         expect(localStorage.getItem('authToken')).toBeNull();
//     });

//     it('autentica com credenciais válidas e redireciona', () => {
//         render(<LoginPage />);
//         fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'vivitata@gmail.com' } });
//         fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'vivitata' } });
//         fireEvent.click(screen.getByRole('button', { name: 'Login' }));
//         expect(localStorage.getItem('authToken')).toBe('your-auth-token');
//         expect(window.location.href).toBe('/dashboard');
//     });

//     it('exibe erro quando campos estão vazios', () => {
//         render(<LoginPage />);
//         const button = screen.getByRole('button', { name: 'Login' });
//         fireEvent.click(button);
//         const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
//         const passwordInput = screen.getByLabelText('Senha') as HTMLInputElement;
//         expect(emailInput.validity.valueMissing).toBe(true);
//         expect(passwordInput.validity.valueMissing).toBe(true);
//     });
// });
