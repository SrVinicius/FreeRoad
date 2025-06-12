import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { Container, MainContent, Title, ButtonGroup, PrimaryButton, SecondaryButton, } from './AboutScreenStyle';
const AboutScreen = () => {
    const navigate = useNavigate();
    const handleAccess = () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/dashboard');
        }
        else {
            navigate('/login');
        }
    };
    return (_jsxs(Container, { children: [_jsx(Header, {}), _jsxs(MainContent, { children: [_jsx(Title, { children: "autonomia e efici\u00EAncia minimalistas" }), _jsxs(ButtonGroup, { children: [_jsx(PrimaryButton, { children: "Conhe\u00E7a" }), _jsx(SecondaryButton, { onClick: handleAccess, children: "Acessar" })] })] })] }));
};
export default AboutScreen;
