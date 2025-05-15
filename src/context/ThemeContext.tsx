
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeContextType } from '@/types';

const defaultContext: ThemeContextType = {
  isDarkMode: false,
  isLargeText: false,
  toggleDarkMode: () => {},
  toggleLargeText: () => {}
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);

  // Initialize theme from local storage or system preference
  useEffect(() => {
    // Check for dark mode preference
    const savedDarkMode = localStorage.getItem('factmedix-dark-mode');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedDarkMode !== null) {
      setIsDarkMode(savedDarkMode === 'true');
    } else {
      setIsDarkMode(prefersDarkMode);
    }
    
    // Check for large text preference
    const savedLargeText = localStorage.getItem('factmedix-large-text');
    if (savedLargeText !== null) {
      setIsLargeText(savedLargeText === 'true');
    }
  }, []);

  // Update document classes when theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    if (isLargeText) {
      document.documentElement.classList.add('text-lg');
    } else {
      document.documentElement.classList.remove('text-lg');
    }

    // Save preferences
    localStorage.setItem('factmedix-dark-mode', isDarkMode.toString());
    localStorage.setItem('factmedix-large-text', isLargeText.toString());
  }, [isDarkMode, isLargeText]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleLargeText = () => {
    setIsLargeText(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, isLargeText, toggleDarkMode, toggleLargeText }}>
      {children}
    </ThemeContext.Provider>
  );
};
