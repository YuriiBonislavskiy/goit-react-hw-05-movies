import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import API from '../../Services/SearchDataApi.js';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  RESOLVED_NO_BUTTON: 'resolved_no-button',
  REJECTED: 'rejected',
};
const base_URL = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
const errorMassage = 'Favorite Movies List is empty';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWQ5Y2Y2YTlkOWIzNThkNTE2MDY4NGE3NWRlMTg0NiIsInN1YiI6IjY1MTBiMmU2M2E0YTEyMDBjNWFhNjAxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c4yYt4p0SuZDxRBn3LGch8hpfAZK22HJzxSkBR3CMgk',
  },
};

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

    fetch(base_URL, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error(errorMassage));
      })
      .then(response => {
        const { results } = response;
        // console.log(results);
        setFavMovieList(results);
        setStatus(Status.PENDING);
      })
      .catch(error => {
        setError('Favorite Movies List is empty');
        setStatus(Status.REJECTED);
      });
  }, [isFirstLoad]);

  return (
    <ul>
      {favMovieList.map(({ id, title, name }) => (
        <li key={id}>
          <Link to={`/movies/${id}`}>{title ? title : name}</Link>
        </li>
      ))}
      {status === 'rejected' && <h1>{error}</h1>}
    </ul>
  );
};

export default FavoriteMovies;
