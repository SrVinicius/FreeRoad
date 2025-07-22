import { API_URL } from './api';
import { mockLogin, mockRegister, mockGetCurrentUser } from '../mocks/authMock';

// Interfaces para tipagem
export interface LoginRequest {
  email: string;  // Nome do campo correto na API também é 'email'
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

// Função para fazer login
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    // Debug para verificar se os dados estão corretos
    console.log('Credenciais recebidas para login:', JSON.stringify(credentials));
    
    // Vamos enviar diretamente como JSON já que a API espera um objeto
    const loginData = {
      email: credentials.email, // O campo esperado pela API é 'email' e não 'username'
      password: credentials.password
    };
    
    // Debug para verificar o que está sendo enviado
    console.log('Enviando para API:', JSON.stringify(loginData));
    
    // Use fetch para o request com Content-Type: application/json
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(loginData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw {
        response: {
          status: response.status,
          data: errorData
        }
      };
    }
    
    const data = await response.json() as LoginResponse;
    
    // Salvar o token no localStorage
    if (data.access_token) {
      localStorage.setItem('authToken', data.access_token);
    }
    
    return data;
  }  catch (error: unknown) {
    console.error('Erro ao fazer login:', error);
    
    // Se o erro for de CORS ou API indisponível, tentar usar o mock
    if (error && typeof error === 'object') {
      if ('message' in error && typeof error.message === 'string' && 
          (error.message.includes('Network Error') || 
           error.message.includes('CORS') ||
           error.message.includes('Failed to fetch') ||
           error.message.includes('NetworkError'))) {
        console.log('Erro de rede detectado. Usando mock para login como fallback.');
        return await mockLogin(credentials);
      }
      
      // Se for um erro de resposta e tivermos os detalhes, vamos logar para depuração
      if ('response' in error && error.response && typeof error.response === 'object') {
        console.error('Detalhes do erro de login:', error.response);
        
        // Verificar especificamente erros 422
        if ('status' in error.response && error.response.status === 422 && 'data' in error.response) {
          console.error('Erro de validação (422):', error.response.data);
        }
      }
    }
    
    throw error;
  }
};

// Função para registrar um novo usuário
export const register = async (userData: RegisterRequest): Promise<User> => {
  try {
    // Enviar requisição de registro para a API
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw {
        response: {
          status: response.status,
          data: errorData
        }
      };
    }
    
    const data = await response.json();
    return data.user;
    
  } catch (error: unknown) {
    console.error('Erro ao registrar usuário:', error);
    
    // Se o erro for de CORS ou API indisponível, tentar usar o mock
    if (error && typeof error === 'object') {
      if ('message' in error && typeof error.message === 'string' && 
          (error.message.includes('Network Error') || error.message.includes('CORS') || 
           error.message.includes('Failed to fetch'))) {
        console.log('Erro de rede detectado. Usando mock para registro.');
        return await mockRegister(userData);
      }
      
      // Se for um erro de resposta e tivermos os detalhes, vamos logar para depuração
      if ('response' in error && error.response && typeof error.response === 'object') {
        console.error('Detalhes do erro de registro:', error.response);
      }
    }
    
    throw error;
  }
};

// Função para obter os dados do usuário logado
export const getCurrentUser = async (): Promise<User> => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }
    
    // Fazer requisição para obter dados do usuário
    const response = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        // Se o token estiver inválido, remover do localStorage
        localStorage.removeItem('authToken');
      }
      
      const errorData = await response.json();
      throw {
        response: {
          status: response.status,
          data: errorData
        }
      };
    }
    
    const data = await response.json();
    return data;
    
  } catch (error: unknown) {
    console.error('Erro ao obter dados do usuário:', error);
    
    // Se o erro for de CORS ou API indisponível, tentar usar o mock
    if (error && typeof error === 'object') {
      if ('message' in error && typeof error.message === 'string' && 
          (error.message.includes('Network Error') || error.message.includes('CORS') || 
           error.message.includes('Failed to fetch'))) {
        console.log('Erro de rede detectado. Usando mock para obter usuário.');
        return await mockGetCurrentUser();
      }
      
      // Se for um erro de resposta e tivermos os detalhes, vamos logar para depuração
      if ('response' in error && error.response && typeof error.response === 'object') {
        console.error('Detalhes do erro ao obter usuário:', error.response);
      }
    }
    
    throw error;
  }
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('authToken');
  return token !== null && token !== '';
};

// Função para fazer logout
export const logout = (): void => {
  localStorage.removeItem('authToken');
};

// Função para testar a autenticação com credenciais válidas
export const testValidLogin = async (): Promise<LoginResponse> => {
  // Usando credenciais válidas para teste
  return await login({
    email: 'user@example.com',
    password: 'StrongPass@123'
  });
};

// Os interceptors já estão configurados no arquivo api.ts