"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const ThemeContext = createContext();

export default function ThemeProvider  ({ children })  {
  const [dark, setDark] = useState(false);
  
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);


  return (
    <ThemeContext.Provider value={{ dark,setDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
