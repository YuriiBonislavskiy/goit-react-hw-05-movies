import { useSearchParams, useLocation } from 'react-router-dom';
import Searchbar from '../components/Searchbar';
import MovieListItems from 'components/MovieListItems';
import { useEffect, useState } from 'react';
import API from 'Services/SearchDataApi.js';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  RESOLVED_NO_BUTTON: 'resolved_no-button',
  REJECTED: 'rejected',
};

const Movies = () => {
  const [movieList, setMovieList] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState('');
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [searchText, setSearchText] = useSearchParams('query');

  const location = useLocation();
  // console.log(location);

  const query = searchText.get('query') ? searchText.get('query') : '';
  // console.log(query);

  const handleSubmit = text => {
    setSearchText({ query: text });
  };

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }
    // console.log(query);

    const base_URL = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
    const errorMassage = 'No such films were found.';

    query &&
      API.fetchData(base_URL, errorMassage)
        .then(response => {
          const { results } = response;
          if (results.length === 0) {
            setMovieList([]);
            setError(errorMassage);
            setStatus(Status.REJECTED);
            setSearchText({});
            return;
          }
          setMovieList(results);
          setStatus(Status.RESOLVED);
        })
        .catch(error => {
          // console.log('ERROR');
          setMovieList([]);
          setError(errorMassage);
          setStatus(Status.REJECTED);
          setSearchText({});
        });
  }, [isFirstLoad, query, setSearchText]);

  return (
    <>
      <Searchbar query={query} onHandleSubmit={handleSubmit} />
      <ul>
        {query && (
          <MovieListItems movieList={movieList} state={{from: location}} />
        )}
        {status === 'rejected' && <h1>{error}</h1>}
      </ul>
    </>
  );
};

export default Movies;
