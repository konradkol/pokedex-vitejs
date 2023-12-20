import { createContext, useState } from 'react';

const StateOfAppContext = createContext();

const StateOfAppContextProvider = () => {
  const [state, setState] = useState({
    favouritePokemons: {},
    fightingPokemons: {},
    allPokemonsFromApi: [],
  });
  return { state, setState };
};

export { StateOfAppContext, StateOfAppContextProvider };
