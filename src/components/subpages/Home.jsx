import { useEffect, useState, useContext } from 'react';
import { useQueries } from '@tanstack/react-query';

import { fetchData } from '../../services/fetchData';
import { StateOfAppContext } from '../../context/StateOfAppContext';

import Layout from '../shared/Layout';
import { Paginations } from '../main/Paginations';
import { SearchBar } from '../main/SearchBar';
import { PokemonCard } from '../shared/PokemonCard';
import { PokemonsWrapper } from '../shared/PokemonsWrapper';
import { StyledLink } from '../shared/StyledLink';

function Home() {
  const { state, setState } = useContext(StateOfAppContext);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [arr, setArr] = useState([]);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [ifFetchAllPokemonsFromApi, setIfFetchAllPokemonsFromApi] =
    useState(false);
  const [isSearchError, setIsSearchError] = useState(false);
  const [searchHelperText, setSearchHelperText] = useState(
    'Wpisz nazwę Pokemona.',
  );

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
    // console.log(arrWithPokemonsToDisplay);

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
    }
  });

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

  return (
    <Layout>
      <SearchBar
        error={isSearchError}
        helperText={searchHelperText}
        name={name}
        setName={setName}
      />
      <Paginations countPages={11} page={page} setPage={setPage} />
      <PokemonsWrapper>
        {dataToDisplay?.length > 0 || dataToDisplay?.type === 'h1' ? (
          Array.isArray(dataToDisplay) ? (
            dataToDisplay?.map(
              ({
                id,
                isFavourite,
                isFighting,
                sprites,
                name,
                height,
                weight,
                abilities,
                base_experience,
              }) => (
                <StyledLink key={id} to={`/PokemonDetails/${id}`}>
                  <PokemonCard
                    $reduce
                    to="forHome"
                    isFavourite={isFavourite}
                    isFighting={isFighting}
                    src={sprites.other.home.front_default}
                    name={name}
                    height={height}
                    weight={weight}
                    ability={abilities[0].ability.name}
                    baseExperience={base_experience}
                  />
                </StyledLink>
              ),
            )
          ) : (
            dataToDisplay
          )
        ) : fetchAllPokemonsFromApi.isPaused ? (
          <>
            <h1>
              Coś poszło nie tak...
              <br /> Sprawdź swoje połączenie internetowe
            </h1>
          </>
        ) : fetchAllPokemonsFromApi.isError ? (
          <h1>Error: {fetchAllPokemonsFromApi.error?.message}</h1>
        ) : fetchAllPokemonsFromApi.isPending ? (
          <h1>Loading...</h1>
        ) : null}
      </PokemonsWrapper>
    </Layout>
  );
}

export default Home;
