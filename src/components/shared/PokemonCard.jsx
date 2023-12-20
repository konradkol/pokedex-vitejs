/* eslint-disable react/prop-types */
import styled from 'styled-components';

import { Container } from './Container';
import { IconButton } from './IconButton';
import { SwordsIcon } from './SwordsIcon';
import { HeartIcon } from './HeartIcon';

const Wrapper = styled(Container)`
  flex-direction: column;
  width: 20vw;
  min-width: 250px;
  padding-bottom: 15px;
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
    cursor: pointer;
    scale: 1.05;
    transition: scale 0.5s;
  }

  &:active {
    opacity: 0.3;
    ${(props) => props.$reduce && { scale: '0.9' }}
    transition: scale 0.3s;
  }
`;

const IconsContainer = styled(Container)`
  width: 100%;
  justify-content: end;
  margin: 5px 5px 0 0;
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

export const PokemonCard = ({
  id,
  $reduce,
  to,
  isFighting,
  isFavourite,
  handleClickFight,
  handleClickFavourite,
  src,
  name,
  height,
  weight,
  baseExperience,
  ability,
}) => {
  return (
    <Wrapper $reduce={$reduce}>
      <IconsContainer>
        {to === 'forHome' && (
          <>
            <IconButton>
              {isFighting ? (
                <SwordsIcon color="#00f" size={'22'} />
              ) : (
                <SwordsIcon color="transparent" size={'22'} />
              )}
            </IconButton>
            <IconButton>
              {isFavourite ? (
                <HeartIcon color="#f00" size={'25'} />
              ) : (
                <HeartIcon color="transparent" size={'25'} />
              )}
            </IconButton>
          </>
        )}
        {to === 'forFavourite' && (
          <IconButton id={id} onClick={handleClickFavourite}>
            {isFavourite && <HeartIcon color="#f00" size={'25'} />}
          </IconButton>
        )}
        {to === 'forFighting' && (
          <IconButton onClick={handleClickFight}>
            {isFighting && <SwordsIcon color="#00f" size={'22'} />}
          </IconButton>
        )}
      </IconsContainer>

      <Container>
        <img width="100%" src={src} alt={`image_${name}`} />
      </Container>
      <>
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
      </>
    </Wrapper>
  );
};
