import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { fetchPokemonsFromServer } from '../services/fetchPokemonsFromServer';

import { StateOfAppContext } from '../context/StateOfAppContext';

const URL = `${import.meta.env.VITE_URL_LOCAL_SERVER}editedPokemons`;

const useEditFormLogic = (id) => {
  const { state, setState } = useContext(StateOfAppContext);
  const [pokemonsFromServer, setPokemonsFromServer] = useState([]);

  const pokemon = state.allPokemonsFromApi[id - 1];

  useEffect(() => {
    fetchPokemonsFromServer(URL, setPokemonsFromServer);
  }, [state.allPokemonsFromApi]);

  const filterKeys = (pokemon) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      base_experience: pokemon.base_experience,
      height: pokemon.height,
      weight: pokemon.weight,
    };
  };

  const sendPokemonsToServer = async (url, pokemon, newValue) => {
    try {
      let filteredPokemon = filterKeys(pokemon);
      filteredPokemon = {
        ...filteredPokemon,
        height: newValue.height,
        weight: newValue.weight,
        base_experience: newValue.base_experience,
      };
      let ifAddNewPokemon = !pokemonsFromServer.filter(
        (el) => el.id === pokemon.id,
      ).length;
      ifAddNewPokemon
        ? await axios.post(url, filteredPokemon)
        : await axios.patch(`${url}/${pokemon.id}`, {
            height: newValue.height,
            weight: newValue.weight,
            base_experience: newValue.base_experience,
          });
    } catch (error) {
      console.error('Błąd:', error);
    }
  };

  const handleSubmit = (newValue, { setSubmitting }) => {
    setState((prev) => {
      return {
        ...prev,
        allPokemonsFromApi: prev.allPokemonsFromApi.map((el) => {
          if (el.id === id) {
            return {
              ...el,
              height: newValue.height,
              weight: newValue.weight,
              base_experience: newValue.base_experience,
            };
          } else {
            return el;
          }
        }),
      };
    });
    sendPokemonsToServer(URL, pokemon, newValue);
    setSubmitting(false);
  };

  return {
    pokemon,
    handleSubmit,
  };
};

export default useEditFormLogic;
