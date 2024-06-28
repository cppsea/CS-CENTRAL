// src/hooks/useTheme.js
import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const useTheme = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return { isDarkMode, toggleTheme };
};
