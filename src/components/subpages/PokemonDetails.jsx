import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { StateOfAppContext } from '../../context/StateOfAppContext';

import Layout from '../shared/Layout';
import { PokemonDetailsCard } from '../shared/PokemonDetailsCard';
import { Container } from '../shared/Container';

export const PokemonDetails = () => {
  const { id } = useParams();
  const idPokemon = parseInt(id);

  const { state, setState } = useContext(StateOfAppContext);
  const [arrWithFightingPokemons, setArrWithFightingPokemons] = useState([]);
  const [isShowFavouriteMessage, setIsShowFavouriteMessage] = useState(false);
  const [isShowFightingMessage, setIsShowFightingMessage] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

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
  const handleClickFight = () => {
    setIsShowFightingMessage(true);

    setState((prev) => {
      return {
        ...prev,
        allPokemonsFromApi: [...prev.allPokemonsFromApi].map((el) => {
          if (el.id === idPokemon) {
            if (el.isFighting === false) {
              if (arrWithFightingPokemons.length < 2) {
                return {
                  ...el,
                  isFighting: true,
                };
              } else {
                return el;
              }
            } else if (el.isFighting === true) {
              return {
                ...el,
                isFighting: false,
              };
            }
          } else {
            return el;
          }
        }),
      };
    });
  };

  useEffect(() => {
    setArrWithFightingPokemons(
      state.allPokemonsFromApi.filter((el) => el.isFighting === true),
    );
  }, [state.allPokemonsFromApi]);

  const handleClickFavourite = () => {
    setIsShowFavouriteMessage(true);

    setState((prev) => {
      return {
        ...prev,
        allPokemonsFromApi: [...prev.allPokemonsFromApi].map((el) => {
          if (el.id === idPokemon) {
            return {
              ...el,
              isFavourite: !prev.allPokemonsFromApi[idPokemon - 1].isFavourite,
            };
          } else {
            return el;
          }
        }),
      };
    });
  };

  useEffect(() => {
    state.allPokemonsFromApi[idPokemon - 1].isFavourite
      ? setState((prev) => {
          return {
            ...prev,
            favouritePokemons: {
              ...prev.favouritePokemons,
              [id]: state.allPokemonsFromApi[idPokemon - 1],
            },
          };
        })
      : setState((prev) => {
          const { [id]: el, ...rest } = prev.favouritePokemons;
          return {
            ...prev,
            favouritePokemons: { ...rest },
          };
        });

    state.allPokemonsFromApi[idPokemon - 1].isFighting
      ? setState((prev) => {
          return {
            ...prev,
            fightingPokemons: {
              ...prev.fightingPokemons,
              [id]: state.allPokemonsFromApi[idPokemon - 1],
            },
          };
        })
      : setState((prev) => {
          const { [id]: el, ...rest } = prev.fightingPokemons;
          return {
            ...prev,
            fightingPokemons: { ...rest },
          };
        });

    if (
      isShowFavouriteMessage === true &&
      state.allPokemonsFromApi[idPokemon - 1].isFavourite
    )
      snackBar('Pokemon dodany do ulubionych', 'success', 3000);
    if (
      isShowFavouriteMessage === true &&
      !state.allPokemonsFromApi[idPokemon - 1].isFavourite
    )
      snackBar('Pokemon usunięty z ulubionych', 'info', 3000);

    if (
      arrWithFightingPokemons.length < 2 &&
      isShowFightingMessage === true &&
      state.allPokemonsFromApi[idPokemon - 1].isFighting
    )
      snackBar('Pokemon dodany do areny', 'success', 3000);

    if (
      arrWithFightingPokemons.length <= 2 &&
      isShowFightingMessage === true &&
      !state.allPokemonsFromApi[idPokemon - 1].isFighting
    )
      snackBar('Pokemon usunięty z areny', 'info', 3000);

    setIsShowFavouriteMessage(false);
    setIsShowFightingMessage(false);
  }, [
    state.allPokemonsFromApi[idPokemon - 1].isFavourite,
    state.allPokemonsFromApi[idPokemon - 1].isFighting,
  ]);

  return (
    <div>
      <Layout>
        <Container>
          <PokemonDetailsCard
            isFighting={state.allPokemonsFromApi[idPokemon - 1].isFighting}
            isFavourite={state.allPokemonsFromApi[idPokemon - 1].isFavourite}
            handleClickFight={handleClickFight}
            handleClickFavourite={handleClickFavourite}
            src={
              state.allPokemonsFromApi[idPokemon - 1].sprites.other.home
                .front_default
            }
            name={state.allPokemonsFromApi[idPokemon - 1].name}
            height={state.allPokemonsFromApi[idPokemon - 1].height}
            weight={state.allPokemonsFromApi[idPokemon - 1].weight}
            ability={
              state.allPokemonsFromApi[idPokemon - 1].abilities[0].ability.name
            }
            baseExperience={
              state.allPokemonsFromApi[idPokemon - 1].base_experience
            }
          />
        </Container>
      </Layout>
    </div>
  );
};
