import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { fetchPokemonsFromServer } from '../services/fetchPokemonsFromServer';

import { StateOfAppContext } from '../context/StateOfAppContext';

const URL = `${import.meta.env.VITE_URL_LOCAL_SERVER}fightingPokemons`;

const useArenaLogic = () => {
  const { state, setState } = useContext(StateOfAppContext);
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [isStartFight, setIsStartFight] = useState(true);
  const [winnerPokemon, setWinnerPokemon] = useState({});
  const [lostPokemon, setLostPokemon] = useState({});
  const [opacityOfFirstPokemon, setOpacityOfFirstPokemon] = useState(false);
  const [opacityOfSecondPokemon, setOpacityOfSecondPokemon] = useState(false);
  const [pokemonsFromServer, setPokemonsFromServer] = useState([]);

  useEffect(() => {
    Object.values(state.fightingPokemons).length >= 2 &&
      setIsDisabledButton(false);
  }, [state.fightingPokemons]);

  useEffect(() => {
    fetchPokemonsFromServer(URL, setPokemonsFromServer);
  }, [state.fightingPokemons]);

  useEffect(() => {
    !isStartFight &&
      sendPokemonsToServer(URL, Object.values(state.fightingPokemons));
  }, [state.fightingPokemons]);

  const filterKeys = (pokemon) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      base_experience: pokemon.base_experience,
      totalFights: pokemon.totalFights,
      wonFights: pokemon.wonFights,
      lostFights: pokemon.lostFights,
    };
  };

  const sendPokemonsToServer = async (url, data) => {
    try {
      await Promise.all(
        data.map(async (pokemon) => {
          const filteredPokemon = filterKeys(pokemon);
          let ifAddNewPokemon = !pokemonsFromServer.filter(
            (el) => el.id === pokemon.id,
          ).length;
          ifAddNewPokemon
            ? await axios.post(url, filteredPokemon)
            : pokemon.id === winnerPokemon.id
              ? await axios.patch(`${url}/${pokemon.id}`, {
                  totalFights: winnerPokemon.totalFights + 1,
                  wonFights: winnerPokemon.wonFights + 1,
                  base_experience: winnerPokemon.base_experience + 10,
                })
              : await axios.patch(`${url}/${pokemon.id}`, {
                  totalFights: lostPokemon.totalFights + 1,
                  lostFights: lostPokemon.lostFights + 1,
                });
        }),
      );
    } catch (error) {
      console.error('Błąd:', error);
    }
  };

  const handleClickStartFight = () => {
    let winnerPokemon;
    let lostPokemon;
    const powerOfFirstPokemon =
      Object.values(state.fightingPokemons)[0].base_experience *
      Object.values(state.fightingPokemons)[0].weight;
    const powerOfSecondPokemon =
      Object.values(state.fightingPokemons)[1].base_experience *
      Object.values(state.fightingPokemons)[1].weight;
    if (powerOfFirstPokemon > powerOfSecondPokemon) {
      winnerPokemon = Object.values(state.fightingPokemons)[0];
      lostPokemon = Object.values(state.fightingPokemons)[1];
      setOpacityOfSecondPokemon(true);
    }
    if (powerOfFirstPokemon < powerOfSecondPokemon) {
      winnerPokemon = Object.values(state.fightingPokemons)[1];
      lostPokemon = Object.values(state.fightingPokemons)[0];
      setOpacityOfFirstPokemon(true);
    }
    setIsStartFight(false);
    alert(`The winner is ${winnerPokemon.name.toUpperCase()}`);
    setState((prev) => {
      return {
        ...prev,
        allPokemonsFromApi: prev.allPokemonsFromApi.map((el) => {
          if (el.name === winnerPokemon.name) {
            return {
              ...el,
              base_experience: el.base_experience + 10,
              totalFights: el.totalFights + 1,
              wonFights: el.wonFights + 1,
            };
          } else if (el.name === lostPokemon.name) {
            return {
              ...el,
              totalFights: el.totalFights + 1,
              lostFights: el.lostFights + 1,
            };
          } else {
            return el;
          }
        }),
        fightingPokemons: {
          [lostPokemon.id]: {
            ...prev.fightingPokemons[lostPokemon.id],
            totalFights: prev.fightingPokemons[lostPokemon.id].totalFights + 1,
            lostFights: prev.fightingPokemons[lostPokemon.id].lostFights + 1,
          },
          [winnerPokemon.id]: {
            ...prev.fightingPokemons[winnerPokemon.id],
            base_experience:
              prev.fightingPokemons[winnerPokemon.id].base_experience + 10,
            totalFights:
              prev.fightingPokemons[winnerPokemon.id].totalFights + 1,
            wonFights: prev.fightingPokemons[winnerPokemon.id].wonFights + 1,
          },
        },
      };
    });
    setWinnerPokemon(winnerPokemon);
    setLostPokemon(lostPokemon);
  };

  const handleClickRemovePokemonsFromArena = () => {
    setState((prev) => {
      return {
        ...prev,
        allPokemonsFromApi: prev.allPokemonsFromApi.map((el) => {
          return {
            ...el,
            isFighting: false,
          };
        }),
        fightingPokemons: {},
      };
    });
  };

  return {
    isDisabledButton,
    isStartFight,
    opacityOfFirstPokemon,
    opacityOfSecondPokemon,
    handleClickStartFight,
    handleClickRemovePokemonsFromArena,
    state,
  };
};

export default useArenaLogic;
