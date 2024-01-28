import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoggedUserContext } from '../context/LoggedUserContext';

export const RequireAuth = ({ children }) => {
  const { user } = useContext(LoggedUserContext);
  const loggedIn = user.isLogged;

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  }, [loggedIn, navigate]);

  return loggedIn ? children : null;
};
