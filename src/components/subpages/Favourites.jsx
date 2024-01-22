import { useContext, useEffect, useState } from 'react';

import { StateOfAppContext } from '../../context/StateOfAppContext';

import Layout from '../shared/Layout';
import { PokemonCard } from '../shared/PokemonCard';
import { PokemonsWrapper } from '../shared/PokemonsWrapper';

function Favourites() {
  const { state, setState } = useContext(StateOfAppContext);
  const [idElement, setIdElement] = useState();

  const handleClickFavourite = (e) => {
    const idItem = Number(e.target.parentElement.id);
    setIdElement(idItem);
    setState((prev) => {
      return {
        ...prev,
        allPokemonsFromApi: [...prev.allPokemonsFromApi].map((el) => {
          if (el.id === idItem) {
            return {
              ...el,
              isFavourite: false,
            };
          } else {
            return el;
          }
        }),
      };
    });
  };

  useEffect(() => {
    typeof idElement !== 'undefined' &&
    state.allPokemonsFromApi[idElement - 1]?.isFavourite
      ? setState((prev) => {
          return {
            ...prev,
            favouritePokemons: {
              ...prev.favouritePokemons,
              [idElement]: state.allPokemonsFromApi[idElement - 1],
            },
          };
        })
      : setState((prev) => {
          const { [idElement]: el, ...rest } = prev.favouritePokemons;
          return {
            ...prev,
            favouritePokemons: { ...rest },
          };
        });
  }, [idElement, state.allPokemonsFromApi]);

  return (
    <Layout>
      <PokemonsWrapper>
        {Object.values(state.favouritePokemons).length > 0 &&
        Object.values(state.favouritePokemons).every(
          (el) => typeof el !== 'undefined',
        ) ? (
          Object.values(state.favouritePokemons).map(
            ({
              id,
              isFavourite,
              sprites,
              name,
              height,
              weight,
              abilities,
              base_experience,
            }) => (
              <PokemonCard
                id={id}
                to="forFavourite"
                isFavourite={isFavourite}
                handleClickFavourite={handleClickFavourite}
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
