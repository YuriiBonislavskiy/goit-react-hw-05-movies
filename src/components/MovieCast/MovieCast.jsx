import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { ListItem, StyledLink, AddInfo } from './MovieDetails.styled';
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

// const Genres = (genres) => {
//   const genresNames = genres.map(({ name }) => name).join(", ");

// }

const MovieCast = () => {
  const [movieCast, setMovieCast] = useState({});
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState('');
  const { id } = useParams();
//   const [searchParams, setSearchParams] = useSearchParams();
  const [searchParams] = useSearchParams();
  const title = searchParams.get('title');
  // console.log(title);

  const base_URL = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  const errorMassage = `Cast for movie ${title} was not found`;
  // console.log(base_URL, id);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }
    API.fetchData(base_URL, errorMassage)
      .then(response => {
        setMovieCast(response.cast);
        // console.log(response);
        // setProfilePath(
        //   `https://image.tmdb.org/t/p/w500/${response.profile_path}`
        // );
        // console.log(response.cast);
        setStatus(Status.RESOLVED);
      })
      .catch(err => {
        // console.log('ERROR');
        setMovieCast({});
        setError(errorMassage);
        setStatus(Status.REJECTED);
      });
  }, [base_URL, errorMassage, isFirstLoad]);

  // useEffect(() => {console.log(movie)},[])

  if (status === 'resolved') {
    return (
      <CastGallery>
        {movieCast.map(({ id, profile_path, name, character, gender }) => {
          const genderImg =
            gender > 1 ? manImg : gender === 1 ? womanImg : undefinedGenderImg;
          const srcPath = profile_path
            ? `https://image.tmdb.org/t/p/w500/${profile_path}`
            : genderImg;
          //   console.log(srcPath);
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
