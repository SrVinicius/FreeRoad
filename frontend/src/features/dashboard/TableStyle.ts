import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh; 
  margin: 0 auto; 
  background-color: #f9f9f9;
  font-family: sans-serif;
  
  .error-message {
    background-color: #ffebee;
    color: #c62828;
    padding: 12px 20px;
    border-radius: 4px;
    margin-bottom: 20px;
    width: 100%;
    max-width: 900px;
    text-align: center;
  }
  
  .subtitle {
    margin-bottom: 20px;
    color: #666;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 900px;

  .recent-label {
    font-size: 18px;
    font-weight: bold;
  }

  .add-button, .logout-button {
    background-color: white;
    color: black;
    border: 1px solid #ccc; 
    border-radius: 6px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #f4f4f4;
    }
  }
  
  .logout-button {
    background-color: #f5f5f5;
    color: #333;
    margin-left: 10px;
    
    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

export const AddSemanaForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 450px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    label {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 14px;
    }

    .add-semana-button {
      background-color: #000;
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      font-weight: bold;
    }
  }
`;

export const TableCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 900px;
  
  .loading, .no-data {
    padding: 30px;
    text-align: center;
    color: #666;
    font-size: 16px;
  }
  
  .loading {
    color: #888;
  }
  
  .no-data {
    font-style: italic;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 16px;
      text-align: left;
      border-bottom: 1px solid #ddd;
      font-size: 16px;
    }

    th {
      background-color: #f4f4f4;
      font-weight: bold;
    }

    .clickable-row {
      cursor: pointer;

      &:hover {
        background-color: #f9f9f9;
      }
    }

    .detalhes-row td {
      background-color: #fafafa;
      padding: 20px 12px;
    }
  }
`;

export const DetalhesGrid = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 14px;

  div {
    strong {
      font-weight: bold;
    }

    .detalhe-destaque {
      font-size: 14px;
      color: #333;
    }
  }
  
  .actions {
    margin-left: auto;
    
    .delete-btn {
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 6px 12px;
      cursor: pointer;
      font-size: 14px;
      
      &:hover {
        background-color: #d32f2f;
      }
    }
  }
`;

export const FinalizarForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .form-label {
      font-weight: bold;
      font-size: 14px;
    }

    .input-km {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    }
  }

  .finalizar-btn {
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
  }
`;

export const EmAndamento = styled.span`
  color: #FFA500; 
  font-weight: bold; 
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #000;
  font-family: sans-serif;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  max-width: 900px;
  margin-bottom: 10px;
  
  .user-greeting {
    font-size: 14px;
    color: #666;
    text-align: right;
    
    strong {
      color: #333;
      font-weight: bold;
    }
  }
`;