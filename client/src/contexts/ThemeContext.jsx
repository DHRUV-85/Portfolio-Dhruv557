import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  
  // Initialize from localStorage/system preference
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(savedMode !== null ? savedMode === "true" : systemDark);
  }, []);

  // Update HTML class and save preference
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easier consumption
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};