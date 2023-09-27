import { NavLink, } from 'react-router-dom';
import styled from 'styled-components';

export const NavList = styled.ul`
  display: flex;
  list-style: none;
  width: auto;
  text-align: center;
  align-items: center;
`;

export const NavItem = styled.li`
text-decoration: none;
margin-right: 10px;
`;

export const StyledLink = styled(NavLink)`
  color: #212121;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;

  &.active {
    color: orangered;
    text-decoration: underline;
  }
`;
