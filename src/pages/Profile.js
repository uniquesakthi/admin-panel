import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Profile = ({ onLogout }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const auth = getAuth();

  // Fetch admin data from Firestore on component mount
  useEffect(() => {
    const fetchAdminData = async () => {
      const user = auth.currentUser;
      if (user) {
        setEmail(user.email); // Fetch email directly from auth object
        const docRef = doc(db, 'admins', user.uid); // Using user ID from Firebase Auth
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name);
        } else {
          console.log('No such document!');
        }
      } else {
        console.log('No user is logged in');
      }
    };

    fetchAdminData();
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length > 0 && password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const user = auth.currentUser;
      const docRef = doc(db, 'admins', user.uid); // Using user ID from Firebase Auth
      await updateDoc(docRef, {
        name: name,
        password: password.length > 0 ? password : undefined, // Only update if password is provided
      });

      setSuccess('Profile updated successfully!');
      setError('');

      // Reset form
      setPassword('');
    } catch (err) {
      setError('Error updating profile: ' + err.message);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            className="border border-gray-300 p-3 w-full rounded"
            required
            disabled // Disable input since email should not be updated
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">New Password (Leave blank to keep current)</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-3 rounded w-full">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
