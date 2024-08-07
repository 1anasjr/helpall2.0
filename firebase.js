// lib/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth ,GoogleAuthProvider , signInWithPopup, signOut ,createUserWithEmailAndPassword, signInWithEmailAndPassword ,updateProfile} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database'; 
import { getStorage, } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL // Add this line for Database URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app); 
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { auth, db, database, storage, provider,createUserWithEmailAndPassword, signInWithEmailAndPassword ,signInWithPopup, signOut,updateProfile };
