import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from 'Services/SearchDataApi.js';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  RESOLVED_NO_BUTTON: 'resolved_no-button',
  REJECTED: 'rejected',
};
const base_URL = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
const errorMassage = 'Favorite Movies List is empty';

const FavoriteMovies = () => {
  const [favMovieList, setFavMovieList] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState('');
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }

    API.fetchData(base_URL, errorMassage)
      .then(response => {
        const { results } = response;
        setFavMovieList(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setFavMovieList([]);
        setError('Favorite Movies List is empty');
        setStatus(Status.REJECTED);
      });
  }, [isFirstLoad]);

  return (
    <ul>
      {favMovieList.map(({ id, title, name }) => (
        <li key={id}>
          <Link to={`/movies/${id}?title=${title ? title : name}`}>
            {title ? title : name}
          </Link>
        </li>
      ))}
      {status === 'rejected' && <h1>{error}</h1>}
    </ul>
  );
};

export default FavoriteMovies;
