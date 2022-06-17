import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase.creds';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);