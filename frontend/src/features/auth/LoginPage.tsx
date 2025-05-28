import React, { useState } from 'react';
import Input from '../../components/input';
import '../../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login:', { email, password });
  };

  return (
    <div className="login-container">
      <h1>FreeRoad</h1>
      <div className="login-card">
        <h2>Login</h2>
        <p>Utilize suas credenciais para acessar sua conta</p>
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
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;