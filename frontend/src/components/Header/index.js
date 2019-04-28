import React from 'react';
import { Link } from 'react-router-dom';
import { Container, MenuItem, MenuProfile } from './styles';
import MeetappWhiteLogo from '../../assets/images/logo-white.svg';

const Header = () => (
  <Container>
    <MenuItem>
      <img src={MeetappWhiteLogo} alt="Meetapp white logo" />
    </MenuItem>
    <MenuItem>
      <Link to="/">Início</Link>
    </MenuItem>
    <MenuItem>
      <Link to="/search">Buscar</Link>
    </MenuItem>
    <MenuItem>
      <Link to="/new">Novo meetup</Link>
    </MenuItem>
    <MenuProfile>
      <Link to="/profile">
        <i className="fa fa-user" />
      </Link>
    </MenuProfile>
  </Container>
);

export default Header;
