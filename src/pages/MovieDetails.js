import {
  Outlet,
  useParams,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import { useEffect, useState, useRef, Suspense } from 'react';
import MovieInfo from 'components/MovieInfo';
import { InfoBox, ListItem, StyledLink, AddInfo } from './MovieDetails.styled';
import Loader from 'components/Loader';
import API from 'Services/SearchDataApi.js';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const [poster, setPoster] = useState('');
  const [genres, setGenres] = useState('');
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState('');
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const title = searchParams.get('title') ?? '';

  const location = useLocation();
  const backLincLocation = useRef(location.state?.from ?? '/movies');

  const base_URL = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const errorMassage = `Movie ${title} was not found`;

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }
    API.fetchData(base_URL, errorMassage)
      .then(response => {
        setMovie(response);
        setPoster(`https://image.tmdb.org/t/p/w500/${response.poster_path}`);
        setGenres(() => response.genres.map(({ name }) => name).join(', '));
        setStatus(Status.RESOLVED);
      })
      .catch(err => {
        setMovie({});
        setError(errorMassage);
        setStatus(Status.REJECTED);
      });
  }, [base_URL, errorMassage, isFirstLoad]);

  if (status === 'resolved') {
    return (
      <>
        <MovieInfo
          movie={movie}
          poster={poster}
          genres={genres}
          backLincLocation={backLincLocation}
        />
        <InfoBox>
          <AddInfo>Additional information</AddInfo>
          <ul>
            <ListItem>
              <StyledLink to="cast">Cast</StyledLink>
            </ListItem>
            <ListItem>
              <StyledLink to="reviews">Reviews</StyledLink>
            </ListItem>
          </ul>
        </InfoBox>
        <Suspense fallback={<Loader/>}>
          <Outlet />
        </Suspense>
      </>
    );
  }
  if (status === 'rejected') {
    return <h1>{error}</h1>;
  }
};

export default MovieDetails;
