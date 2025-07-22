// Mock para os dados de abastecimento
import { Week, CreateWeekRequest, UpdateKmFinalRequest } from '../services/weekService';

// Função para gerar semanas mockadas
let mockWeeks: Week[] = [
  {
    id: 1,
    title: 'Semana 1',
    kmAtual: 10000,
    litrosAbastecidos: 45,
    custo: 300,
    user_id: 1,
    kmFinal: 10450,
    eficiencia: 10
  },
  {
    id: 2,
    title: 'Semana 2',
    kmAtual: 10450,
    litrosAbastecidos: 40,
    custo: 280,
    user_id: 1
  }
];

// Função para obter todas as semanas do usuário
export const mockGetAllWeeks = (): Promise<Week[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockWeeks]);
    }, 500);
  });
};

// Função para obter uma semana específica
export const mockGetWeekById = (weekId: number): Promise<Week> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const week = mockWeeks.find(w => w.id === weekId);
      if (week) {
        resolve({ ...week });
      } else {
        reject({
          response: {
            status: 404,
            data: { detail: 'Semana não encontrada' }
          }
        });
      }
    }, 500);
  });
};

// Função para criar uma nova semana
export const mockCreateWeek = (weekData: CreateWeekRequest): Promise<Week> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newWeek: Week = {
        id: mockWeeks.length + 1,
        title: weekData.title,
        kmAtual: weekData.kmAtual,
        litrosAbastecidos: weekData.litrosAbastecidos,
        custo: weekData.custo,
        user_id: weekData.user_id || 1
      };
      mockWeeks.push(newWeek);
      resolve({ ...newWeek });
    }, 500);
  });
};

// Função para excluir uma semana
export const mockDeleteWeek = (weekId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockWeeks.findIndex(w => w.id === weekId);
      if (index !== -1) {
        mockWeeks.splice(index, 1);
        resolve();
      } else {
        reject({
          response: {
            status: 404,
            data: { detail: 'Semana não encontrada' }
          }
        });
      }
    }, 500);
  });
};

// Função para atualizar a quilometragem final
export const mockUpdateFinalKm = (weekId: number, finalKm: number): Promise<Week> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockWeeks.findIndex(w => w.id === weekId);
      if (index !== -1) {
        const week = mockWeeks[index];
        const kmInicial = week.kmAtual;
        const litrosAbastecidos = week.litrosAbastecidos;
        
        const eficiencia = (finalKm - kmInicial) / litrosAbastecidos;
        
        mockWeeks[index] = {
          ...week,
          kmFinal: finalKm,
          eficiencia
        };
        
        resolve({ ...mockWeeks[index] });
      } else {
        reject({
          response: {
            status: 404,
            data: { detail: 'Semana não encontrada' }
          }
        });
      }
    }, 500);
  });
};

// Função para obter as semanas de um usuário específico
export const mockGetWeeksByUserId = (userId: number): Promise<Week[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userWeeks = mockWeeks.filter(w => w.user_id === userId);
      resolve([...userWeeks]);
    }, 500);
  });
};
