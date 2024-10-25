// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Notifications from './pages/Notifications';
import UpdateData from './pages/UpdateData';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Layout from './components/Layout';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="flex">
        {/* Only show the sidebar for authenticated routes */}
        {isAuthenticated && <Sidebar onLogout={handleLogout} />}
        
        <div className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
            <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />

            {/* Protected Routes */}
            <Route 
              path="/" 
              element={isAuthenticated ? 
                <Layout onLogout={handleLogout}>
                  <Dashboard />
                </Layout>
              : <Navigate to="/login" />} 
            />
            <Route 
              path="/notifications" 
              element={isAuthenticated ? 
                <Layout onLogout={handleLogout}>
                  <Notifications />
                </Layout>
              : <Navigate to="/login" />} 
            />
            <Route 
              path="/update-data" 
              element={isAuthenticated ? 
                <Layout onLogout={handleLogout}>
                  <UpdateData />
                </Layout>
              : <Navigate to="/login" />} 
            />
            <Route 
              path="/profile" 
              element={isAuthenticated ? 
                <Layout onLogout={handleLogout}>
                  <Profile />
                </Layout>
              : <Navigate to="/login" />} 
            />
            <Route 
              path="/settings" 
              element={isAuthenticated ? 
                <Layout onLogout={handleLogout}>
                  <Settings />
                </Layout>
              : <Navigate to="/login" />} 
            />

            {/* Redirect any undefined routes to login */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
