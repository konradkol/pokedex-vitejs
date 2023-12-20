import styled from 'styled-components';

export const IconButton = styled.button`
  background-color: transparent;
  border: none;
  ${(props) => ({ id: props.id })}
`;
