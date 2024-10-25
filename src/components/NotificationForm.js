// components/NotificationForm.js
import React, { useState } from 'react';
import { db , messaging } from '../firebase/firebaseConfig';


const NotificationForm = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendNotification = async () => {  
    setLoading(true);

    try {
      // Fetch all user tokens from Firestore
      const tokensSnapshot = await db.collection('fcmTokens').get();
      const tokens = tokensSnapshot.docs.map(doc => doc.data().token);

      if (tokens.length === 0) {
        alert("No users have registered tokens yet.");
        setLoading(false);
        return;
      }

      // Construct notification payload
      const payload = {
        notification: {
          title,
          body: message,
        },
        tokens,
      };

      // Call Firebase Cloud Function or Admin SDK API to send the notification
      await sendNotificationToUsers(payload);

      alert('Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification.');
    }

    setLoading(false);
  };

  // Dummy function to simulate sending a notification. In real implementation, call Firebase Admin SDK from the backend
  const sendNotificationToUsers = async (payload) => {
    console.log('Sending notification payload:', payload);
    // In real implementation, make an API call to your backend server or Firebase function.
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-4">Send Notification</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <button
        onClick={handleSendNotification}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Notification'}
      </button>
    </div>
  );
};

export default NotificationForm;
