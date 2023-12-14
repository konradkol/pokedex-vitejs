import { createContext, useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';

const ToogleThemeContext = createContext();

const ToogleThemeContextProvider = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDarkTheme, setIsDarkTheme] = useState(prefersDarkMode);

  useEffect(() => {
    setIsDarkTheme(prefersDarkMode);
  }, [prefersDarkMode]);

  return { isDarkTheme, setIsDarkTheme };
};

export { ToogleThemeContext, ToogleThemeContextProvider };
