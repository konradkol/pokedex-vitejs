import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';

import { LoggedUserContext } from '../context/LoggedUserContext';

const useRegisterAndLoginUser = (
  path,
  successMessage,
  errorMessage,
  isNavigate,
  whichType,
) => {
  const URL = import.meta.env.VITE_URL_LOCAL_SERVER;

  const { setUser } = useContext(LoggedUserContext);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  let arrayData = [];

  const snackBar = (message, variant, time) => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
      autoHideDuration: time,
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(URL + path);
      arrayData = response.data;
    } catch (error) {
      console.log('błąd:', error);
      snackBar(error.message, 'error', 3000);
    }
  };

  const sendData = async (values) => {
    try {
      const response = await axios.post(URL + path, {
        id: Date.now(),
        ...values,
      });
      if (response.status === 201) {
        snackBar(successMessage, 'success', 3000);
        if (isNavigate) navigate(isNavigate);
      }
    } catch (error) {
      console.error('Błąd:', error);
      snackBar(errorMessage, 'error', 3000);
    }
  };

  const mutation = useMutation({ mutationFn: sendData });

  const handleSubmit = async (values, { setSubmitting }) => {
    if (whichType === 'forRegister') {
      await fetchData();
      const ifAddUser = !arrayData.some((u) => u.email === values.email);
      ifAddUser && mutation.mutate(values);
      !ifAddUser &&
        snackBar(
          'Użytkownik z takim "email" jest już zarejestrowany. Spróbuj użyć innego email...',
          'info',
          5000,
        );
    } else if (whichType === 'forLogin') {
      await fetchData();
      const users = arrayData.filter((u) => u.email === values.email);
      const user = users[0];
      const ifLoginUser = users.some((u) => u.password === values.password);
      if (ifLoginUser) {
        snackBar('Zostałeś pomyślnie zalogowany', 'success', 3000);
        localStorage.setItem(
          'user',
          JSON.stringify({
            name: user.name,
            email: user.email,
            isLogged: true,
          }),
        );
        setUser(
          JSON.parse(localStorage.getItem('user')) || { isLogged: false },
        );
        navigate('/edit');
      } else {
        localStorage.removeItem('user');
        setUser({ isLogged: false });
        snackBar(
          'Taki użytkownik nie istnieje lub podano nieprawidłowe dane',
          'error',
          3000,
        );
      }
    } else mutation.mutate(values);
    setSubmitting(false);
  };
  return handleSubmit;
};

export default useRegisterAndLoginUser;
