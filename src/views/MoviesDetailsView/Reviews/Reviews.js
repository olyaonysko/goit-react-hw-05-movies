import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { fetchMovieReviews } from '../../../services/moviesApi';
import Status from '../../../services/Status';

import Loader from '../../../components/Loader';
import s from './Reviews.module.css';

const Reviews = movieID => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { results } = await fetchMovieReviews(movieId);
        if (results.length === 0) {
          toast.info("We don't have any reviews for this movie.");
          setStatus(Status.REJECTED);
          return;
        }
        setReviews(results);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setError(error);
        setReviews([]);
        setStatus(Status.REJECTED);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <>
      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && error && (
        <p>Whoops, something went wrong 😣</p>
      )}

      {status === Status.RESOLVED && (
        <>
          <ul className={s.list}>
            {reviews.map(({ id, author, content }) => (
              <li key={id} className={s.item}>
                <p className={s.authorName}>{author}</p>
                <p className={s.content}>{content}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.array,
};

export default Reviews;
