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
  console.log('state', state);
  const [isShowMessage, setIsShowMessage] = useState(false);

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

  const handleClick = () => {
    setIsShowMessage(true);
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

    if (
      (isShowMessage === true) &
      state.allPokemonsFromApi[idPokemon - 1].isFavourite
    )
      snackBar('Pokemon dodany do ulubionych', 'success', 3000);
    if (
      (isShowMessage === true) &
      !state.allPokemonsFromApi[idPokemon - 1].isFavourite
    )
      snackBar('Pokemon usunięty z ulubionych', 'info', 3000);
    setIsShowMessage(false);
  }, [state.allPokemonsFromApi[idPokemon - 1].isFavourite]);

  return (
    <div>
      <Layout>
        <Container>
          <PokemonDetailsCard
            isFavourite={state.allPokemonsFromApi[idPokemon - 1].isFavourite}
            onClick={handleClick}
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
