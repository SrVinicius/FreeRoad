import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook de navegação
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

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Inicializa o hook de navegação

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    // Simula o registro e redireciona para a dashboard
    localStorage.setItem('authToken', 'your-auth-token'); // Salva um token de autenticação
    navigate('/dashboard'); // Redireciona para a rota da dashboard
  };

  return (
    <RegisterScreen>
      <RegisterContainer>
        <Logo>FreeRoad</Logo>
        <RegisterCard>
          <Title>Registrar</Title>
          <Subtitle>Crie sua conta para acessar o sistema</Subtitle>
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <label>Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                required
              />
            </InputGroup>
            <Button type="submit">Registrar</Button>
          </form>
        </RegisterCard>
      </RegisterContainer>
    </RegisterScreen>
  );
};

export default RegisterPage;