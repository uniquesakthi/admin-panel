// src/components/Layout.js

import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <header className="bg-gray-800 text-white p-4 fixed w-full top-0 z-10 pl-72"> {/* Add padding-left for the sidebar width */}
        <h1 className="text-2xl">Welcome to Dashboard</h1>
        <p className="text-sm">This is your dashboard where you can manage everything.</p>
      </header>

      {/* Main Content */}
      <div className="flex flex-grow pt-16 pl-64"> {/* Add padding to the left to accommodate sidebar */}
        <main className="flex-grow p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
