import { Link, Outlet, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from 'Services/SearchDataApi.js';

const MovieDetails = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get('title');
  console.log(title);

  const base_URL = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const errorMassage = `Movie ${title} was not found`;
  console.log(base_URL, id);
  useEffect(() => {
    API.fetchData(base_URL, errorMassage)
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }, [base_URL, errorMassage]);

  return (
    <>
      <h1>DogDetails: {id} {title}</h1>
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
