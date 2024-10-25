// src/components/DashboardLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Assuming Sidebar is in the 'components' folder

const DashboardLayout = ({ onLogout }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar will always be visible on the dashboard pages */}
      <Sidebar onLogout={onLogout} />
      {/* Main content that changes based on the route */}
      <div className="flex-grow p-6 bg-gray-100">
        <Outlet /> {/* This will render the current route's component */}
      </div>
    </div>
  );
};

export default DashboardLayout;
