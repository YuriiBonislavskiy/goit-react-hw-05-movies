import { Link, Outlet, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MovieDetails = () => {
  const { id } = useParams();

  useEffect(() => {
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWQ5Y2Y2YTlkOWIzNThkNTE2MDY4NGE3NWRlMTg0NiIsInN1YiI6IjY1MTBiMmU2M2E0YTEyMDBjNWFhNjAxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c4yYt4p0SuZDxRBn3LGch8hpfAZK22HJzxSkBR3CMgk',
  },
};

fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
  }, [])

  return (
    <>
      <h1>DogDetails: {id}</h1>
      <ul>
        <li>
          <Link to="subbreeds">Подподроды</Link>
        </li>
        <li>
          <Link to="gallery">Галерея</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default MovieDetails;
