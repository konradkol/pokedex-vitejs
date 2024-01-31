import { useState, useContext } from 'react';
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
import MenuHamburger from './menuHamburger';

import logo_pokeapi from '../../images/logo_pokeapi.png';

const NavbarContainer = styled(Container)`
  justify-content: space-between;
  padding: 20px 20px;
  position: relative;

  .mobile-menu {
    display: none;
  }

  @media (max-width: 920px) {
    .nav-desktop {
      display: none;
    }

    .desktop {
      margin-right: 200px;
    }

    .desktop button {
      display: none;
    }

    .mobile-menu {
      display: flex;
      position: absolute;
      top: 43%;
      right: 10px;
      background-color: #daeee7;
      border-radius: 5px;
      border: 1px solid;
    }

    .show {
      top: 10px;
    }

    .mobile-menu button,
    .mobile-menu a {
      margin: 0 auto;
      padding: 4px 8px;
    }
  }

  @media (max-width: 740px) {
    img {
      align-self: flex-start;
    }

    button {
      align-self: flex-start;
    }

    .isShow {
      margin-bottom: 200px;
    }
  }

  @media (max-width: 640px) {
    img {
      width: 200px;
    }
  }

  @media (max-width: 480px) {
    .avatar {
      display: none;
    }
  }

  @media (max-width: 360px) {
    img {
      width: 150px;
    }
  }
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
  const [isShow, setIsShow] = useState(false);

  return (
    <NavbarContainer>
      <img src={logo_pokeapi} alt="logo_Pokedex" />
      <Nav className="nav-desktop" />
      <StyledButton onClick={() => setIsDarkTheme((prev) => !prev)}>
        {isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
      </StyledButton>
      <Container className={`desktop ${isShow && 'isShow'}`}>
        {user?.isLogged ? (
          <>
            <Container className="avatar">
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
      </Container>
      <MenuHamburger
        className={'mobile-menu'}
        isShow={isShow}
        setIsShow={setIsShow}
      >
        <Nav />
        {user?.isLogged ? (
          <>
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
          <>
            <StyledButton>
              <StyledLink to="/login">Login</StyledLink>
            </StyledButton>
            <StyledButton>
              <StyledLink to="/registration">Registration</StyledLink>
            </StyledButton>
          </>
        )}
      </MenuHamburger>
    </NavbarContainer>
  );
};
