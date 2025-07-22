// import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
// import { render, screen, fireEvent, cleanup } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import RegisterPage from '../../features/auth/Register/RegisterPage';

// // Mock do useNavigate
// const mockNavigate = vi.fn();

// vi.mock('react-router-dom', async () => {
//   const actual = await vi.importActual('react-router-dom');
//   return {
//     ...actual,
//     useNavigate: () => mockNavigate,
//   };
// });

// // Mock do localStorage
// const localStorageMock = (() => {
//   let store: Record<string, string> = {};
//   return {
//     getItem: (key: string) => store[key] || null,
//     setItem: (key: string, value: string) => (store[key] = value),
//     removeItem: (key: string) => delete store[key],
//     clear: () => (store = {}),
//   };
// })();

// Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// // Função auxiliar para encontrar inputs pelo texto do label
// const getInputByLabel = (labelText: string) => {
//   const labels = screen.getAllByText(labelText);
//   for (const label of labels) {
//     if (label.parentElement) {
//       const input = label.parentElement.querySelector('input');
//       if (input) return input;
//     }
//   }
//   throw new Error(`Input não encontrado para o label: ${labelText}`);
// };

// describe('RegisterPage', () => {
//   beforeEach(() => {
//     mockNavigate.mockClear();
//     localStorage.clear();
//   });

//   afterEach(() => {
//     cleanup();
//   });

//   it('renderiza corretamente os elementos da tela', () => {
//     render(
//       <MemoryRouter>
//         <RegisterPage />
//       </MemoryRouter>
//     );
    
//     expect(screen.getByText('FreeRoad')).toBeInTheDocument();
//     expect(screen.getByRole('heading', { name: 'Registrar' })).toBeInTheDocument();
//     expect(screen.getByText('Crie sua conta para acessar o sistema')).toBeInTheDocument();
    
//     // Verifica os inputs usando a função auxiliar
//     expect(getInputByLabel('Nome')).toBeInTheDocument();
//     expect(getInputByLabel('Email')).toBeInTheDocument();
//     expect(getInputByLabel('Senha')).toBeInTheDocument();
    
//     expect(screen.getByRole('button', { name: 'Registrar' })).toBeInTheDocument();
//   });

//   it('atualiza os campos de nome, email e senha', () => {
//     render(
//       <MemoryRouter>
//         <RegisterPage />
//       </MemoryRouter>
//     );
    
//     // Busca inputs usando a função auxiliar
//     const nameInput = getInputByLabel('Nome') as HTMLInputElement;
//     const emailInput = getInputByLabel('Email') as HTMLInputElement;
//     const passwordInput = getInputByLabel('Senha') as HTMLInputElement;

//     fireEvent.change(nameInput, { target: { value: 'João Silva' } });
//     fireEvent.change(emailInput, { target: { value: 'joao@example.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'senhaSegura123' } });

//     expect(nameInput.value).toBe('João Silva');
//     expect(emailInput.value).toBe('joao@example.com');
//     expect(passwordInput.value).toBe('senhaSegura123');
//   });

//   it('submete o formulário e redireciona para a dashboard', () => {
//     render(
//       <MemoryRouter>
//         <RegisterPage />
//       </MemoryRouter>
//     );
    
//     // Preenche os campos usando a função auxiliar
//     fireEvent.change(getInputByLabel('Nome'), { target: { value: 'Maria Souza' } });
//     fireEvent.change(getInputByLabel('Email'), { target: { value: 'maria@example.com' } });
//     fireEvent.change(getInputByLabel('Senha'), { target: { value: 'outraSenha123' } });
    
//     // Submete o formulário
//     fireEvent.click(screen.getByRole('button', { name: 'Registrar' }));

//     // Verifica se o token foi salvo
//     expect(localStorage.getItem('authToken')).toBe('your-auth-token');
    
//     // Verifica o redirecionamento
//     expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
//   });

//   it('não redireciona se os campos estiverem vazios', () => {
//     render(
//       <MemoryRouter>
//         <RegisterPage />
//       </MemoryRouter>
//     );
    
//     // Tenta submeter sem preencher campos
//     fireEvent.click(screen.getByRole('button', { name: 'Registrar' }));

//     // Verifica que não houve navegação
//     expect(mockNavigate).not.toHaveBeenCalled();
    
//     // Verifica que não salvou token
//     expect(localStorage.getItem('authToken')).toBeNull();
    
//     // Busca inputs usando a função auxiliar
//     const nameInput = getInputByLabel('Nome') as HTMLInputElement;
//     const emailInput = getInputByLabel('Email') as HTMLInputElement;
//     const passwordInput = getInputByLabel('Senha') as HTMLInputElement;

//     expect(nameInput.validity.valueMissing).toBe(true);
//     expect(emailInput.validity.valueMissing).toBe(true);
//     expect(passwordInput.validity.valueMissing).toBe(true);
//   });
// });