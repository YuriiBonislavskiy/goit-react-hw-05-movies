import { useLocation } from 'react-router-dom';
import { ListItem, StyledLink } from './MovieListItems.styled';
import PropTypes from 'prop-types';

const MovieList = ({ movieList }) => {
  const location = useLocation();

  return movieList.map(({ id, title, name, release_date }) => (
    <ListItem key={id}>
      <StyledLink
        to={`/movies/${id}?title=${title ? title : name}`}
        state={{ from: location }}
      >
        {title ? title : name}{' '}
        {release_date ? `(${release_date.slice(0, 4)})` : ''}
      </StyledLink>
    </ListItem>
  ));
};

MovieList.prototype = {
  movieList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
      release_date: PropTypes.string,
    })
  ),
};
  
export default MovieList;
