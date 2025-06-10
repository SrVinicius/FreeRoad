import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/Login/LoginPage';
import RegisterPage from '../features/auth/Register/RegisterPage'
import DashboardPage from '../features/dashboard/DashboardPage';
import AboutPage from '../features/About/AboutScreen';

const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return token !== null && token !== ''; 
};

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = isAuthenticated();
  return auth ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* pública */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* privada */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* login por padrão */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;