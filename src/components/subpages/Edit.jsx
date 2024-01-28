import { useContext } from 'react';

import { LoggedUserContext } from '../../context/LoggedUserContext';

import useEditLogic from '../../hooks/useEditLogic';

import Layout from '../shared/Layout';
import { Paginations } from '../main/Paginations';
import { PokemonCard } from '../shared/PokemonCard';
import { PokemonsWrapper } from '../shared/PokemonsWrapper';
import { Container } from '../shared/Container';
import { StyledLink } from '../shared/StyledLink';

function Edit() {
  const { user } = useContext(LoggedUserContext);

  const { state, setState, page, setPage, dataToDisplay } = useEditLogic();

  return (
    <Layout>
      {!user.isLogged ? (
        <h1>You have to log in first</h1>
      ) : (
        <>
          {dataToDisplay?.length > 0 ? (
            <>
              <Container>
                <h1>Select Pokemon to edit</h1>
              </Container>
              <Paginations countPages={11} page={page} setPage={setPage} />
              <PokemonsWrapper>
                {dataToDisplay?.map(
                  ({
                    id,
                    isFavourite,
                    isFighting,
                    sprites,
                    name,
                    height,
                    weight,
                    abilities,
                    base_experience,
                  }) => (
                    <StyledLink key={id} to={`/editForm/${id}`}>
                      <PokemonCard
                        $reduce
                        to="forHome"
                        isFavourite={isFavourite}
                        isFighting={isFighting}
                        src={sprites.other.home.front_default}
                        name={name}
                        height={height}
                        weight={weight}
                        ability={abilities[0].ability.name}
                        baseExperience={base_experience}
                      />
                    </StyledLink>
                  ),
                )}
              </PokemonsWrapper>
            </>
          ) : (
            <Container $column>
              <h2>An unexpected error occured.</h2>
              <StyledLink to="/">Return to home page.</StyledLink>
            </Container>
          )}
        </>
      )}
    </Layout>
  );
}

export default Edit;
