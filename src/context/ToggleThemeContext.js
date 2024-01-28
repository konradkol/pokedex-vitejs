import { createContext, useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';

const ToggleThemeContext = createContext();

const ToggleThemeContextProvider = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDarkTheme, setIsDarkTheme] = useState(prefersDarkMode);

  useEffect(() => {
    setIsDarkTheme(prefersDarkMode);
  }, [prefersDarkMode]);

  return { isDarkTheme, setIsDarkTheme };
};

export { ToggleThemeContext, ToggleThemeContextProvider };
