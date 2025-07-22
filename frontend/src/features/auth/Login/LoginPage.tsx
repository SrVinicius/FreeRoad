import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from './LoginPageStyle';
import * as authService from '../../../services/authService';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    try {
      console.log('Tentando login com:', { email, password });
      
      // Chamar a API de login
      await authService.login({ email, password });
      
      // Redirecionar para o dashboard após o login bem-sucedido
      navigate('/dashboard');
    } catch (err: unknown) {
      // Tratar erro de login
      console.error('Erro de login:', err);
      
      if (err && typeof err === 'object') {
        if ('response' in err && err.response && typeof err.response === 'object') {
          const response = err.response;
          
          if ('status' in response) {
            const status = response.status as number;
            
            if (status === 401) {
              setError('Email ou senha incorretos');
            } else if (status === 400) {
              if ('data' in response && response.data && typeof response.data === 'object' && 'detail' in response.data) {
                setError(`Erro: ${response.data.detail}`);
              } else {
                setError('Dados inválidos. Verifique seu email e senha.');
              }
            } else if (status === 422) {
              if ('data' in response && response.data && typeof response.data === 'object' && 'detail' in response.data) {
                console.log('Erro 422 detalhes:', response.data);
                
                // Verificar se há detalhes do erro em formato de array
                if (Array.isArray(response.data.detail)) {
                  const errorMessages = response.data.detail
                    .map((err: {msg?: string; type?: string}) => err.msg || 'Erro desconhecido')
                    .join(', ');
                  setError(`Erro de validação: ${errorMessages}`);
                } else if (typeof response.data.detail === 'string') {
                  setError(`Erro de validação: ${response.data.detail}`);
                } else {
                  setError('Formato de dados inválido. Verifique seu email e senha.');
                }
              } else {
                setError('Dados inválidos para processamento. Verifique seu email e senha.');
              }
            } else {
              setError(`Erro do servidor: ${status}`);
            }
          } else {
            setError('Erro ao fazer login. Resposta inválida do servidor.');
          }
        } else if ('message' in err && typeof err.message === 'string') {
          if (err.message.includes('Network Error') || err.message.includes('Failed to fetch')) {
            setError('Erro de conexão. Verifique sua internet ou tente mais tarde.');
          } else {
            setError(`Erro: ${err.message}`);
          }
        } else {
          setError('Erro desconhecido ao fazer login.');
        }
      } else {
        setError('Erro ao fazer login. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
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
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </InputGroup>
              <InputGroup>
                <label htmlFor="password">Senha</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
              </InputGroup>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <Button type="submit" disabled={loading}>
                {loading ? 'Entrando...' : 'Login'}
              </Button>
              
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#666' }}>Ou use uma conta de teste</p>
                <button 
                  type="button" 
                  style={{
                    padding: '8px 12px',
                    background: '#3498db',
                    border: 'none',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer',
                    marginTop: '8px'
                  }}
                  onClick={() => {
                    setEmail('user@example.com');
                    setPassword('StrongPass@123');
                  }}
                >
                  Clique para acessar com usuário cadastrado no banco de dados
                </button>
              </div>
            </form>
          </LoginCard>
        </LoginContainer>
      </LoginScreen>
    </>
  );
};

export default LoginPage;