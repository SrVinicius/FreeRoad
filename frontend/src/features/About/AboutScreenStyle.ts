import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  background-color: #fff; /* Fundo branco */
  color: #000; /* Texto preto */
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
`;

export const Logo = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #000; 
`;

export const AccessLink = styled.span`
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
  color: #000; 

  &:hover {
    color: #555; 
  }
`;

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 90%;
  max-width: 800px;
  margin: auto;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 40px;
  color: #000; 
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;

export const PrimaryButton = styled.button`
  background-color: #000; 
  color: #fff; 
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

export const SecondaryButton = styled.button`
  background-color: transparent;
  color: #000; 
  border: 2px solid #000; 
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #000; 
    color: #fff; 
  }
`;