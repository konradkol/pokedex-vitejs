import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { useMemo } from 'react';
import { SnackbarProvider } from 'notistack';

import { router } from './Router';
import {
  ToggleThemeContext,
  ToggleThemeContextProvider,
} from './context/ToggleThemeContext';
import {
  LoggedUserContext,
  LoggedUserContextProvider,
} from './context/LoggedUserContext';
import {
  StateOfAppContext,
  StateOfAppContextProvider,
} from './context/StateOfAppContext';

function App() {
  const { isDarkTheme, setIsDarkTheme } = ToggleThemeContextProvider();
  const { user, setUser } = LoggedUserContextProvider();
  const { state, setState } = StateOfAppContextProvider();

  const queryClient = new QueryClient();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkTheme ? 'dark' : 'light',

          background: { default: `${isDarkTheme ? '#242121' : '#daeee7'}` },
        },
      }),
    [isDarkTheme],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LoggedUserContext.Provider value={{ user, setUser }}>
        <ToggleThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
          <StateOfAppContext.Provider value={{ state, setState }}>
            <ThemeProvider theme={theme}>
              <CssBaseline enableColorScheme />
              <SnackbarProvider maxSnack={3}>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
              </SnackbarProvider>
            </ThemeProvider>
          </StateOfAppContext.Provider>
        </ToggleThemeContext.Provider>
      </LoggedUserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
