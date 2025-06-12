import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/Login/LoginPage';
import RegisterPage from '../features/auth/Register/RegisterPage';
import DashboardPage from '../features/dashboard/DashboardPage';
import AboutPage from '../features/About/AboutScreen';
const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return token !== null && token !== '';
};
const PrivateRoute = ({ children }) => {
    const auth = isAuthenticated();
    return auth ? (_jsx(_Fragment, { children: children })) : (_jsx(Navigate, { to: "/login", replace: true }));
};
const AppRoutes = () => {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/register", element: _jsx(RegisterPage, {}) }), _jsx(Route, { path: "/about", element: _jsx(AboutPage, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(PrivateRoute, { children: _jsx(DashboardPage, {}) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/login", replace: true }) })] }) }));
};
export default AppRoutes;
