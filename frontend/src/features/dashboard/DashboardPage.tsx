import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DashboardContainer,
  HeaderRow,
  AddSemanaForm,
  TableCard,
  DetalhesGrid,
  FinalizarForm,
  EmAndamento,
  UserInfo
} from './TableStyle';
import * as weekService from '../../services/weekService';
import * as authService from '../../services/authService';

// Lista de nomes engraçados para as semanas
const NOMES_SEMANAS = [
  'Semana do Tanque Furado',
  'Semana Pé na Estrada',
  'Semana Carburador Doido',
  'Semana Frentista Amigo',
  'Semana Posto Caro',
  'Semana Buzina Estourada',
  'Semana Motor Soluçante',
  'Semana Gasolina Premium',
  'Semana Álcool ou Gasolina',
  'Semana Roda no Chão',
  'Semana Marcha Quebrada',
  'Semana GPS Perdido',
  'Semana Escapamento Furado',
  'Semana Volante Tremido',
  'Semana Freio Chorando',
  'Semana Placa Enferrujada',
  'Semana Motor Roncando',
  'Semana Pneu Careca',
  'Semana do Retrovisor Quebrado',
  'Semana do Ar-Condicionado Falhando',
  'Semana do Radiador Fervendo',
  'Semana do Câmbio Travado',
  'Semana da Embreagem Escorregadia',
  'Semana do Óleo Vencido',
  'Semana da Bateria Descarregada',
  'Semana da Injeção Eletrônica Bugada',
  'Semana do Para-brisa Rachado',
  'Semana do Fusível Queimado',
  'Semana do Motor Afogado',
  'Semana da Partida a Frio',
  'Semana do Carro na Reserva',
  'Semana da Vela Queimada',
  'Semana do Combustível Adulterado',
  'Semana da Viagem Longa',
  'Semana do Radar Surpresa'
];

// Função para obter um nome aleatório da lista
const getNomeAleatorio = (): string => {
  const indice = Math.floor(Math.random() * NOMES_SEMANAS.length);
  return NOMES_SEMANAS[indice];
};

// Interface para o estado local de exibição das semanas
interface SemanaDisplay {
  id: number;
  nome: string;
  custo: string;
  eficiencia: string;
  detalhes: {
    kmInicial: string;
    kmFinal: string;
    qtdAbastecida: string;
  };
  aberta?: boolean;
}

// Interface para o formulário de nova semana
interface NewSemanaForm {
  nome: string; // Mantido por compatibilidade, mas não será usado no formulário
  custo: string;
  kmAtual: string;
  litrosAbastecidos: string;
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [semanas, setSemanas] = useState<SemanaDisplay[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<authService.User | null>(null);
  const [newSemana, setNewSemana] = useState<NewSemanaForm>({
    nome: '', // Não precisamos mais armazenar o nome aqui, será gerado no momento da adição
    custo: '',
    kmAtual: '',
    litrosAbastecidos: '',
  });

  const toggleDetalhes = (id: number) => {
    setSemanas(semanas =>
      semanas.map(sem =>
        sem.id === id ? { ...sem, aberta: !sem.aberta } : { ...sem, aberta: false }
      )
    );
  };
  
  // Carregar dados da API quando o componente montar ou quando o usuário mudar
  useEffect(() => {
    const fetchWeeks = async () => {
      try {
        // Se não tiver usuário, não carregar os dados
        if (!currentUser) {
          return;
        }
        
        setLoading(true);
        
        // Buscar as semanas do usuário atual
        const weeksData = await weekService.getWeeksByUserId(currentUser.id);
        
        // Converter os dados da API para o formato de exibição
        const semanaData: SemanaDisplay[] = weeksData.map(week => ({
          id: week.id,
          nome: week.title,
          custo: `R$ ${week.custo.toFixed(2)}`,
          eficiencia: week.eficiencia ? `${week.eficiencia.toFixed(2)} km/L` : 'Em andamento',
          aberta: false,
          detalhes: {
            kmInicial: week.kmAtual.toString(),
            kmFinal: week.kmFinal ? week.kmFinal.toString() : '',
            qtdAbastecida: week.litrosAbastecidos.toString(),
          },
        }));
        
        setSemanas(semanaData);
        setError(null);
      } catch (err: unknown) {
        console.error('Erro ao carregar dados de abastecimento:', err);
        setError('Erro ao carregar dados de abastecimento. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeeks();
  }, [currentUser]);

  // Verificar autenticação e obter dados do usuário
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verificar se o usuário está autenticado
        if (!authService.isAuthenticated()) {
          navigate('/login');
          return;
        }
        
        // Obter dados do usuário atual
        const userData = await authService.getCurrentUser();
        setCurrentUser(userData);
      } catch (err: unknown) {
        console.error('Erro ao verificar autenticação:', err);
        // Se houver erro na autenticação, redirecionar para o login
        authService.logout();
        navigate('/login');
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleAddSemana = async () => {
    try {
      // Validar se o usuário está logado
      if (!currentUser) {
        setError('Você precisa estar logado para adicionar um registro');
        return;
      }
      
      // Validar se todos os campos estão preenchidos
      if (!newSemana.custo || !newSemana.kmAtual || !newSemana.litrosAbastecidos) {
        setError('Todos os campos são obrigatórios');
        return;
      }

      setLoading(true);
      
      // Gerar um nome aleatório único para a semana
      const nomeAleatorio = getNomeAleatorio();
      const numeroUnico = Math.floor(Math.random() * 1000) + 1;
      const nomeSemana = `${nomeAleatorio} #${numeroUnico}`;
      
      // Preparar dados para envio à API
      const weekData: weekService.CreateWeekRequest = {
        title: nomeSemana,
        custo: parseFloat(newSemana.custo),
        kmAtual: parseFloat(newSemana.kmAtual),
        litrosAbastecidos: parseFloat(newSemana.litrosAbastecidos),
        user_id: currentUser.id // Incluir o ID do usuário atual
      };
      
      // Enviar dados para a API
      const createdWeek = await weekService.createWeek(weekData);
      
      // Adicionar nova semana ao estado local
      const novaSemanaDisplay: SemanaDisplay = {
        id: createdWeek.id,
        nome: createdWeek.title,
        custo: `R$ ${createdWeek.custo.toFixed(2)}`,
        eficiencia: 'Em andamento',
        aberta: false,
        detalhes: {
          kmInicial: createdWeek.kmAtual.toString(),
          kmFinal: '',
          qtdAbastecida: createdWeek.litrosAbastecidos.toString(),
        },
      };

      setSemanas([...semanas, novaSemanaDisplay]);
      setIsAdding(false);
      setNewSemana({ nome: '', custo: '', kmAtual: '', litrosAbastecidos: '' });
      setError(null);
    } catch (err: unknown) {
      console.error('Erro ao adicionar semana:', err);
      setError('Erro ao adicionar semana. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleFinalizarSemana = async (id: number, kmFinal: number) => {
    try {
      setLoading(true);
      
      // Chamar a API para atualizar o km final e calcular a eficiência
      const updatedWeek = await weekService.updateFinalKm(id, kmFinal);
      
      // Atualizar o estado local com os dados retornados pela API
      setSemanas(semanas =>
        semanas.map(sem => {
          if (sem.id === id) {
            return {
              ...sem,
              eficiencia: updatedWeek.eficiencia ? `${updatedWeek.eficiencia.toFixed(2)} km/L` : 'N/A',
              detalhes: { 
                ...sem.detalhes, 
                kmFinal: updatedWeek.kmFinal ? updatedWeek.kmFinal.toString() : 'N/A' 
              },
            };
          }
          return sem;
        })
      );
      setError(null);
    } catch (err: unknown) {
      console.error(`Erro ao finalizar semana ID ${id}:`, err);
      setError('Erro ao finalizar semana. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSemana = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este registro?')) {
      return;
    }
    
    try {
      setLoading(true);
      
      // Chamar a API para excluir o registro
      await weekService.deleteWeek(id);
      
      // Atualizar o estado local removendo o registro
      setSemanas(semanas => semanas.filter(sem => sem.id !== id));
      setError(null);
    } catch (err: unknown) {
      console.error(`Erro ao excluir semana ID ${id}:`, err);
      setError('Erro ao excluir semana. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardContainer>
      <h1>Gerenciamento de combustível</h1>
      <p className="subtitle">Armazene e analise o consumo de seu veículo</p>
      
      {currentUser && (
        <UserInfo>
          <div className="user-greeting">
            Olá, <strong>{currentUser.name}</strong>! Bem-vindo ao seu painel de gerenciamento de combustível.
          </div>
        </UserInfo>
      )}
      
      {error && <div className="error-message">{error}</div>}
      
      <HeaderRow>
        <button className="add-button" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Fechar Adição' : '+ Add Semana'}
        </button>
        <button 
          className="logout-button" 
          onClick={() => {
            authService.logout();
            navigate('/login');
          }}
        >
          Sair
        </button>
      </HeaderRow>
      
      {isAdding && (
        <AddSemanaForm>
          <form>
            <label>
              Custo (R$)
              <input
                type="number"
                value={newSemana.custo}
                onChange={(e) => setNewSemana({ ...newSemana, custo: e.target.value })}
              />
            </label>
            <label>
              Quilometragem Atual (km)
              <input
                type="number"
                value={newSemana.kmAtual}
                onChange={(e) => setNewSemana({ ...newSemana, kmAtual: e.target.value })}
              />
            </label>
            <label>
              Litros Abastecidos
              <input
                type="number"
                value={newSemana.litrosAbastecidos}
                onChange={(e) => setNewSemana({ ...newSemana, litrosAbastecidos: e.target.value })}
              />
            </label>
            <button type="button" className="add-semana-button" onClick={handleAddSemana}>
              Adicionar Semana
            </button>
          </form>
        </AddSemanaForm>
      )}
      
      <TableCard>
        {loading ? (
          <div className="loading">Carregando dados...</div>
        ) : semanas.length === 0 ? (
          <div className="no-data">Nenhum registro de abastecimento encontrado. Adicione seu primeiro registro!</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Semana</th>
                <th>Custo</th>
                <th>Eficiência</th>
              </tr>
            </thead>
            <tbody>
              {semanas.map((semana) => (
                <React.Fragment key={semana.id}>
                  <tr
                    className="clickable-row"
                    onClick={() => toggleDetalhes(semana.id)}
                    aria-label={semana.aberta ? 'Fechar detalhes' : 'Abrir detalhes'}
                  >
                    <td>{semana.nome}</td>
                    <td>{semana.custo}</td>
                    <td>
                      {semana.eficiencia === 'Em andamento' ? (
                        <EmAndamento> Em andamento </EmAndamento>
                      ) : (
                        semana.eficiencia
                      )}
                    </td>
                  </tr>
                  {semana.aberta && (
                    <tr className="detalhes-row">
                      <td colSpan={3}>
                        <DetalhesGrid>
                          <div>
                            <strong>Km. Inicial</strong><br />
                            <span className="detalhe-destaque">{semana.detalhes.kmInicial || '-'}</span>
                          </div>
                          <div>
                            <strong>Km. Final</strong><br />
                            <span className="detalhe-destaque">{semana.detalhes.kmFinal || 'Não inserida'}</span>
                          </div>
                          <div>
                            <strong>Qtd. Abastecida</strong><br />
                            <span className="detalhe-destaque">{semana.detalhes.qtdAbastecida || '-'}</span>
                          </div>
                          <div className="actions">
                            <button 
                              className="delete-btn" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteSemana(semana.id);
                              }}
                            >
                              Excluir
                            </button>
                          </div>
                        </DetalhesGrid>
                        {semana.eficiencia === 'Em andamento' && (
                          <FinalizarForm
                            onSubmit={(e) => {
                              e.preventDefault();
                              const kmFinal = parseFloat((e.target as HTMLFormElement).kmFinal.value);
                              handleFinalizarSemana(semana.id, kmFinal);
                            }}
                          >
                            <div className="form-group">
                              <label htmlFor={`kmFinal-${semana.id}`} className="form-label">
                                Quilometragem Final
                              </label>
                              <input
                                type="number"
                                id={`kmFinal-${semana.id}`}
                                name="kmFinal"
                                className="input-km"
                                placeholder="Digite a quilometragem"
                                required
                              />
                            </div>
                            <button type="submit" className="finalizar-btn">
                              Finalizar
                            </button>
                          </FinalizarForm>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </TableCard>
    </DashboardContainer>
  );
};

export default DashboardPage;