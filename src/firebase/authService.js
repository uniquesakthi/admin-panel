import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../firebase/firebaseConfig'; // Make sure this is correct

// Initialize Firebase Authentication
const auth = getAuth(); // No need to pass 'app' here since getAuth() automatically uses the default app

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential; // Return user credential to get user info
  } catch (error) {
    console.error('Error signing in: ', error);
    throw error; // Rethrow the error to handle it where this function is called
  }
};

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential; // Return user credential to get user info
  } catch (error) {
    console.error('Error signing up: ', error);
    throw error; // Rethrow the error to handle it where this function is called
  }
};
