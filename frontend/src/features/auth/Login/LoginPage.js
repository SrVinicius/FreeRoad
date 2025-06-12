import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { GlobalStyles, LoginScreen, LoginContainer, Logo, LoginCard, Title, Subtitle, InputGroup, Button, } from './LoginPageStyle';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (email === 'vivitata@gmail.com' && password === 'vivitata') {
            localStorage.setItem('authToken', 'your-auth-token');
            window.location.href = '/dashboard';
        }
        else {
            setError('Credenciais inválidas');
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(GlobalStyles, {}), _jsx(LoginScreen, { children: _jsxs(LoginContainer, { children: [_jsx(Logo, { children: "FreeRoad" }), _jsxs(LoginCard, { children: [_jsx(Title, { children: "Login" }), _jsx(Subtitle, { children: "Utilize suas credenciais para acessar sua conta" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs(InputGroup, { children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })] }), _jsxs(InputGroup, { children: [_jsx("label", { htmlFor: "password", children: "Senha" }), _jsx("input", { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true })] }), error && _jsx("p", { style: { color: 'red' }, children: error }), _jsx(Button, { type: "submit", children: "Login" })] })] })] }) })] }));
};
export default LoginPage;
