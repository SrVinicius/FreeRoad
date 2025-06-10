import styled from 'styled-components';

export const GlobalStyles = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f9f9f9;
  }
`;

export const LoginScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: #fff;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 52vh; 
`;

export const Logo = styled.div`
  font-size: 48px;
  font-weight: 400;
  margin-bottom: 30px;
  color: #000;
`;

export const LoginCard = styled.div`
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
`;

export const Subtitle = styled.p`
  color: #9e9e9e;
  font-size: 15px;
  margin-bottom: 20px;
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
`;