// Mock para a autenticação
import { LoginRequest, LoginResponse, User, RegisterRequest } from '../services/authService';

// Usuário de teste
const mockUser: User = {
  id: 1,
  name: 'Usuário de Teste',
  email: 'teste@example.com',
  role: 'user'
};

// Credenciais de teste
const validCredentials = {
  email: 'teste@example.com',
  password: '123456'
};

// Função de login mock
export const mockLogin = (credentials: LoginRequest): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email === validCredentials.email && credentials.password === validCredentials.password) {
        const response: LoginResponse = {
          access_token: 'mock-token-123456',
          token_type: 'bearer'
        };
        localStorage.setItem('authToken', response.access_token);
        localStorage.setItem('mockUser', JSON.stringify(mockUser));
        resolve(response);
      } else {
        reject({
          response: {
            status: 401,
            data: { detail: 'Email ou senha incorretos' }
          }
        });
      }
    }, 500);
  });
};

// Função de registro mock
export const mockRegister = (userData: RegisterRequest): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser: User = {
        id: 2,
        name: userData.name,
        email: userData.email,
        role: userData.role
      };
      localStorage.setItem('mockUser', JSON.stringify(newUser));
      resolve(newUser);
    }, 500);
  });
};

// Função para obter usuário atual mock
export const mockGetCurrentUser = (): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = localStorage.getItem('mockUser');
      if (user) {
        resolve(JSON.parse(user));
      } else {
        reject({
          response: {
            status: 401,
            data: { detail: 'Não autenticado' }
          }
        });
      }
    }, 500);
  });
};
