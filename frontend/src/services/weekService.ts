import api, { checkApiStatus } from './api';
import { 
  mockGetAllWeeks, mockGetWeekById, mockCreateWeek, 
  mockDeleteWeek, mockUpdateFinalKm, mockGetWeeksByUserId 
} from '../mocks/weekMock';

// Interfaces para tipagem
export interface Week {
  id: number;
  title: string;
  kmAtual: number;
  litrosAbastecidos: number;
  custo: number;
  user_id: number;
  kmFinal?: number;
  eficiencia?: number;
}

export interface CreateWeekRequest {
  title: string;
  kmAtual: number;
  litrosAbastecidos: number;
  custo: number;
  user_id?: number;
  kmFinal?: number;
  eficiencia?: number;
}

export interface UpdateKmFinalRequest {
  final_km: number;
}

// Função para obter todos os registros do usuário
export const getAllWeeks = async (): Promise<Week[]> => {
  try {
    const isApiAvailable = await checkApiStatus();
    
    if (!isApiAvailable) {
      console.log('API indisponível. Usando mock para getAllWeeks.');
      return await mockGetAllWeeks();
    }
    
    const response = await api.get<Week[]>('/weeks/');
    return response.data;
  } catch (error: unknown) {
    console.error('Erro ao obter registros de abastecimento:', error);
    
    // Se o erro for de rede, usar o mock
    if (error && typeof error === 'object' && 'message' in error && 
        typeof error.message === 'string' && 
        (error.message.includes('Network Error') || error.message.includes('CORS'))) {
      console.log('Erro de rede detectado. Usando mock para getAllWeeks.');
      return await mockGetAllWeeks();
    }
    
    throw error;
  }
};

// Função para obter um registro específico
export const getWeekById = async (weekId: number): Promise<Week> => {
  try {
    const response = await api.get<Week>(`/weeks/${weekId}`);
    return response.data;
  } catch (error: unknown) {
    console.error(`Erro ao obter registro de abastecimento ID ${weekId}:`, error);
    throw error;
  }
};

// Função para criar um novo registro de abastecimento
export const createWeek = async (weekData: CreateWeekRequest): Promise<Week> => {
  try {
    const response = await api.post<Week>('/weeks/', weekData);
    return response.data;
  } catch (error: unknown) {
    console.error('Erro ao criar registro de abastecimento:', error);
    throw error;
  }
};

// Função para excluir um registro de abastecimento
export const deleteWeek = async (weekId: number): Promise<void> => {
  try {
    await api.delete(`/weeks/${weekId}`);
  } catch (error: unknown) {
    console.error(`Erro ao excluir registro de abastecimento ID ${weekId}:`, error);
    throw error;
  }
};

// Função para atualizar a quilometragem final e calcular a eficiência
export const updateFinalKm = async (weekId: number, finalKm: number): Promise<Week> => {
  try {
    const data: UpdateKmFinalRequest = {
      final_km: finalKm
    };
    
    const response = await api.put<Week>(`/weeks/${weekId}/final_km`, data);
    return response.data;
  } catch (error: unknown) {
    console.error(`Erro ao atualizar quilometragem final ID ${weekId}:`, error);
    throw error;
  }
};

// Função para obter todos os registros de um usuário específico
export const getWeeksByUserId = async (userId: number): Promise<Week[]> => {
  try {
    const response = await api.get<Week[]>(`/weeks/user/${userId}`);
    return response.data;
  } catch (error: unknown) {
    console.error(`Erro ao obter registros do usuário ID ${userId}:`, error);
    throw error;
  }
};
