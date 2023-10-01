import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from 'Services/SearchDataApi.js';
import womanImg from './Woman.png';
import manImg from './Man.png';
import undefinedGenderImg from './UndefinedGender.png';
import { CastGallery } from './MovieCast.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const MovieCast = () => {
  const [movieCast, setMovieCast] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState('');
  const { id } = useParams();

  const base_URL = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  const errorMassage = `Cast for movie was not found`;

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }
    API.fetchData(base_URL, errorMassage)
      .then(response => {
        if (response.results) {
          setMovieCast([]);
          setError(errorMassage);
          setStatus(Status.REJECTED);
          return;
        }
        setMovieCast(response.cast);
        setStatus(Status.RESOLVED);
      })
      .catch(err => {
        setMovieCast([]);
        setError(errorMassage);
        setStatus(Status.REJECTED);
      });
  }, [base_URL, errorMassage, isFirstLoad]);

  if (status === 'resolved') {
    return (
      <CastGallery>
        {movieCast.map(({ id, profile_path, name, character, gender }) => {
          const genderImg =
            gender > 1 ? manImg : gender === 1 ? womanImg : undefinedGenderImg;
          const srcPath = profile_path
            ? `https://image.tmdb.org/t/p/w500/${profile_path}`
            : genderImg;
          return (
            <li key={id}>
              <img alt={name} src={srcPath} width="240px" height="320px" />
              <h2>{name}</h2>
              <h3>Character:</h3>
              <p>{character}</p>
            </li>
          );
        })}
      </CastGallery>
    );
  }
  if (status === 'rejected') {
    return <h1>{error}</h1>;
  }
};

export default MovieCast;
