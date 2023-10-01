import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from 'Services/SearchDataApi.js';
import { ReviewsGallery } from './MovieReviews.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const MovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState('');
  const { id } = useParams();

  const base_URL = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;
  const errorMassage = `Reviews for movie was not found`;

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }
    API.fetchData(base_URL, errorMassage)
      .then(response => {
        if (response.results) {
          setMovieReviews([]);
          setError(errorMassage);
          setStatus(Status.REJECTED);
          return;
        }
        setMovieReviews(response.results);
        setStatus(Status.RESOLVED);
      })
      .catch(err => {
        setMovieReviews([]);
        setError(errorMassage);
        setStatus(Status.REJECTED);
      });
  }, [base_URL, errorMassage, isFirstLoad]);

  if (status === 'resolved') {
    return (
      <ReviewsGallery>
        {movieReviews.map(({ id, author, content }) => {
          return (
            <li key={id}>
              <h2>Author: {author}</h2>
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
