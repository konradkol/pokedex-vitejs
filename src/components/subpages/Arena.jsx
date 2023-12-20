import { useContext } from 'react';

import { StateOfAppContext } from '../../context/StateOfAppContext';

import Layout from '../shared/Layout';
import { PokemonCard } from '../shared/PokemonCard';
import { PokemonsWrapper } from '../shared/PokemonsWrapper';

function Arena() {
  const { state, setState } = useContext(StateOfAppContext);
  // console.log('fightingPokemons', Object.values(state.fightingPokemons));

  return (
    <Layout>
      <PokemonsWrapper>
        {Object.values(state.fightingPokemons).length > 0 &&
        Object.values(state.fightingPokemons).every(
          (el) => typeof el !== 'undefined',
        ) ? (
          Object.values(state.fightingPokemons).map(
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
          <h1>W Arenie nie ma jeszcze żadnych Pokemonów</h1>
        )}
      </PokemonsWrapper>
    </Layout>
  );
}

export default Arena;
