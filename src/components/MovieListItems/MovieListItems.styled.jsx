import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ListItem = styled.li`
  text-decoration: none;
  margin-right: 10px;
`;

export const StyledLink = styled(Link)`
  color: #212121;
  text-decoration: none;
  font-size: 16px;

  &.active,
  &:hover,
  &:focus {
    font-size: 18px;
    color: #0f6cf8;
    text-decoration: underline;
  }
`;
