import { createContext, useState } from 'react';

const StateOfAppContext = createContext();

const StateOfAppContextProvider = () => {
  const [state, setState] = useState({ favouritePokemons: {} });
  return { state, setState };
};

export { StateOfAppContext, StateOfAppContextProvider };
