import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const InfoBox = styled.div`
  border-top: 4px solid #c9cacc;
  border-bottom: 4px solid #c9cacc;
`;

export const AddInfo = styled.h2`
  margin-left: 6px;
  font-size: 16px;
`;

export const ListItem = styled.li`
  text-decoration: none;
  margin-right: 10px;
`;

export const StyledLink = styled(Link)`
  color: #212121;
  /* text-decoration: none; */
  font-size: 16px;
  color: #0f6cf8;

  &.active,
  &:hover,
  &:focus {
    font-size: 18px;
    font-weight: bold;
    text-decoration: underline;
  }
`;
