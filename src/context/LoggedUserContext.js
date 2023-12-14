import { createContext, useState } from 'react';

const LoggedUserContext = createContext();

const LoggedUserContextProvider = () => {
  const [user, setUser] = useState({
    isLogged: false,
  });

  return { user, setUser };
};

export { LoggedUserContext, LoggedUserContextProvider };
