/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { Container } from './Container';

const Wrapper = styled(Container)`
  flex-direction: column;
  width: 20vw;
  min-width: 250px;
  padding-bottom: 15px;
  /* background-color: aqua; */
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
    scale: 0.9;
    transition: scale 0.3s;
  }
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
  src,
  name,
  height,
  weight,
  baseExperience,
  ability,
}) => {
  return (
    <Wrapper>
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
