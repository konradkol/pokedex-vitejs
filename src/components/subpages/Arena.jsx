import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { StateOfAppContext } from '../../context/StateOfAppContext';

import Layout from '../shared/Layout';
import { PokemonCard } from '../shared/PokemonCard';
import { PokemonsWrapper } from '../shared/PokemonsWrapper';
import { Statistics } from '../shared/Statistics';

import { Container } from '../shared/Container';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 20px;
  ${(props) => props.$revers && { flexDirection: 'row-reverse' }}
`;

const Button = styled.button`
  margin: 20px;
  padding: 5px 25px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
`;

function Arena() {
  const { state, setState } = useContext(StateOfAppContext);
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [isStartFight, setIsStartFight] = useState(true);
  // console.log('fightingPokemons', Object.values(state.fightingPokemons));

  useEffect(() => {
    Object.values(state.fightingPokemons).length >= 2 &&
      setIsDisabledButton(false);
  }, [state.fightingPokemons]);

  useEffect(() => {
    if (
      state.allPokemonsFromApi?.length > 0 &&
      state.allPokemonsFromApi?.every((el) => typeof el !== 'undefined')
    ) {
      if (state.allPokemonsFromApi.some((el) => el.totalFights === undefined))
        setState((prev) => {
          return {
            ...prev,
            allPokemonsFromApi: [...prev.allPokemonsFromApi].map((el) => {
              return { ...el, totalFights: 0, wonFights: 0, lostFights: 0 };
            }),
          };
        });
    }
  }, []);

  const handleClickStartFight = (state, setState) => {
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
    }
    if (powerOfFirstPokemon < powerOfSecondPokemon) {
      winnerPokemon = Object.values(state.fightingPokemons)[1];
      lostPokemon = Object.values(state.fightingPokemons)[0];
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

  return (
    <Layout>
      <PokemonsWrapper>
        {Object.values(state.fightingPokemons).length > 0 &&
        Object.values(state.fightingPokemons).every(
          (el) => typeof el !== 'undefined',
        ) ? (
          <Container $column>
            <PokemonsWrapper>
              {Object.values(state.fightingPokemons).map(
                (
                  {
                    id,
                    sprites,
                    name,
                    height,
                    weight,
                    abilities,
                    base_experience,
                    totalFights,
                    wonFights,
                    lostFights,
                  },
                  idx,
                ) =>
                  idx === 0 ? (
                    <Div key={id}>
                      <Statistics
                        total={totalFights}
                        won={wonFights}
                        lost={lostFights}
                      />
                      <PokemonCard
                        src={sprites?.other.home.front_default}
                        name={name}
                        height={height}
                        weight={weight}
                        ability={abilities[0].ability.name}
                        baseExperience={base_experience}
                      />
                    </Div>
                  ) : (
                    <Div $revers key={id}>
                      <Statistics
                        total={totalFights}
                        won={wonFights}
                        lost={lostFights}
                      />
                      <PokemonCard
                        src={sprites?.other.home.front_default}
                        name={name}
                        height={height}
                        weight={weight}
                        ability={abilities[0].ability.name}
                        baseExperience={base_experience}
                      />
                    </Div>
                  ),
              )}
            </PokemonsWrapper>
            {isStartFight ? (
              <Button
                disabled={isDisabledButton}
                onClick={() => handleClickStartFight(state, setState)}
              >
                FIGHT
              </Button>
            ) : (
              <Button onClick={handleClickRemovePokemonsFromArena}>
                Remove Pokemons
              </Button>
            )}
          </Container>
        ) : (
          <>
            <h1>W Arenie nie ma jeszcze żadnych Pokemonów</h1>
          </>
        )}
      </PokemonsWrapper>
    </Layout>
  );
}

export default Arena;
