import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// URL base da API
export const API_URL = 'https://freeroad-api-latest.onrender.com';

// Configurando o Axios com URL base e opções CORS
const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

// Interceptor para adicionar token de autenticação em todas as requisições
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Se o erro for 401 (não autorizado), pode ser que o token esteja expirado
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      // Redirecionar para a página de login se necessário
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Função para verificar se a API está disponível
export const checkApiStatus = async (): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.error('API não está disponível:', error);
    return false;
  }
};

export default api;
