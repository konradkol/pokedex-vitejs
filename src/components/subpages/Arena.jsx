import styled from 'styled-components';

import useArenaLogic from '../../hooks/useArenaLogic';

import Layout from '../shared/Layout';
import { PokemonCard } from '../shared/PokemonCard';
import { Statistics } from '../shared/Statistics';

import { PokemonsWrapper } from '../shared/PokemonsWrapper';
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
  const {
    isDisabledButton,
    isStartFight,
    opacityOfFirstPokemon,
    opacityOfSecondPokemon,
    handleClickStartFight,
    handleClickRemovePokemonsFromArena,
    state,
  } = useArenaLogic();

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
                        $opacity={opacityOfFirstPokemon}
                        src={sprites?.other.home.front_default}
                        name={name}
                        height={height}
                        weight={weight}
                        ability={abilities[0].ability.name}
                        baseExperience={base_experience}
                      />
                    </Div>
                  ) : (
                    <Div $revers $right key={id}>
                      <Statistics
                        total={totalFights}
                        won={wonFights}
                        lost={lostFights}
                      />
                      <PokemonCard
                        $opacity={opacityOfSecondPokemon}
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
                onClick={handleClickStartFight}
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
          // eslint-disable-next-line react/no-unescaped-entities
          <h1>There aren't any Pokemon in the Arena yet.</h1>
        )}
      </PokemonsWrapper>
    </Layout>
  );
}

export default Arena;
