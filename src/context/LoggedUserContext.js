import { createContext, useState } from 'react';

const LoggedUserContext = createContext();

const LoggedUserContextProvider = () => {
  const [user, setUser] = useState({
    name: 'Konrad',
    surname: 'Pecyna',
    isLogged: true,
  });

  return { user, setUser };
};

export { LoggedUserContext, LoggedUserContextProvider };
