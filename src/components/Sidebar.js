// src/components/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, UserIcon, BellIcon, CogIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Sidebar = ({ onLogout }) => {
  return (
    <div className="fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-center font-bold text-lg border-b border-gray-700">
        AI Tamil Calendar
      </div>
      <div className="flex-grow mt-4">
        <nav>
          <ul>
            <li>
              <Link to="/" className="flex items-center p-4 hover:bg-gray-700">
                <HomeIcon className="h-6 w-6" />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/profile" className="flex items-center p-4 hover:bg-gray-700">
                <UserIcon className="h-6 w-6" />
                <span className="ml-3">Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/notifications" className="flex items-center p-4 hover:bg-gray-700">
                <BellIcon className="h-6 w-6" />
                <span className="ml-3">Notifications</span>
              </Link>
            </li>
            <li>
              <Link to="/update-data" className="flex items-center p-4 hover:bg-gray-700">
                <CogIcon className="h-6 w-6" />
                <span className="ml-3">Update Data</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <button onClick={onLogout} className="flex items-center p-4 hover:bg-gray-700">
        <ArrowRightOnRectangleIcon className="h-6 w-6" />
        <span className="ml-3">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
