import useHomeLogic from '../../hooks/useHomeLogic';

import Layout from '../shared/Layout';
import { Paginations } from '../main/Paginations';
import { SearchBar } from '../main/SearchBar';
import { PokemonCard } from '../shared/PokemonCard';
import { PokemonsWrapper } from '../shared/PokemonsWrapper';
import { StyledLink } from '../shared/StyledLink';

function Home() {
  const {
    name,
    setName,
    page,
    setPage,
    dataToDisplay,
    isSearchError,
    searchHelperText,
    fetchAllPokemonsFromApi,
  } = useHomeLogic();

  return (
    <Layout>
      <SearchBar
        error={isSearchError}
        helperText={searchHelperText}
        name={name}
        setName={setName}
      />
      <Paginations countPages={11} page={page} setPage={setPage} />
      <PokemonsWrapper>
        {dataToDisplay?.length > 0 || dataToDisplay?.type === 'h1' ? (
          Array.isArray(dataToDisplay) ? (
            dataToDisplay?.map(
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
                <StyledLink key={id} to={`/PokemonDetails/${id}`}>
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
            )
          ) : (
            dataToDisplay
          )
        ) : fetchAllPokemonsFromApi.isPaused ? (
          <>
            <h1>
              Coś poszło nie tak...
              <br /> Sprawdź swoje połączenie internetowe
            </h1>
          </>
        ) : fetchAllPokemonsFromApi.isError ? (
          <h1>Error: {fetchAllPokemonsFromApi.error?.message}</h1>
        ) : fetchAllPokemonsFromApi.isPending ? (
          <h1>Loading...</h1>
        ) : null}
      </PokemonsWrapper>
    </Layout>
  );
}

export default Home;
