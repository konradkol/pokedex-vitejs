import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { LoggedUserContext } from '../../context/LoggedUserContext';

import { Container } from '../shared/Container';

const dataForUserIsLogin = [
  { id: crypto.randomUUID(), to: '/', text: 'HOME' },
  { id: crypto.randomUUID(), to: '/favourites', text: 'FAVOURITES' },
  { id: crypto.randomUUID(), to: '/arena', text: 'ARENA' },
  // { id: crypto.randomUUID(), to: '/profile', text: '' },
];

const dataForUserIsLogout = [
  { id: crypto.randomUUID(), to: '/login', text: 'LOGIN' },
  { id: crypto.randomUUID(), to: '/registration', text: 'REGISTRATION' },
];

const NavContainer = styled(Container)`
  /* gap: 20px; */
  ul {
    column-gap: 30px;
  }
  a {
    text-decoration: none;
    /* color: #0026ff; */
  }
  .active {
    color: green;
  }
`;

export const Nav = () => {
  const { user, setUser } = useContext(LoggedUserContext);

  return (
    <NavContainer as="nav">
      <Container as="ul">
        {dataForUserIsLogin.map(({ id, to, text }) => (
          <Container key={id} as="li">
            <NavLink to={to}>{text}</NavLink>
          </Container>
        ))}
        {user?.isLogged ? (
          <Container as="li">
            <NavLink to="/edit">EDIT</NavLink>
          </Container>
        ) : (
          <>
            {dataForUserIsLogout.map(({ id, to, text }) => (
              <Container key={id} as="li">
                <NavLink to={to}>{text}</NavLink>
              </Container>
            ))}
          </>
        )}
      </Container>
    </NavContainer>
  );
};
