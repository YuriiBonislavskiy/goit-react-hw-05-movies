import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MovieInfo from 'components/MovieInfo';
import { ListItem, StyledLink, AddInfo } from './MovieDetails.styled';
import API from 'Services/SearchDataApi.js';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
// const Genres = (genres) => {
//   const genresNames = genres.map(({ name }) => name).join(", ");

// }

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const [poster, setPoster] = useState('');
  const [genres, setGenres] = useState('');
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState('');
  const { id } = useParams();
  // const [searchParams, setSearchParams] = useSearchParams();
  const [searchParams] = useSearchParams();
  const title = searchParams.get('title');
  // console.log(title);

  const base_URL = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const errorMassage = `Movie ${title} was not found`;
  // console.log(base_URL, id);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }
    API.fetchData(base_URL, errorMassage)
      .then(response => {
        setMovie(response);
        // console.log(response);
        setPoster(`https://image.tmdb.org/t/p/w500/${response.poster_path}`);
        setGenres(() => response.genres.map(({ name }) => name).join(', '));
        // console.log(response);
        setStatus(Status.RESOLVED);
      })
      .catch(err => {
        // console.log('ERROR');
        setMovie({});
        setError(errorMassage);
        setStatus(Status.REJECTED);
      });
  }, [base_URL, errorMassage, isFirstLoad]);

  // useEffect(() => {console.log(movie)},[])

  if (status === 'resolved') {
    return (
      <>
        <MovieInfo
          movie={movie}
          title={title}
          poster={poster}
          genres={genres}
        />
        <AddInfo>Additional information</AddInfo>
        <ul>
          <ListItem>
            <StyledLink to="cast">Cast</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="reviews">Reviews</StyledLink>
          </ListItem>
        </ul>
        <Outlet />
      </>
    );
  }
  if (status === 'rejected') {
    return <h1>{error}</h1>;
  }
};

export default MovieDetails;
