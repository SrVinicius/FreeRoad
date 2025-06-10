import styled from 'styled-components';

export const RegisterScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Centraliza verticalmente */
  width: 100%;
  background: #f9f9f9; /* Fundo claro */
`;

export const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 420px; /* Define largura máxima */
`;

export const Logo = styled.div`
  font-size: 48px;
  font-weight: 400;
  margin-bottom: 30px;
  color: #000;
`;

export const RegisterCard = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 35px 32px;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  background: #fff;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 2px;
  text-align: center; /* Centraliza o texto */
`;

export const Subtitle = styled.p`
  color: #9e9e9e;
  font-size: 15px;
  margin-bottom: 20px;
  text-align: center; /* Centraliza o texto */
`;

export const InputGroup = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    font-size: 16px;
    margin-bottom: 8px;
    color: #000;
  }

  input {
    width: 100%;
    height: 45px;
    padding: 0 12px;
    border: 1px solid #e2e2e2;
    border-radius: 6px;
    font-size: 16px;
    outline: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 48px;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 8px;
  background: #000;

  &:hover {
    background: #333;
  }
`;