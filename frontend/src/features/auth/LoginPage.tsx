import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/input';
import '../../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    // Simulação de autenticação
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email === 'vivitata@gmail.com' && password === 'vivitata') {
          resolve();
        } else {
          reject(new Error('Credenciais inválidas'));
        }
      }, 1000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  try {
    if (email === 'vivitata@gmail.com' && password === 'vivitata') {
      localStorage.setItem('authToken', 'your-auth-token');
      window.location.href = '/dashboard'; 
    } else {
      setError('Credenciais inválidas');
    }
  } catch (err) {
    setError('Erro ao tentar fazer login');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="login-container">
      <h1>FreeRoad</h1>
      <div className="login-card">
        <h2>Login</h2>
        <p>Utilize suas credenciais para acessar sua conta</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;