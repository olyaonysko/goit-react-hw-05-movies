import { useState, useEffect } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';

import { fetchMovies } from '../../services/moviesApi';
import Status from '../../services/Status';

import Searchbar from '../../components/Searchbar';
import MoviesList from '../../components/MoviesList';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import s from './MoviesView.module.css';

function MoviesView() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState(Status.IDLE);
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const page = new URLSearchParams(location.search).get('page') ?? 1;

  useEffect(() => {
    if (location.search === '') {
      return;
    }

    const newQuery = new URLSearchParams(location.search).get('query');
    setQuery(newQuery, page);
  }, [location.search, page]);

  useEffect(() => {
    if (!query) return;
    const fetchMoviesBySearch = async () => {
      setStatus(Status.PENDING);
      try {
        const { results, total_pages } = await fetchMovies(query, page);
        if (results.length === 0) {
          setError(`Nothing was found for your search "${query}"`);
          setStatus(Status.REJECTED);
          return;
        }
        setMovies(results);
        setTotalPages(total_pages);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setStatus(Status.REJECTED);
      }
    };
    fetchMoviesBySearch();
  }, [query, page]);

  const searchHandler = newQuery => {
    if (query === newQuery) return;
    setQuery(newQuery);
    setMovies(null);
    setError(null);
    setStatus(Status.IDLE);
    history.push({ ...location, search: `query=${newQuery}&page=1` });
  };

  const pageHandler = (event, page) => {
    history.push({ ...location, search: `query=${query}&page=${page}` });
  };

  return (
    <>
      <Searchbar onSubmit={searchHandler} />
      {status === Status.PENDING && <Loader />}
      {status === Status.RESOLVED && (
        <>
          <MoviesList movies={movies} url={url} location={location} />
          {totalPages > 1 && (
            <div className={s.wrapper}>
              <Pagination
                count={totalPages}
                onChange={pageHandler}
                page={Number(page)}
                showFirstButton
                showLastButton
              />
            </div>
          )}
        </>
      )}
      {status === Status.REJECTED && error && <Error message={error} />}
    </>
  );
}

export default MoviesView;
