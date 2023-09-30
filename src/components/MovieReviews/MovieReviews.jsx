import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { ListItem, StyledLink, AddInfo } from './MovieDetails.styled';
import API from 'Services/SearchDataApi.js';
// import womanImg from './Woman.png';
// import manImg from './Man.png';
// import undefinedGenderImg from './UndefinedGender.png';
import { ReviewsGallery } from './MovieReviews.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

// const Genres = (genres) => {
//   const genresNames = genres.map(({ name }) => name).join(", ");

// }

const MovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState({});
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState('');
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const title = searchParams.get('title');

  const base_URL = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;
  const errorMassage = `Reviews for movie ${title} was not found`;

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }
    API.fetchData(base_URL, errorMassage)
      .then(response => {
        setMovieReviews(response.results);
        setStatus(Status.RESOLVED);
      })
      .catch(err => {
        setMovieReviews({});
        setError(errorMassage);
        setStatus(Status.REJECTED);
      });
  }, [base_URL, errorMassage, isFirstLoad]);

  // useEffect(() => {console.log(movie)},[])

  if (status === 'resolved') {
    return (
      <ReviewsGallery>
        {movieReviews.map(({ id, author, content }) => {
          return (
            <li key={id}>
              <h2>Author:  {author}</h2>
              <p>{content}</p>
            </li>
          );
        })}
      </ReviewsGallery>
    );
  }
  if (status === 'rejected') {
    return <h1>{error}</h1>;
  }
};

export default MovieReviews;
