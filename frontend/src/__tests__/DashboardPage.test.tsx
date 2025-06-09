import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardPage from '../features/dashboard/DashboardPage';

describe('DashboardPage Component', () => {
  it('renders the dashboard content', () => {
    // Renderiza o componente
    render(<DashboardPage />);

    // Verifica se o título "oiiii" está presente
    expect(screen.getByText(/oiiii/i)).toBeInTheDocument();
  });
});