/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Container } from './Container';
import { HeartIcon } from './HeartIcon';

const Wrapper = styled(Container)`
  flex-direction: column;
  min-width: 300px;
  max-width: 1000px;
  background-color: aqua;
  border-radius: 5px;
  box-shadow: 5px 5px 8px 2px;

  overflow: hidden;
  background: #ff432f;
  background: -moz-linear-gradient(
    -45deg,
    #ff432f 0%,
    #58ff3e 50%,
    #381dec 100%
  );
  background: -webkit-linear-gradient(
    -45deg,
    #ff432f 0%,
    #58ff3e 50%,
    #381dec 100%
  );
  background: linear-gradient(135deg, #ff432f 0%, #58ff3e 50%, #381dec 100%);

  &:hover {
    scale: 1.05;
    transition: scale 0.5s;
  }
`;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
`;

const Row = styled(Container)`
  width: 100%;
  justify-content: space-around;
`;

const Title = styled.p`
  margin: 10px;

  &.baseExperience {
    padding-left: 25px;
  }
`;

const StyledLink = styled(Link)`
  width: 50%;
  border: 2px solid #ff0000;
  border-radius: 8px;
  text-align: center;
  color: #ff0000;
  margin: 10px;
  text-decoration: none;
`;

export const PokemonDetailsCard = ({
  isFavourite,
  onClick,
  src,
  name,
  height,
  weight,
  baseExperience,
  ability,
}) => {
  return (
    <Wrapper>
      <p>Strona szczegółów Pokemona</p>
      <StyledButton onClick={onClick}>
        {isFavourite ? (
          <HeartIcon red size={'42'} />
        ) : (
          <HeartIcon size={'42'} />
        )}
      </StyledButton>
      <h1>Pokedex</h1>
      <Row>
        <img width="40%" src={src} alt={`image_${name}`} />
        <Container $column>
          <h1>{name[0].toUpperCase() + name.slice(1)}</h1>
          <Row $column>
            <Row>
              <Container $column>
                <Title>{height}</Title>
                <strong>Height</strong>
              </Container>
              <Container $column>
                <Title className="baseExperience">{baseExperience}</Title>
                <strong>Base experience</strong>
              </Container>
            </Row>
            <Row>
              <Container $column>
                <Title>{weight}</Title>
                <strong>Weight</strong>
              </Container>
              <Container $column>
                <Title>{ability}</Title>
                <strong>Ability</strong>
              </Container>
            </Row>
          </Row>
        </Container>
      </Row>
      <StyledLink to="/">Strona główna</StyledLink>
    </Wrapper>
  );
};
