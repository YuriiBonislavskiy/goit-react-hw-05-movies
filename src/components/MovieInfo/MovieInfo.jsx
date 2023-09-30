// import { useLocation } from 'react-router-dom';
import {
  MovieInfoContainer,
  MoviePoster,
  MovieInfoDetail,
  BackLink,
} from './MovieInfo.styled';

const MovieInfo = ({ movie, title, poster, genres, backLincLocation }) => {
//   const location = useLocation();
//   location.state = backLincLocation;

  return (
    <>
      <BackLink to={backLincLocation?.current ?? '/'}>Go back</BackLink>

      <MovieInfoContainer>
        <div>
          <MoviePoster alt={title} src={poster} />
        </div>
        <MovieInfoDetail>
          <h1>
            {title}{' '}
            {movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ''}
          </h1>
          <p>Popularity: {movie.popularity}</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{genres}</p>
        </MovieInfoDetail>
      </MovieInfoContainer>
    </>
  );
};

export default MovieInfo;
