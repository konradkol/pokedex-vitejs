import { useEffect, useState, useContext } from 'react';
import { useQueries } from '@tanstack/react-query';

import { fetchData } from '../services/fetchData';
import { fetchPokemonsFromServer } from '../services/fetchPokemonsFromServer';
import { StateOfAppContext } from '../context/StateOfAppContext';

const useHomeLogic = () => {
  const { state, setState } = useContext(StateOfAppContext);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [arr, setArr] = useState([]);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [fightingPokemonsFromServer, setFightingPokemonsFromServer] = useState(
    [],
  );
  const [editedPokemonsFromServer, setEditedPokemonsFromServer] = useState([]);
  const [ifFetchAllPokemonsFromApi, setIfFetchAllPokemonsFromApi] =
    useState(false);
  const [isSearchError, setIsSearchError] = useState(false);
  const [searchHelperText, setSearchHelperText] = useState(
    'Wpisz nazwę Pokemona.',
  );

  const URL_FightingPokemons = `${
    import.meta.env.VITE_URL_LOCAL_SERVER
  }fightingPokemons`;

  const URL_EditedPokemons = `${
    import.meta.env.VITE_URL_LOCAL_SERVER
  }editedPokemons`;

  const fetchAllPokemonsFromApi = useQueries({
    queries: arr?.map((id) => ({
      queryKey: ['pokemonList', id],
      queryFn: () => fetchData(id),
      gcTime: 1000 * 60 * 60,
      staleTime: Infinity,
      enabled: ifFetchAllPokemonsFromApi,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        isPaused: results.some((result) => result.isPaused),
        isPending: results.some((result) => result.isPending),
        isLoading: results.some((result) => result.isLoading),
        isError: results.some((result) => result.isError),
        isSuccess: results.every((result) => result.isSuccess),
        error: results.map((result) => result.error)[0],
      };
    },
  });

  useEffect(() => {
    let offset = (page - 1) * 15;
    let arrWithPokemonsToDisplay = [];

    arrWithPokemonsToDisplay = state.allPokemonsFromApi.slice(
      offset,
      offset + 15,
    );

    state.allPokemonsFromApi?.length > 0 &&
      state.allPokemonsFromApi?.every((el) => typeof el !== 'undefined') &&
      setState((prev) => {
        return { ...prev, [page]: arrWithPokemonsToDisplay };
      });
    setName('');
  }, [page, state.allPokemonsFromApi]);

  useEffect(() => {
    const arr = Array.from({ length: 151 }, (_, index) => `${index + 1}`);
    setArr(arr);
    setIfFetchAllPokemonsFromApi(true);
  }, []);

  useEffect(() => {
    !(
      state.allPokemonsFromApi?.length > 0 &&
      state.allPokemonsFromApi?.every((el) => typeof el !== 'undefined')
    ) &&
      setState((prev) => {
        return { ...prev, allPokemonsFromApi: fetchAllPokemonsFromApi.data };
      });
    state.allPokemonsFromApi?.length > 0 &&
      state.allPokemonsFromApi?.every((el) => typeof el !== 'undefined') &&
      setIfFetchAllPokemonsFromApi(false);
  }, [fetchAllPokemonsFromApi.data, fetchAllPokemonsFromApi.isSuccess]);

  useEffect(() => {
    if (
      state.allPokemonsFromApi?.length > 0 &&
      state.allPokemonsFromApi?.every((el) => typeof el !== 'undefined')
    ) {
      if (state.allPokemonsFromApi.some((el) => el.isFavourite === undefined))
        setState((prev) => {
          return {
            ...prev,
            allPokemonsFromApi: [...prev.allPokemonsFromApi].map((el) => {
              return { ...el, isFavourite: false };
            }),
          };
        });
      if (state.allPokemonsFromApi.some((el) => el.isFighting === undefined))
        setState((prev) => {
          return {
            ...prev,
            allPokemonsFromApi: [...prev.allPokemonsFromApi].map((el) => {
              return { ...el, isFighting: false };
            }),
          };
        });
      if (state.allPokemonsFromApi.some((el) => el.totalFights === undefined))
        setState((prev) => {
          return {
            ...prev,
            allPokemonsFromApi: [...prev.allPokemonsFromApi].map((el) => {
              return { ...el, totalFights: 0, wonFights: 0, lostFights: 0 };
            }),
          };
        });
    }
  });

  useEffect(() => {
    if (
      state.allPokemonsFromApi?.length > 0 &&
      state.allPokemonsFromApi?.every((el) => typeof el !== 'undefined')
    ) {
      if (editedPokemonsFromServer.length > 0) {
        setState((prev) => {
          return {
            ...prev,
            allPokemonsFromApi: prev.allPokemonsFromApi.map((el) => {
              const arrWithEditedPokemon = editedPokemonsFromServer.filter(
                (item) => item.id === el.id,
              );
              const editedPokemon = arrWithEditedPokemon[0];
              if (arrWithEditedPokemon.length) {
                return {
                  ...el,
                  weight: editedPokemon.weight,
                  height: editedPokemon.height,
                  base_experience: editedPokemon.base_experience,
                };
              } else {
                return el;
              }
            }),
          };
        });
      }
    }
  }, [
    editedPokemonsFromServer,
    fetchAllPokemonsFromApi.data,
    fetchAllPokemonsFromApi.isSuccess,
  ]);

  useEffect(() => {
    fetchPokemonsFromServer(URL_EditedPokemons, setEditedPokemonsFromServer);
  }, []);

  useEffect(() => {
    if (
      state.allPokemonsFromApi?.length > 0 &&
      state.allPokemonsFromApi?.every((el) => typeof el !== 'undefined')
    ) {
      if (fightingPokemonsFromServer.length > 0) {
        setState((prev) => {
          return {
            ...prev,
            allPokemonsFromApi: prev.allPokemonsFromApi.map((el) => {
              const arrWithFindPokemon = fightingPokemonsFromServer.filter(
                (item) => item.id === el.id,
              );
              const findPokemon = arrWithFindPokemon[0];
              if (arrWithFindPokemon.length) {
                return {
                  ...el,
                  base_experience: findPokemon.base_experience,
                  lostFights: findPokemon.lostFights,
                  totalFights: findPokemon.totalFights,
                  wonFights: findPokemon.wonFights,
                };
              } else {
                return el;
              }
            }),
          };
        });
      }
    }
  }, [
    fightingPokemonsFromServer,
    fetchAllPokemonsFromApi.data,
    fetchAllPokemonsFromApi.isSuccess,
  ]);

  useEffect(() => {
    fetchPokemonsFromServer(
      URL_FightingPokemons,
      setFightingPokemonsFromServer,
    );
  }, []);

  useEffect(() => {
    setDataToDisplay(state[page]);
  }, [page, state]);

  useEffect(() => {
    const searchPokemons = (arr, name) => {
      if (!Array.isArray(arr)) return;
      let index = name.length;
      const filteredArr = index
        ? arr?.filter((el) => el.name?.slice(0, index) === name)
        : [];
      if (index === 0) {
        setDataToDisplay(state[page]);
        setIsSearchError(false);
        setSearchHelperText('Wpisz nazwę Pokemona.');
      } else if (filteredArr.length === 0) {
        setDataToDisplay(
          <h1>Pokemon o takiej nazwie nie występuje na liście.</h1>,
        );
        setIsSearchError(true);
        setSearchHelperText('Wpisz poprawną nazwę Pokemona.');
      } else {
        setDataToDisplay(filteredArr);
        setIsSearchError(false);
        setSearchHelperText('Wpisz nazwę Pokemona.');
      }
    };

    searchPokemons(state.allPokemonsFromApi, name);
  }, [name]);

  return {
    state,
    setState,
    name,
    setName,
    page,
    setPage,
    dataToDisplay,
    isSearchError,
    searchHelperText,
    fetchAllPokemonsFromApi,
  };
};

export default useHomeLogic;
