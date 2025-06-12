import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook de navegação
import { RegisterScreen, RegisterContainer, Logo, RegisterCard, Title, Subtitle, InputGroup, Button, } from './RegisterPageStyle';
const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate(); // Inicializa o hook de navegação
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Simula o registro e redireciona para a dashboard
        localStorage.setItem('authToken', 'your-auth-token'); // Salva um token de autenticação
        navigate('/dashboard'); // Redireciona para a rota da dashboard
    };
    return (_jsx(RegisterScreen, { children: _jsxs(RegisterContainer, { children: [_jsx(Logo, { children: "FreeRoad" }), _jsxs(RegisterCard, { children: [_jsx(Title, { children: "Registrar" }), _jsx(Subtitle, { children: "Crie sua conta para acessar o sistema" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs(InputGroup, { children: [_jsx("label", { children: "Nome" }), _jsx("input", { type: "text", name: "name", value: formData.name, onChange: handleChange, required: true })] }), _jsxs(InputGroup, { children: [_jsx("label", { children: "Email" }), _jsx("input", { type: "email", name: "email", value: formData.email, onChange: handleChange, required: true })] }), _jsxs(InputGroup, { children: [_jsx("label", { children: "Senha" }), _jsx("input", { type: "password", name: "password", value: formData.password, onChange: handleChange, required: true })] }), _jsx(Button, { type: "submit", children: "Registrar" })] })] })] }) }));
};
export default RegisterPage;
