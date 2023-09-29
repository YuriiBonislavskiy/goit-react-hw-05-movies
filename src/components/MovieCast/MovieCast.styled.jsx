import styled from 'styled-components';

export const CastGallery = styled.ul`
  padding: 0;
  padding-top: 20px;
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-gap: 6px;
  margin-top: 0;
  margin-bottom: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
  /* border-color: rgb(240, 248, 255, 0); */
`;