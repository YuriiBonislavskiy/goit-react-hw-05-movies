import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const PageHeader = styled.header`
  background-color: #f7f1f1e3;
  padding-top: 6px;
  padding-bottom: 6px;
`;
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
  font-size: 22px;

  &:hover,
  &:focus {
    font-weight: bold;
    color: #0f6cf8;
  }

  &.active {
    color: #0f6cf8;
    text-decoration: underline;
  }
`;
