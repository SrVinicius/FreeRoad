import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage';

describe('LoginPage Component', () => {
  it('renders the login form', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Verifica se os elementos do formulário estão presentes
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('shows an error message for invalid credentials', async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Preenche os campos de email e senha com credenciais inválidas
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid@example.com' } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: 'wrongpassword' } });

    // Clica no botão de login
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Verifica se a mensagem de erro é exibida
    expect(await screen.findByText(/Credenciais inválidas/i)).toBeInTheDocument();
  });

  it('redirects to dashboard on successful login', async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Preenche os campos de email e senha com credenciais válidas
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'vivitata@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: 'vivitata' } });

    // Clica no botão de login
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Verifica se o redirecionamento ocorreu
    expect(await screen.findByText(/oiiii/i)).toBeInTheDocument();
  });
});