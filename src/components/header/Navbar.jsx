import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@mui/material';

import { ToggleThemeContext } from '../../context/ToggleThemeContext';
import { LoggedUserContext } from '../../context/LoggedUserContext';

import { Nav } from './Nav';
import { LetterAvatar } from './LetterAvatar';
import { Container } from '../shared/Container';
import DarkModeIcon from './DarkModeIcon';
import LightModeIcon from './LightModeIcon';

import logo_pokeapi from '../../images/logo_pokeapi.png';

const NavbarContainer = styled(Container)`
  justify-content: space-between;
  padding: 20px 20px;
`;

const StyledButton = styled(Button)`
  margin-left: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  border: 2px solid;
  border-radius: 6px;
  padding: 6px 8px;
`;

const StyledP = styled.p`
  margin-left: 5px;
`;

export const Navbar = () => {
  const { isDarkTheme, setIsDarkTheme } = useContext(ToggleThemeContext);
  const { user, setUser } = useContext(LoggedUserContext);
  return (
    <NavbarContainer>
      <img src={logo_pokeapi} alt="logo_Pokedex" />
      <Nav />
      <StyledButton onClick={() => setIsDarkTheme((prev) => !prev)}>
        {isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
      </StyledButton>
      {user?.isLogged ? (
        <>
          <Container>
            <LetterAvatar>{user.name?.slice(0, 1)}</LetterAvatar>
            <StyledP>Witaj, {user.name}</StyledP>
          </Container>
          <StyledButton
            onClick={() => {
              setUser({ isLogged: false });
              localStorage.removeItem('user');
            }}
          >
            Logout
          </StyledButton>
        </>
      ) : (
        <Container>
          <StyledButton>
            <StyledLink to="/login">Login</StyledLink>
          </StyledButton>
          <StyledButton>
            <StyledLink to="/registration">Registration</StyledLink>
          </StyledButton>
        </Container>
      )}
    </NavbarContainer>
  );
};
