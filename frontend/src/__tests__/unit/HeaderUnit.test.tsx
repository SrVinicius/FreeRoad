// import { describe, it, expect, vi, beforeEach } from 'vitest';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import Header from '../../components/Header/Header';

// let mockNavigate: ReturnType<typeof vi.fn>;

// // Configura o mock antes de cada teste para que 'mockNavigate' fique definido
// beforeEach(() => {
//   mockNavigate = vi.fn();
//   vi.mock('react-router-dom', async () => {
//     const actual = await vi.importActual('react-router-dom');
//     return {
//       ...actual,
//       useNavigate: () => mockNavigate,
//     };
//   });
// });

// describe('Header navigation behavior', () => {
//   it('redirects to /dashboard if token exists', () => {
//     localStorage.setItem('authToken', 'token123');

//     render(
//       <MemoryRouter>
//         <Header />
//       </MemoryRouter>
//     );

//     const accessLink = screen.getByText(/Acessar/i);
//     fireEvent.click(accessLink);

//     // Verifica se foi chamado com '/dashboard'
//     expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
//   });

//   it('redirects to /login if token does not exist', () => {
//     localStorage.removeItem('authToken');

//     render(
//       <MemoryRouter>
//         <Header />
//       </MemoryRouter>
//     );

//     const accessLink = screen.getByText(/Acessar/i);
//     fireEvent.click(accessLink);

//     // Verifica se foi chamado com '/login'
//     expect(mockNavigate).toHaveBeenCalledWith('/login');
//   });
// });