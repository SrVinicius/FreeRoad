import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { HeaderContainer, Logo, AccessLink } from './HeaderStyle';
const Header = () => {
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
    return (_jsxs(HeaderContainer, { children: [_jsx(Logo, { children: "Free Road." }), _jsx(AccessLink, { onClick: handleAccess, children: "Acessar" })] }));
};
export default Header;
