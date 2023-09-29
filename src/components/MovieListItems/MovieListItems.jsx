// import { Link } from 'react-router-dom';
import { ListItem, StyledLink } from './MovieListItems.styled';

const MovieList = ({ movieList }) => {
  return movieList.map(({ id, title, name, release_date }) => (
    <ListItem key={id}>
      <StyledLink to={`/movies/${id}?title=${title ? title : name}`}>
        {title ? title : name}{' '}
        {release_date ? `(${release_date.slice(0, 4)})` : ''}
      </StyledLink>
    </ListItem>
  ));
};

export default MovieList;
