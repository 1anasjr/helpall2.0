"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../../firebase';
import { onAuthStateChanged,signOut } from 'firebase/auth';

const AuthContext = createContext();

export default function AuthProvider  ({ children })  {
  const [currentUser, setCurrentUser] = useState(null);
  console.log(currentUser);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully.");
      // Optionally, you can redirect the user or clear local state here
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser,handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
