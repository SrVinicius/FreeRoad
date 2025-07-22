// import { render, screen } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom'; 
// import AboutScreen from '../../features/About/AboutScreen';

// describe('AboutScreen Component', () => {
//   it('renders the title', () => {
//     render(
//       <MemoryRouter>
//         <AboutScreen />
//       </MemoryRouter>
//     );
//     const title = screen.getByText(/autonomia e eficiência minimalistas/i);
//     expect(title).toBeInTheDocument();
//   });

//   it('renders the buttons', () => {
//     render(
//       <MemoryRouter>
//         <AboutScreen />
//       </MemoryRouter>
//     );
//     const conhecaButton = screen.getByRole('button', { name: /Conheça/i });
//     const acessarButton = screen.getByRole('button', { name: /Acessar/i });
//     expect(conhecaButton).toBeInTheDocument();
//     expect(acessarButton).toBeInTheDocument();
//   });
// });