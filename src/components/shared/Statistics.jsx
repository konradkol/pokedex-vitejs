/* eslint-disable react/prop-types */
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5px;
  border: 2px solid;
  border-radius: 10px;
`;

export const Statistics = ({ total, won, lost }) => {
  return (
    <Div>
      <h3>Statistics:</h3>
      <p>Total counts of fights: {total}</p>
      <p>Won fights: {won}</p>
      <p>Lost fights: {lost}</p>
    </Div>
  );
};
