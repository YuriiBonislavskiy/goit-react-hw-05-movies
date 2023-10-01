import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const BackLink = styled(Link)`
  color: #212121;
  margin-top: 50px;
  margin-bottom: 10px;
  margin-left: 10px;
  font-size: 16px;
  color: #0f6cf8;

  &.active,
  &:hover,
  &:focus {
    font-weight: bold;
    text-decoration: underline;
  }
`;

export const MovieInfoContainer = styled.div`
  display: flex;
  padding-top: 6px;
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
