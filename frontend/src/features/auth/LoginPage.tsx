import React, { useState } from 'react';
import {
  GlobalStyles,
  LoginScreen,
  LoginContainer,
  Logo,
  LoginCard,
  Title,
  Subtitle,
  InputGroup,
  Button,
} from '../../styles/LoginPage';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email === 'vivitata@gmail.com' && password === 'vivitata') {
      localStorage.setItem('authToken', 'your-auth-token'); 
      window.location.href = '/dashboard'; 
    } else {
      setError('Credenciais inválidas');
    }
  };

  return (
    <>
      <GlobalStyles />
      <LoginScreen>
        <LoginContainer>
          <Logo>FreeRoad</Logo>
          <LoginCard>
            <Title>Login</Title>
            <Subtitle>Utilize suas credenciais para acessar sua conta</Subtitle>
            <form onSubmit={handleSubmit}>
              <InputGroup>
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
              <InputGroup>
                <label>Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <Button type="submit">Login</Button>
            </form>
          </LoginCard>
        </LoginContainer>
      </LoginScreen>
    </>
  );
};

export default LoginPage;