import { useEffect, useState, lazy, Suspense } from 'react';
import {
  useParams,
  useRouteMatch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { Button } from '@material-ui/core';

import { fetchMovieDetail } from '../../services/moviesApi';
import Status from '../../services/Status';

import Loader from '../../components/Loader';
import MoviesDetails from '../../components/MoviesDetails';
import Error from '../../components/Error';

const Cast = lazy(() =>
  import('./Cast/Cast' /* webpackChunkName: "castSubview"*/),
);

const Reviews = lazy(() =>
  import('./Reviews/Reviews' /* webpackChunkName: "reviewsSubview"*/),
);

function MoviesDetailsView() {
  const [movie, setMovie] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const fetchMoviesByID = async () => {
      try {
        const result = await fetchMovieDetail(movieId);
        setMovie(result);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setError(error.message);
        setStatus(Status.REJECTED);
        console.log(error.message);
      }
    };

    fetchMoviesByID();
  }, [movieId]);

  const goBackHandler = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {status === Status.PENDING && <Loader />}

      {status === Status.RESOLVED && (
        <div>
          <Button
            onClick={goBackHandler}
            variant="outlined"
            color="primary"
            style={{ backgroundColor: '#f0f0f0' }}
          >
            ⏪ Go back
          </Button>
          <MoviesDetails movie={movie} url={url} location={location} />
          <Suspense fallback={<Loader />}>
            <Route path={`${path}/cast`}>
              {status === Status.RESOLVED && <Cast />}
            </Route>
            <Route path={`${path}/reviews`}>
              {status === Status.RESOLVED && <Reviews />}
            </Route>
          </Suspense>
        </div>
      )}

      {status === Status.REJECTED && error && <Error message={error} />}
    </>
  );
}

export default MoviesDetailsView;
