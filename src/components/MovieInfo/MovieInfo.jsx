import {
  MovieInfoContainer,
  MoviePoster,
  MovieInfoDetail,
} from './MovieInfo.styled';

const MovieInfo = ({ movie, title, poster, genres }) => {
  return (
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
  );
};

export default MovieInfo;
