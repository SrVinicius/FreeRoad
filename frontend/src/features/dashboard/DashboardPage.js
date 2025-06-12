import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { semanas as semanasMock } from '../../mocks/tableData';
import { DashboardContainer, HeaderRow, AddSemanaForm, TableCard, DetalhesGrid, FinalizarForm, EmAndamento } from './TableStyle';
const DashboardPage = () => {
    const [semanas, setSemanas] = useState(semanasMock);
    const [isAdding, setIsAdding] = useState(false);
    const [newSemana, setNewSemana] = useState({
        nome: '',
        custo: '',
        kmAtual: '',
        litrosAbastecidos: '',
    });
    const toggleDetalhes = (id) => {
        setSemanas(semanas => semanas.map(sem => sem.id === id ? { ...sem, aberta: !sem.aberta } : { ...sem, aberta: false }));
    };
    const handleAddSemana = () => {
        const novaSemana = {
            id: semanas.length + 1,
            nome: `Semana ${semanas.length + 1}`,
            custo: parseFloat(newSemana.custo).toString(),
            eficiencia: 'Em andamento',
            aberta: false,
            detalhes: {
                kmInicial: parseFloat(newSemana.kmAtual).toString(),
                kmFinal: '',
                qtdAbastecida: parseFloat(newSemana.litrosAbastecidos).toString(),
            },
        };
        setSemanas([...semanas, novaSemana]);
        setIsAdding(false);
        setNewSemana({ nome: '', custo: '', kmAtual: '', litrosAbastecidos: '' });
    };
    const handleFinalizarSemana = (id, kmFinal) => {
        setSemanas(semanas => semanas.map(sem => {
            if (sem.id === id) {
                const eficiencia = sem.detalhes.kmInicial &&
                    kmFinal &&
                    sem.detalhes.qtdAbastecida
                    ? ((kmFinal - parseFloat(sem.detalhes.kmInicial)) / parseFloat(sem.detalhes.qtdAbastecida)).toFixed(2)
                    : 'N/A';
                return {
                    ...sem,
                    eficiencia: eficiencia !== 'N/A' ? `${eficiencia} km/L` : 'N/A',
                    detalhes: { ...sem.detalhes, kmFinal: kmFinal.toString() },
                };
            }
            return sem;
        }));
    };
    return (_jsxs(DashboardContainer, { children: [_jsx("h1", { children: "Gerenciamento de combust\u00EDvel" }), _jsx("p", { className: "subtitle", children: "Armazene e analise o consumo de seu ve\u00EDculo" }), _jsx(HeaderRow, { children: _jsx("button", { className: "add-button", onClick: () => setIsAdding(!isAdding), children: isAdding ? 'Fechar Adição' : '+ Add Semana' }) }), isAdding && (_jsx(AddSemanaForm, { children: _jsxs("form", { children: [_jsxs("label", { children: ["Custo (R$)", _jsx("input", { type: "number", value: newSemana.custo, onChange: (e) => setNewSemana({ ...newSemana, custo: e.target.value }) })] }), _jsxs("label", { children: ["Quilometragem Atual (km)", _jsx("input", { type: "number", value: newSemana.kmAtual, onChange: (e) => setNewSemana({ ...newSemana, kmAtual: e.target.value }) })] }), _jsxs("label", { children: ["Litros Abastecidos", _jsx("input", { type: "number", value: newSemana.litrosAbastecidos, onChange: (e) => setNewSemana({ ...newSemana, litrosAbastecidos: e.target.value }) })] }), _jsx("button", { type: "button", className: "add-semana-button", onClick: handleAddSemana, children: "Adicionar Semana" })] }) })), _jsx(TableCard, { children: _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Semana" }), _jsx("th", { children: "Custo" }), _jsx("th", { children: "Efici\u00EAncia" })] }) }), _jsx("tbody", { children: semanas.map((semana) => (_jsxs(React.Fragment, { children: [_jsxs("tr", { className: "clickable-row", onClick: () => toggleDetalhes(semana.id), "aria-label": semana.aberta ? 'Fechar detalhes' : 'Abrir detalhes', children: [_jsx("td", { children: semana.nome }), _jsx("td", { children: semana.custo }), _jsx("td", { children: semana.eficiencia === 'Em andamento' ? (_jsx(EmAndamento, { children: " Em andamento " })) : (semana.eficiencia) })] }), semana.aberta && (_jsx("tr", { className: "detalhes-row", children: _jsxs("td", { colSpan: 3, children: [_jsxs(DetalhesGrid, { children: [_jsxs("div", { children: [_jsx("strong", { children: "Km. Inicial" }), _jsx("br", {}), _jsx("span", { className: "detalhe-destaque", children: semana.detalhes.kmInicial || '-' })] }), _jsxs("div", { children: [_jsx("strong", { children: "Km. Final" }), _jsx("br", {}), _jsx("span", { className: "detalhe-destaque", children: semana.detalhes.kmFinal || 'Não inserida' })] }), _jsxs("div", { children: [_jsx("strong", { children: "Qtd. Abastecida" }), _jsx("br", {}), _jsx("span", { className: "detalhe-destaque", children: semana.detalhes.qtdAbastecida || '-' })] })] }), semana.eficiencia === 'Em andamento' && (_jsxs(FinalizarForm, { onSubmit: (e) => {
                                                        e.preventDefault();
                                                        const kmFinal = parseFloat(e.target.kmFinal.value);
                                                        handleFinalizarSemana(semana.id, kmFinal);
                                                    }, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: `kmFinal-${semana.id}`, className: "form-label", children: "Quilometragem Final" }), _jsx("input", { type: "number", id: `kmFinal-${semana.id}`, name: "kmFinal", className: "input-km", placeholder: "Digite a quilometragem", required: true })] }), _jsx("button", { type: "submit", className: "finalizar-btn", children: "Finalizar" })] }))] }) }))] }, semana.id))) })] }) })] }));
};
export default DashboardPage;
