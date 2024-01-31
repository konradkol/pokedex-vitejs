import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { LoggedUserContext } from '../../context/LoggedUserContext';

import { Container } from '../shared/Container';

const dataForUserIsLogin = [
  { id: crypto.randomUUID(), to: '/', text: 'HOME' },
  { id: crypto.randomUUID(), to: '/favourites', text: 'FAVOURITES' },
  { id: crypto.randomUUID(), to: '/arena', text: 'ARENA' },
];

const NavContainer = styled(Container)`
  ul {
    column-gap: 30px;
  }
  a {
    text-decoration: none;
  }
  .active {
    color: #008000;
  }

  @media (max-width: 920px) {
    ul {
      flex-direction: column;
      align-items: start;
    }
  }
`;

export const Nav = ({ className }) => {
  const { user } = useContext(LoggedUserContext);

  return (
    <NavContainer className={className} as="nav">
      <Container as="ul">
        {dataForUserIsLogin.map(({ id, to, text }) => (
          <Container key={id} as="li">
            <NavLink to={to}>{text}</NavLink>
          </Container>
        ))}
        {user?.isLogged && (
          <Container as="li">
            <NavLink to="/edit">EDIT</NavLink>
          </Container>
        )}
      </Container>
    </NavContainer>
  );
};
