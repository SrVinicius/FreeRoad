import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage';
import DashboardPage from '../features/dashboard/DashboardPage';

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