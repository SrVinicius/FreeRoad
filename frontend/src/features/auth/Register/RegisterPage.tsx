import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  RegisterScreen,
  RegisterContainer,
  Logo,
  RegisterCard,
  Title,
  Subtitle,
  InputGroup,
  Button,
} from './RegisterPageStyle';
import * as authService from '../../../services/authService';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Chamar API de registro
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'user' // Papel padrão para novos usuários
      });
      
      // Após o registro bem-sucedido, fazer login
      await authService.login({
        email: formData.email,
        password: formData.password
      });
      
      // Redirecionar para o dashboard
      navigate('/dashboard');
    } catch (err: unknown) {
      console.error('Erro ao registrar:', err);
      if (err && typeof err === 'object' && 'response' in err && 
          err.response && typeof err.response === 'object' && 
          'data' in err.response && err.response.data && 
          typeof err.response.data === 'object' && 'detail' in err.response.data) {
        setError(String(err.response.data.detail));
      } else {
        setError('Erro ao registrar. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterScreen>
      <RegisterContainer>
        <Logo>FreeRoad</Logo>
        <RegisterCard>
          <Title>Registrar</Title>
          <Subtitle>Crie sua conta para acessar o sistema</Subtitle>
          {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <label>Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </InputGroup>
            <InputGroup>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </InputGroup>
            <InputGroup>
              <label>Senha</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </InputGroup>
            <Button type="submit" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrar'}
            </Button>
            
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#555' }}>
                Já tem uma conta? <Link to="/login" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>Faça login</Link>
              </p>
            </div>
          </form>
        </RegisterCard>
      </RegisterContainer>
    </RegisterScreen>
  );
};

export default RegisterPage;