export interface Semana {
  id: number;
  nome: string;
  custo: string;
  eficiencia: string;
  status?: 'em_andamento' | 'finalizada';
  detalhes: {
    kmInicial: string;
    kmFinal: string;
    qtdAbastecida: string;
  };
}

export const semanas: Semana[] = [
  {
    id: 1,
    nome: 'Sem. 1',
    custo: 'R$ 100,00',
    eficiencia: '10 km/L',
    detalhes: {
      kmInicial: '11000',
      kmFinal: 'Não inserida',
      qtdAbastecida: '45'
    },
  },
  {
    id: 2,
    nome: 'Sem. 2',
    custo: 'R$ 150,00',
    eficiencia: '9.1 km/L',
    detalhes: {
      kmInicial: '11320',
      kmFinal: '11400',
      qtdAbastecida: '12'
    },
  },
  {
    id: 3,
    nome: 'Sem. 3',
    custo: 'R$ 90,00',
    eficiencia: 'Em andamento',
    status: 'em_andamento',
    detalhes: {
      kmInicial: '11420',
      kmFinal: '',
      qtdAbastecida: '12'
    },
  }
];
