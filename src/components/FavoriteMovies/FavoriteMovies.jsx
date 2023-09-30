import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MovieListItems from 'components/MovieListItems';
import API from 'Services/SearchDataApi.js';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  RESOLVED_NO_BUTTON: 'resolved_no-button',
  REJECTED: 'rejected',
};

const base_URL =
  'https://api.themoviedb.org/3/trending/movie/week?language=en-US';
const errorMassage = 'Favorite Movies List is empty';

const FavoriteMovies = () => {
  const [movieList, setMovieList] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState('');
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const location = useLocation();
  // console.log(location.pathname);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }

    API.fetchData(base_URL, errorMassage)
      .then(response => {
        const { results } = response;
        if (results.length === 0) {
          setMovieList([]);
          setError(errorMassage);
          setStatus(Status.REJECTED);
          return;
        }
        setMovieList(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setMovieList([]);
        setError(errorMassage);
        setStatus(Status.REJECTED);
      });
  }, [isFirstLoad]);

  return (
    <>
      <ul>
        {<MovieListItems movieList={movieList} state={{from: location}} />}
      </ul>
      {status === 'rejected' && <h1>{error}</h1>}
    </>
  );
};

export default FavoriteMovies;
