import { useContext } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import { fetchData } from '../../services/fetchData';
import { StateOfAppContext } from '../../context/StateOfAppContext';

import Layout from '../shared/Layout';
import { PokemonDetailsCard } from '../shared/PokemonDetailsCard';
import { Container } from '../shared/Container';

export const PokemonDetails = () => {
  const { id } = useParams();
  // console.log('id', id);

  const { state, setState } = useContext(StateOfAppContext);
  console.log('state', state);

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

  const { data, isPending, isPaused, error } = useQuery({
    queryKey: ['pokemonDetails', id],
    queryFn: () => fetchData(id),
    gcTime: 100 * 60 * 60,
  });
  console.log('data', data);

  const mutation = useMutation({
    mutationFn: addFavouritePokemon,
  });

  async function addFavouritePokemon(item) {
    try {
      const response = await axios.post(
        'http://localhost:3000/favouritePokemons',
        item,
      );
      console.log('response', response);
      if (response.status === 201) {
        snackBar('Pokemon dodany do ulubionych', 'success', 3000);
      }
    } catch (error) {
      console.error(error);
      snackBar(error.message, 'error', 3000);
    }
  }

  const handleClick = () => {
    setState((prev) => {
      return {
        ...prev,
        favouritePokemons: { ...prev.favouritePokemons, [id]: data },
      };
    });
    // mutation.mutate(state.favouritePokemons[id])
  };

  return (
    <div>
      <Layout>
        <Container>
          {isPaused ? (
            <>
              <h1>
                Coś poszło nie tak...
                <br /> Sprawdź swoje połączenie internetowe
              </h1>
            </>
          ) : isPending ? (
            <h1>Loading...</h1>
          ) : error ? (
            <h1>Error: {error?.message}</h1>
          ) : (
            <PokemonDetailsCard
              onClick={handleClick}
              src={data.sprites.other.home.front_default}
              name={data.name}
              height={data.height}
              weight={data.weight}
              ability={data.abilities[0].ability.name}
              baseExperience={data.base_experience}
            />
          )}
        </Container>
      </Layout>
    </div>
  );
};
