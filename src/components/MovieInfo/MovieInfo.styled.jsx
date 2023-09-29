import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MovieInfoContainer = styled.div`
  display: flex;
  padding-bottom: 6px;
`;

export const MoviePoster = styled.img`
  margin-left: 6px;
  width: 270px;
  height: auto;
`;

export const MovieInfoDetail = styled.div`
  padding-left: 20px;
  padding-right: 20px;
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
