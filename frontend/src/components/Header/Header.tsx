import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderContainer, Logo, AccessLink } from './HeaderStyle';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleAccess = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/dashboard'); 
    } else {
      navigate('/login'); 
    }
  };

  return (
    <HeaderContainer>
      <Logo>Free Road.</Logo>
      <AccessLink onClick={handleAccess}>Acessar</AccessLink>
    </HeaderContainer>
  );
};

export default Header;