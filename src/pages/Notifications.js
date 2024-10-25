// pages/Notifications.js
import React from 'react';
import NotificationForm from '../components/NotificationForm';

const Notifications = () => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Notifications</h2>
      <p className="mt-2 text-gray-700">
        Use this panel to send notifications to all app users.
      </p>
      <NotificationForm />
    </div>
  );
};

export default Notifications;
