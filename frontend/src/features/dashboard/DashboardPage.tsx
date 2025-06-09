import React, { useState } from 'react';
import { semanas as semanasMock, Semana } from '../../mocks/tableData';
import '../../styles/TableStyle.css';

const DashboardPage: React.FC = () => {
  const [semanas, setSemanas] = useState<Semana[]>(semanasMock);
  const [isAdding, setIsAdding] = useState(false);
  const [newSemana, setNewSemana] = useState({
    nome: '',
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

  const handleAddSemana = () => {
    const novaSemana: Semana = {
      id: semanas.length + 1,
      nome: `Semana ${semanas.length + 1}`,
      custo: parseFloat(newSemana.custo),
      eficiencia: 'Em andamento',
      aberta: false,
      detalhes: {
        kmInicial: parseFloat(newSemana.kmAtual),
        kmFinal: null,
        qtdAbastecida: parseFloat(newSemana.litrosAbastecidos),
      },
    };

    setSemanas([...semanas, novaSemana]);
    setIsAdding(false);
    setNewSemana({ nome: '', custo: '', kmAtual: '', litrosAbastecidos: '' });
  };

  const handleFinalizarSemana = (id: number, kmFinal: number) => {
    setSemanas(semanas =>
      semanas.map(sem => {
        if (sem.id === id) {
          const eficiencia =
            sem.detalhes.kmInicial && kmFinal && sem.detalhes.qtdAbastecida
              ? ((kmFinal - sem.detalhes.kmInicial) / sem.detalhes.qtdAbastecida).toFixed(2)
              : 'N/A';
          return {
            ...sem,
            eficiencia: eficiencia !== 'N/A' ? `${eficiencia} km/L` : 'N/A',
            detalhes: { ...sem.detalhes, kmFinal },
          };
        }
        return sem;
      })
    );
  };

  return (
    <div className="dashboard-container">
      <h1>Gerenciamento de combustível</h1>
      <p className="subtitle">Armazene e analise o consumo de seu veículo</p>
      <div className="header-row">
        <span className="recent-label">Adições recentes</span>
        <button className="add-button" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Fechar Adição' : '+ Add Semana'}
        </button>
      </div>
      {isAdding && (
        <div className="add-semana-form">
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
        </div>
      )}
      <div className="table-card">
        <table className="custom-table">
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
                      <span className="em-andamento">Em andamento</span>
                    ) : (
                      semana.eficiencia
                    )}
                  </td>
                </tr>
                {semana.aberta && (
                  <tr className="detalhes-row">
                    <td colSpan={3}>
                      <div className="detalhes-grid">
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
                      </div>
                      {semana.eficiencia === 'Em andamento' && (
                        <form
                          className="finalizar-form"
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
                        </form>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;