import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Importa o MemoryRouter
import Header from '../../components/Header/Header';

describe('Header Component', () => {
  it('renders the logo', () => {
    render(
      <MemoryRouter> 
        <Header />
      </MemoryRouter>
    );
    const logo = screen.getByText(/Free Road./i);
    expect(logo).toBeInTheDocument();
  });

  it('renders the access link', () => {
    render(
      <MemoryRouter> 
        <Header />
      </MemoryRouter>
    );
    const accessLink = screen.getByText(/Acessar/i);
    expect(accessLink).toBeInTheDocument();
  });
});