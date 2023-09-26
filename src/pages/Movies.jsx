import { Link } from 'react-router-dom';

const Movies = () => {
  // useEffect(() => {
  // HTTP запрос, если нужно
  // }, [])

  return (
    <div>
      {['dog-1', 'dog-2', 'dog-3', 'dog-4', 'dog-5'].map(movie => {
        return (
          <Link key={movie} to={`${movie}`}>
            {movie}
          </Link>
        );
      })}
    </div>
  );
};

export default Movies;
