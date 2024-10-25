// src/pages/Dashboard.js
import React, { useState } from 'react';
import addInitialCalendarData from '../firebase/addCalendarData';

const Dashboard = () => {
  const [message, setMessage] = useState(""); // State to hold feedback message
  const [isError, setIsError] = useState(false); // State to track if there was an error

  const handleDataInsertion = async () => {
    setMessage("Attempting to insert data...");
    setIsError(false); // Reset error state before the operation

    try {
      await addInitialCalendarData();
      setMessage("Data inserted successfully!");
    } catch (error) {
      console.error("Error inserting data: ", error);
      setIsError(true);
      setMessage("Error inserting data. Please try again.");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Only show this button to admins */}
      <button
        onClick={handleDataInsertion}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Calendar Data
      </button>
      {message && (
        <p style={{ color: isError ? 'red' : 'green', marginTop: '10px' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Dashboard;
