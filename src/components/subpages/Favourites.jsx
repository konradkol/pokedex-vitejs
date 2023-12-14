import { useContext } from 'react';

import { StateOfAppContext } from '../../context/StateOfAppContext';

import Layout from '../shared/Layout';
import { PokemonCard } from '../shared/PokemonCard';
import { PokemonsWrapper } from '../shared/PokemonsWrapper';

function Favourites() {
  const { state, setState } = useContext(StateOfAppContext);
  console.log('favoritePokemons', Object.values(state.favouritePokemons));

  return (
    <Layout>
      <PokemonsWrapper>
        {Object.values(state.favouritePokemons).length > 0 ? (
          Object.values(state.favouritePokemons).map(
            ({
              id,
              sprites,
              name,
              height,
              weight,
              abilities,
              base_experience,
            }) => (
              <PokemonCard
                key={id}
                src={sprites?.other.home.front_default}
                name={name}
                height={height}
                weight={weight}
                ability={abilities[0].ability.name}
                baseExperience={base_experience}
              />
            ),
          )
        ) : (
          <h1>Nie masz jeszcze ulubionych Pokemonów</h1>
        )}
      </PokemonsWrapper>
    </Layout>
  );
}

export default Favourites;
