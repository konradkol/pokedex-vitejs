import { useEffect, useState, useContext } from 'react';

import { StateOfAppContext } from '../context/StateOfAppContext';

const useEditLogic = () => {
  const { state, setState } = useContext(StateOfAppContext);
  const [page, setPage] = useState(1);
  const [dataToDisplay, setDataToDisplay] = useState([]);

  useEffect(() => {
    let offset = (page - 1) * 15;
    let arrWithPokemonsToDisplay = [];

    arrWithPokemonsToDisplay = state.allPokemonsFromApi.slice(
      offset,
      offset + 15,
    );

    setDataToDisplay(arrWithPokemonsToDisplay);
  }, [page, state.allPokemonsFromApi]);

  return {
    state,
    setState,
    page,
    setPage,
    dataToDisplay,
  };
};

export default useEditLogic;
