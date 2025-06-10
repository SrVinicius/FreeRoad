import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import {
  Container,
  MainContent,
  Title,
  ButtonGroup,
  PrimaryButton,
  SecondaryButton,
} from './AboutScreenStyle';

const AboutScreen: React.FC = () => {
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
    <Container>
      <Header />
      <MainContent>
        <Title>autonomia e eficiência minimalistas</Title>
        <ButtonGroup>
          <PrimaryButton>Conheça</PrimaryButton>
          <SecondaryButton onClick={handleAccess}>Acessar</SecondaryButton>
        </ButtonGroup>
      </MainContent>
    </Container>
  );
};

export default AboutScreen;